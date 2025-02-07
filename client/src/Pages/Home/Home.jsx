import Courses from "../../Components/Courses";
import Feature from "../../Components/Feature";
import Hero from "../../Components/Hero";
import TeacherSection from "../../Components/TeacherSection";

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Courses></Courses>
            <Feature></Feature>
            <TeacherSection></TeacherSection>
        </div>
    );
};

export default Home;