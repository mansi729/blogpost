import { Navigate,Outlet } from "react-router-dom";
import RootLayout from '../Pages/RootLayout';

export default function AuthGuard(){
    const loginData = JSON.parse(localStorage.getItem("loginData"));

    if(!loginData){
        
        return <Navigate to = "/Login" replace/>;
    }
    return <RootLayout/>
}