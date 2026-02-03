import React, { useEffect, useState } from "react";
import "./CreatePostForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import loader from '../assets/loading circle.gif';


function CreatePostForm() {
  const[createPostFormData,setCreatePostFormData] = useState({
  title:"",
  body:"",
  image:""
});
const[errors,setErrors]=useState({});
const navigate= useNavigate()
const location = useLocation();
console.log(location,"Location Value");
const editPostId = location.state?.id || null;

const[loading,setLoading]=useState(false);

console.log({editPostId});

const handleChange=(field,value)=>{
  console.log({field,value});
  //clear error msg when value is entered
  setErrors((e)=>({...e, [field]: "" }));//clear data
  //store form value in state
  setCreatePostFormData({...createPostFormData, [field]:value});
};
console.log("createPostFormData",createPostFormData);

console.log("editPostId",editPostId);

//automatically fill in form (useeffect used to perform side effect)
useEffect(()=>{
  if(!editPostId)return;
  const posts = JSON.parse(localStorage.getItem("postData")) || [];
  const postToEdit = posts.find((p) =>p.id === editPostId);
  console.log(postToEdit , "Post Data")
  if(postToEdit){
    setCreatePostFormData({
      title:postToEdit.title,
      body:postToEdit.body,
      image:postToEdit.image,
    });
  }
},[editPostId]);


const handleImageChange=(file)=>{
  if(!file) return;
  console.log({file});

  //file upload valiation
  const allowedTypes=["image/jpeg","image/png","image/jpg","image/webp","image/avif"];
  if(!allowedTypes.includes(file.type)){
    setErrors((e)=>({
      ...e,
      image: "Only JPG, JPEG , PNG images are allowed",
    }));
    return;
  }

  const reader=new FileReader();
  reader.onloadend= () => {
    setCreatePostFormData({...createPostFormData, image: reader.result});
    setErrors((e)=>({...e,image: ""}));
  };
  reader.readAsDataURL(file);

};
console.log(createPostFormData.image);

const handleSubmit=(e)=>{
  e.preventDefault();
  const newErrors = {};
 if(!createPostFormData.title.trim()) newErrors.title = "Title is required";
 if(!createPostFormData.body.trim()) newErrors.body= "Description is required";
 if(!createPostFormData.image.trim()) newErrors.image = "Image is required";
 setErrors(newErrors);
 if(Object.keys(newErrors).length>0) return;

  setLoading(true);

 //get existing post data from local stroage
 const existingPosts = JSON.parse(localStorage.getItem("postData")) || [];

 localStorage.setItem("postData", JSON.stringify(existingPosts));

  //EDIT  mode -> update existing record
  if(editPostId){
    console.log("createPostFormData",createPostFormData)
    const updatedPosts = existingPosts.map ((p) =>
       p.id === editPostId ? { ...p, ...createPostFormData} : p
    );

    localStorage.setItem("postData", JSON.stringify(updatedPosts));
    navigate("/");
    return;
  }

 //keep old data it is and add new post at last (array format)
 const updatedPosts = [...existingPosts,{id:uuidv4(), ...createPostFormData},];

 localStorage.setItem("postData", JSON.stringify(updatedPosts));
 //console.log("Post Submitted:", createPostFormData);

    setTimeout(() => {
      navigate("/");
    },1200);
}

  return (
    <div className="page">

      {loading && (
        <div className="loader">
          <img src={loader} alt="Loading..." className="loader-img"/>
          </div>
      )}
      <form className="box" onSubmit={handleSubmit}>
        <h2>{editPostId ? "Edit Post": "Let's Create New Post"}</h2>

        <input type="text" placeholder="Enter Title" value={createPostFormData.title} onChange={(e) => handleChange("title", e.target.value)}/>
        {errors.title && <span className="error">{errors.title}</span>}

        <textarea placeholder="Enter Description" value={createPostFormData.body} onChange={(e) => handleChange("body", e.target.value)}></textarea>
        {errors.body && <span className="error">{errors.body}</span>}

        <input type="file" accept="image/jpeg,image/png,image/jpg" 
        onChange={(e) => handleImageChange(e.target.files[0])} />
        {errors.image && <span className="error">{errors.image}</span>}

        {createPostFormData.image && (
          <img src={createPostFormData.image} alt="preview" style={{width:200, borderRadius:10}}></img>
        )}

        <div className="post-btn">
        {editPostId && (<button className="csl-btn" type="button" onClick={()=> navigate("/")}>Cancel</button>)}
        
        <button className="up-btn">{editPostId ? "Updated Post": "Add Post"}</button>
        </div>
        
      </form>
    </div>
  );
}

export default CreatePostForm;
