import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Registration from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/LogIn";
import Home from "../Pages/Home/Home";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import CrimeFeed from "../Components/CrimeFeed";
import ReportCrime from "../Components/ReportCrime";
import MyReports from "../Components/MyReports";
import Community from "../Components/Community";
import Leaderboard from "../Components/Leaderboard";
import AdminPanel from "../Components/AdminPanel";
import Profile from "../Components/Profile";


const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/registration',
                element: <Registration></Registration>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/crime-feed',
                element: <CrimeFeed></CrimeFeed>,
            },
            {
                path: '/report',
                element: <PrivateRoute>
                    <ReportCrime></ReportCrime>
                </PrivateRoute>,
            },
            {
                path: '/my-reports',
                element: <PrivateRoute>
                    <MyReports></MyReports>
                </PrivateRoute>,
            },
            {
                path: '/community',
                element: <PrivateRoute>
                    <Community></Community>
                </PrivateRoute>,
            },
            {
                path: '/leaderboard',
                element: <Leaderboard></Leaderboard>,
            },
            {
                path: '/admin',
                element: <PrivateRoute>
                    <AdminPanel></AdminPanel>
                </PrivateRoute>,
            },
            {
                path: '/profile',
                element: <PrivateRoute>
                    <Profile></Profile>
                </PrivateRoute>,
            },
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>,
            },
        ]
    }
]);

export default Routes;