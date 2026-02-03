import { useState, useEffect } from "react";
import "./PostDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationModel from "./ConfirmationModel";
import { toast } from "react-toastify";
import { useTheme } from "../Context/ModelContext"; // 1. Context ઈમ્પોર્ટ કરો

function PostDetail() {
    const { theme } = useTheme(); // 2. Theme મેળવો
    const [showModel, setShowModel] = useState(false);
    const postData = JSON.parse(localStorage.getItem("postData")) || [];
    const { postId } = useParams();
    const [currentPost, setCurrentPost] = useState({});
    const loggedInUserData = JSON.parse(localStorage.getItem("loginData")) || {};
    const navigate = useNavigate();

    useEffect(() => {
        const filtered = postData.find(card => String(card.id) === String(postId));
        if (filtered) setCurrentPost(filtered);
    }, [postId]);

    const showModelHandler = () => setShowModel(true);
    const hideModelHandler = () => setShowModel(false);

    const handleDelete = () => {
        const updatedPostData = postData.filter(post => String(post.id) !== String(postId));
        localStorage.setItem("postData", JSON.stringify(updatedPostData));
        toast.success("Post Deleted Successfully");
        setShowModel(false);
        navigate("/");
    };

    const handleEdit = () => {
        navigate("/CreatePostForm", { state: { id: currentPost.id } });
    };

    return (
        <>
            {/* 3. અહીં ક્લાસમાં ${theme} ઉમેરો */}
            <div className={`post-detail ${theme}`}>
                <div className="post-card">
                    <img src={currentPost.image} className="post-image" alt="post" />
                    <div className="post-content">
                        <h2>{currentPost.title}</h2>
                        <p>{currentPost.body}</p>

                        {loggedInUserData?.role === "admin" && (
                            <div className="post-actions">
                                <button className="btn edit" onClick={handleEdit}>Edit</button>
                                <button className="btn delete" onClick={showModelHandler}>Delete</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showModel && (
                <ConfirmationModel
                    titlemodel="Delete?"
                    descmodel="Are You Sure??"
                    onClose={hideModelHandler}
                    onConfirm={handleDelete}
                    confirmBtnText="Delete"
                />
            )}
        </>
    );
}

export default PostDetail;
