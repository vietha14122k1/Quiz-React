import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import App from './App';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/content/ManageUser';
import Dashboard from './components/Admin/content/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/content/Quiz/ManageQuiz';
import Questions from './components/Admin/content/Question/Questions';
import PrivateRoutes from './routes/PrivateRoutes';
import React, { Suspense } from 'react';
const NotFound = () => {
    return (
        <div className='container mt-3 alert alert-danger'>
            404.Not Found data with your current URL
        </div>
    )
}
const Layout = (props) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path="users" element={
                        <PrivateRoutes>
                            <ListQuiz />
                        </PrivateRoutes>

                    }
                    />

                </Route>
                <Route path="/quiz:id" element={<DetailQuiz />} />

                <Route path="/admins" element={
                    <PrivateRoutes>
                        <Admin />
                    </PrivateRoutes>
                } >
                    <Route index element={<Dashboard />} />
                    <Route path="manage-user" element={<ManageUser />} />
                    <Route path="manage-quizzes" element={<ManageQuiz />} />
                    <Route path="manage-question" element={<Questions />} />

                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />

            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
        </Suspense>
    )
}

export default Layout;