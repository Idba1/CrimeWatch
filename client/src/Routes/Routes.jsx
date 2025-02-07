import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Registration from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/LogIn";
import AboutUs from "../Pages/AboutUs/AboutUs";
import SuccessStory from "../Pages/SuccessStory/SuccessStory";
import Contact from "../Pages/ContactPage/Contact";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children:
            [
                {
                    path: '/registration',
                    element: <Registration></Registration>,
                },
                {
                    path: '/login',
                    element: <Login></Login>,
                },
                {
                    path: '/about-us',
                    element: <AboutUs></AboutUs>,
                },
                {
                    path: '/success-storys',
                    element: <SuccessStory></SuccessStory>,
                },
                {
                    path: '/contact-us',
                    element: <Contact></Contact>,
                },
            ]
    }
]);


export default Routes;