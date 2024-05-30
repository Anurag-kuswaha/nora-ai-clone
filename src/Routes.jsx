import { Routes, Route } from 'react-router-dom';
import { lazy, createContext, useState } from 'react';
const Header = lazy(() => import('./Components/Header'));
const Login = lazy(() => import('./Pages/Login'));
const Signup = lazy(() => import('./Pages/Signup'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const ChatForm = lazy(() => import('./Pages/ChatForm'));
const ThankYou = lazy(() => import('./Pages/ThankYou'));
const ListOfMeeting = lazy(() => import('./Pages/ListOfMeeting'))

const WebRoutes = () => {
    
    return (
        <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/chat/:chatId" element={<ChatForm />}></Route>
               

            <Route path="/list" element={<ListOfMeeting />}></Route>
            <Route path="/thankyou" element={<ThankYou />}></Route>
        </Routes>
    )
}

export default WebRoutes