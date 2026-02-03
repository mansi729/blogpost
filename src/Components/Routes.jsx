import React from "react";
import { createBrowserRouter } from "react-router-dom";
import {HomePage} from '../Pages/HomePage';
import {CreatePost} from '../Pages/CreatePost';
import {LoginPage} from '../Pages/LoginPage';
import PostDetail from '../Components/PostDetail';
import AuthGuard from "../Guard/AuthGuard";
import NotFound from "./NotFound";
import Explore from "../Components/Explore";



 const router=createBrowserRouter([

    {
        path:"Login",
        element:<LoginPage/>
    },
    {
        path:"/",
        element:<AuthGuard/>,//for navbar common view in page
        children:[

            {
                path:"/",
                element:<HomePage/>
            },
            {
                path:"CreatePostForm",
                element:<CreatePost/>
            },
            {
                path:"/posts/:postId",
                element:<PostDetail/>
            },
            {
                path:"*",
                element:<NotFound/>
            },
            {
                path:"/exploreposts",
                element:<Explore/>
            },
        ],
    },
]);
export default router;