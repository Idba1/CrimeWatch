import Hero from "../../Components/Hero";
import SuccessStory from "../../Components/LatestNews";
import Blogs from "../Blogs/Blogs";
import Contact from "../ContactPage/Contact";
 
const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <SuccessStory></SuccessStory>
            <Blogs></Blogs>
            <Contact></Contact>
        </div>
    );
};

export default Home;