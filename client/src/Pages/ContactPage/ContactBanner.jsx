import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ContactBanner = () => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <section className="px-4 py-12 md:px-6 lg:px-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold md:text-3xl">Contact Our Friendly Team</h1>
                    <p className="mt-3 text-gray-600">Chat to our friendly team.</p>
                </div>

                {/* Slider Section */}
                <div className="relative w-full mt-10 h-64 md:h-80 lg:h-96">
                    <Slider {...sliderSettings}>
                        {[
                            "https://i.ibb.co.com/1fssKbCN/photo-1568992688065-536aad8a12f6.webp",
                            "https://i.ibb.co/L5Dr3L8/1679176325-en-idei-club-p-lack-of-space-in-office-krasivo-8.jpg",
                            "https://i.ibb.co/vQJp43G/1679176273-en-idei-club-p-lack-of-space-in-office-krasivo-6.jpg",
                            "https://i.ibb.co/dtC6Cft/1679176291-en-idei-club-p-lack-of-space-in-office-krasivo-9.png"
                        ].map((src, index) => (
                            <div key={index} className="relative h-64 md:h-80 lg:h-96">
                                <img src={src} alt={`img ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Contact Options Section */}
                <div className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3">
                    {['Chat to sales', 'Visit us', 'Call us'].map((title, index) => (
                        <div key={index} className="p-6 rounded-lg bg-blue-50 transition-transform transform hover:bg-blue-100 hover:border hover:border-blue-400 hover:scale-105">
                            <span className="inline-block p-3 text-black rounded-lg bg-blue-100/80">
                                {index === 0 && <i className="fas fa-envelope text-lg"></i>}
                                {index === 1 && <i className="fas fa-map-marker-alt text-lg"></i>}
                                {index === 2 && <i className="fas fa-phone text-lg"></i>}
                            </span>
                            <h2 className="mt-4 text-lg font-medium text-gray-800">{title}</h2>
                            <p className="mt-2 text-sm text-gray-500">
                                {index === 0 ? 'Speak to our friendly team.' : index === 1 ? 'Visit our office HQ.' : 'Mon-Fri from 8am to 5pm.'}
                            </p>
                            <p className="mt-2 text-sm text-black underline font-semibold">
                                {index === 0 ? 'hello@auraloom.com' : index === 1 ? '100 Smith Street Collingwood VIC 3066 AU' : '+1 (555) 000-0000'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContactBanner;