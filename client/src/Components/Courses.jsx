import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Courses = () => {
    const stories = [
        {
            "id": 1,
            "imageUrl": "https://i.ibb.co.com/WXkWzFJ/7bad5f6934a51c72e0613f7cb848023e.jpg",
            "courseName": "Web Development",
            "instructorName": "Tarin Haque"
        },
        {
            "id": 2,
            "imageUrl": "https://i.ibb.co.com/BHnx1v6H/8b3e5e76cacdbee556a29b4517715724.jpg",
            "courseName": "Data Science",
            "instructorName": "Gias Uddin"
        },
        {
            "id": 3,
            "imageUrl": "https://i.ibb.co.com/Qvn3fx4C/8e06cc6c90717d4db218db4fc39285eb.jpg",
            "courseName": "Cloud Computing",
            "instructorName": "Ismail Hossain"
        },
        {
            "id": 4,
            "imageUrl": "https://i.ibb.co.com/SwwFTMY3/22bc8ebef610eb881071e1a7007a7a80.jpg",
            "courseName": "Cybersecurity",
            "instructorName": "Barik Hasmi"
        },
        {
            "id": 5,
            "imageUrl": "https://i.ibb.co.com/B56b8z2X/51b2fee7367115957f29cb0add059017.jpg",
            "courseName": "Cryptocurrency",
            "instructorName": "Didarul Mia"
        },
        {
            "id": 6,
            "imageUrl": "https://i.ibb.co.com/hFr1Nhw4/5819084e975ec9798abc578c50dfc207.jpg",
            "courseName": "App Development",
            "instructorName": "Srabon Haque"
        },
        {
            "id": 7,
            "imageUrl": "https://i.ibb.co.com/pv40Sxm2/c6e0c62998bf53d547fb099f6bc831e2.jpg",
            "courseName": "Blockchain",
            "instructorName": "Tisha Akther"
        },
        {
            "id": 8,
            "imageUrl": "https://i.ibb.co.com/ZR14BwVq/d4239ca30fdb3aa2464a6ec7e01ac999.jpg",
            "courseName": "Data Analytics",
            "instructorName": "Rifa Tasnia"
        },
        {
            "id": 9,
            "imageUrl": "https://i.ibb.co.com/xK1zVy58/db092ad245283372afb7a69551a943ac.jpg",
            "courseName": "Internet of Things",
            "instructorName": "Jayan Ahmed"
        },
        {
            "id": 10,
            "imageUrl": "https://i.ibb.co.com/6cPD0tdj/ded96e0ed16d9f31de8e842cae01c525.jpg",
            "courseName": "Game Development",
            "instructorName": "Anisha Ibnat"
        }
    ];


    const containerRef = useRef(null);

    const scrollCards = () => {
        if (containerRef.current) {
            const container = containerRef.current;
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
                container.scrollLeft = 0;
            } else {
                container.scrollLeft += 2;
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(scrollCards, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='my-10 md:my-14 lg:my-20'>
            <div className="">
                <h2 className="text-2xl text-center font-semibold sm:text-4xl text-[#0077B5]">Learn From This Place && RiseWithYou_</h2>
                <p className="mt-4 text-center mb-8 dark:text-sky-950"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum, explicabo deleniti. <br /> Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <div className="overflow-hidden relative">
                <div className="flex" ref={containerRef} style={{ minHeight: '100%', whiteSpace: 'nowrap', overflowX: 'hidden' }}>
                    {stories.map((story) => (
                        <motion.div
                            key={story.id}
                            className="inline-block w-full max-w-sm mx-auto my-4"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ display: 'inline-block', margin: '0 10px' }}
                        >
                            <motion.div
                                className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
                                style={{ backgroundImage: `url(${story.imageUrl})` }}
                            ></motion.div>

                            <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                                <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">{story.courseName}</h3>
                                <p className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">{` ${story.instructorName}`}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Courses;