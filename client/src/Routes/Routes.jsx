import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Registration from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/LogIn";
import Home from "../Pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import CrimeFeed from "../Components/CrimeFeed";
import ReportCrime from "../Components/ReportCrime";
import MyReports from "../Components/MyReports";
import Community from "../Components/Community";
import Leaderboard from "../Components/Leaderboard";
import Profile from "../Components/Profile";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ForgetPassword from "../Pages/Authentication/ForgetPassword";
import ConditionalDashboard from "../Dashboard/ConditionalDashboard/ConditionalDashboard";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/registration',
                element: <Registration />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/crime-feed',
                element: <CrimeFeed />,
            },
            {
                path: '/report',
                element: (
                    <PrivateRoute>
                        <ReportCrime />
                    </PrivateRoute>
                ),
            },
            {
                path: '/my-reports',
                element: (
                    <PrivateRoute>
                        <MyReports />
                    </PrivateRoute>
                ),
            },
            {
                path: '/community',
                element: (
                    <PrivateRoute>
                        <Community />
                    </PrivateRoute>
                ),
            },
            {
                path: '/leaderboard',
                element: <Leaderboard />,
            },
            {
                path: '/about-us',
                element: <AboutUs />,
            },
            {
                path: "/dashboard",
                element: (
                    <PrivateRoute>
                        <ConditionalDashboard />
                    </PrivateRoute>
                ),
            },
            {
                path: '/profile',
                element: (
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                ),
            },
            {
                path: '/forget-password',
                element: (
                    <PrivateRoute>
                        <ForgetPassword />
                    </PrivateRoute>
                ),
            },
        ],
    },
]);

export default Routes;
