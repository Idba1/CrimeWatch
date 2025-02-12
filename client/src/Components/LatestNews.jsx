import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const SuccessStory = () => {
    const stories = [

        {
            id: 1,
            imageUrl: 'https://i.ibb.co.com/ccmqrvp4/b182dfd2-6013-46e4-8846-3cf81dc47a5a.jpg',
            name: '',
            companyName: '',
        },
        {
            id: 2,
            imageUrl: 'https://i.ibb.co.com/35JmMgBV/dd951774-5c1e-4731-be2e-b41a391ce0ef.jpg',
            name: '',
            companyName: '',
        },
        {
            id: 3,
            imageUrl: 'https://i.ibb.co.com/r2Mj8gRj/d346ae60-17a4-468c-b9b8-31ba48ced24b.jpg',
            name: '',
            companyName: '',
        },
        {
            id: 4,
            imageUrl: 'https://i.ibb.co.com/ccmqrvp4/b182dfd2-6013-46e4-8846-3cf81dc47a5a.jpg',
            name: '',
            companyName: '',
        },
        {
            id: 5,
            imageUrl: 'https://i.ibb.co.com/WvNFj873/a4c2c9c2-1e59-4ff0-8e54-9acbef724be2.jpg',
            name: '',
            companyName: '',
        },
        {
            id: 6,
            imageUrl: 'https://i.ibb.co.com/q3F6TXgM/63fea980-84df-49ba-8f16-c7f15d9d0a71.jpg',
            name: '',
            companyName: '',
        },
        {
            id: 7,
            imageUrl: 'https://i.ibb.co.com/DPr9NMk3/download.jpg',
            name: '',
            companyName: '',
        },
        {
            id: 8,
            imageUrl: 'https://i.ibb.co.com/RG1DNY86/1bf99b75-53fc-48b8-a8fc-8c8a22bdda6a.jpg',
            name: '',
            companyName: '',
        },
        {
            id: 9,
            imageUrl: 'https://i.ibb.co.com/YThLQ4jb/647f04ba-0571-47ca-9618-d52c762fe5e9.jpg',
            name: '',
            companyName: '',
        },
        {
            id: 10,
            imageUrl: 'https://i.ibb.co.com/N20N6VN0/5267963d-35e5-44ec-947f-18c8bcc2a111.jpg',
            name: '',
            companyName: '',
        },
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
                <h2 className="text-2xl text-center font-semibold sm:text-4xl text-[#0077B5]">Latest News_</h2>
                <p className="mt-4 text-center mb-8 dark:text-sky-950"> Brother and sister killed by truck accident in Noakhali</p>
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
                                <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">{story.name}</h3>
                                <p className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">{` ${story.companyName}`}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SuccessStory;