import ContactBanner from "./ContactBanner";
import Newsletter from "./NewsLetter";

const Contact = () => {
    return (
        <div className='container mx-auto'>
            <ContactBanner></ContactBanner>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Contact;