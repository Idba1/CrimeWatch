import Hero from "../../Components/Hero";
import SuccessStory from "../../Components/LatestNews";
import Blogs from "../Blogs/Blogs";
import Contact from "../ContactPage/Contact";
 
const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Blogs></Blogs>
            <SuccessStory></SuccessStory>
            <Contact></Contact>
        </div>
    );
};

export default Home;