const AboutUs = () => {
    return (
        <div>
            <section className="dark:bg-gray-100 dark:text-gray-800">
                <div className="container px-6 py-12 mx-auto">
                    <div className="grid items-center gap-4 xl:grid-cols-5">
                        <div className="max-w-2xl mx-auto my-8 space-y-4 text-center xl:col-span-2 xl:text-left">
                            <h2 className="text-4xl font-bold">About Our Platform</h2>
                            <p className="dark:text-gray-600">Empowering communities through technology, our crime reporting and verification platform enables users to report incidents, attach evidence, and engage in fact-checking through community interaction. With AI-powered verification, real-time updates, and secure authentication, we strive to create a safer and more transparent digital space for crime awareness and accountability.</p>
                        </div>
                        <div className="p-6 xl:col-span-3">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid content-center gap-4">
                                    <div className="p-6 rounded shadow-md dark:bg-gray-50">
                                        <p>As one of the visionary creators behind this crime reporting and community verification platform, I am committed to building a secure and transparent digital space where users can report incidents, verify authenticity, and contribute to a safer society. My role focuses on blending innovative technology with real-world impact, ensuring seamless user experience, AI-powered verification, and scalable infrastructure for long-term growth.</p>
                                        <div className="flex items-center mt-4 space-x-4">
                                            <img src="https://avatars.githubusercontent.com/u/149941290?v=4" alt="" className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500" />
                                            <div>
                                                <p className="text-lg font-semibold">Monira Islam</p>
                                                <p className="text-sm dark:text-gray-600">Web Platform Creator & Lead Innovator</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="p-6 rounded shadow-md dark:bg-gray-50">
                                        <p>Sit wisi sapientem ut, pri civibus temporibus voluptatibus et, ius cu hinc fabulas. Nam meliore minimum et, regione convenire cum id. Ex pro eros mucius consectetuer, pro magna nulla nonumy ne, eam putent iudicabit consulatu cu.</p>
                                        <div className="flex items-center mt-4 space-x-4">
                                            <img src="https://source.unsplash.com/50x50/?portrait?2" alt="" className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500" />
                                            <div>
                                                <p className="text-lg font-semibold">Leroy Jenkins</p>
                                                <p className="text-sm dark:text-gray-600">CTO of Company Co.</p>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="grid content-center gap-4">
                                    <div className="p-6 rounded shadow-md dark:bg-gray-50">
                                        <p>With a deep passion for cybersecurity and software architecture, I play a crucial role in designing the core structure of this crime-reporting platform. From implementing secure authentication methods to integrating AI-driven verification, my focus is on ensuring data privacy, content authenticity, and robust backend operations. By leveraging the latest technologies, I aim to create a platform that fosters community trust and collaboration.</p>
                                        <div className="flex items-center mt-4 space-x-4">
                                            {/* <img src="https://source.unsplash.com/50x50/?portrait?3" alt="" className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500" /> */}
                                            <img src="https://i1.rgstatic.net/ii/profile.image/11431281242577615-1715588979632_Q512/Reduan-Ahmad.jpg" alt="" className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500" />
                                            <div>
                                                <p className="text-lg font-semibold">Reduan Ahmad</p>
                                                <p className="text-sm dark:text-gray-600">Technical Architect & Security Specialist</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 rounded shadow-md dark:bg-gray-50">
                                        <p>Empowering communities through technology is at the heart of my mission. As a key contributor to this project, I focus on enhancing user interaction, refining platform usability, and ensuring that crime reports are handled responsibly. Through real-time notifications, verification scores, and user engagement strategies, I work to make this platform not just a reporting tool, but a powerful force for social change.</p>
                                        <div className="flex items-center mt-4 space-x-4">
                                            <img src="https://avatars.githubusercontent.com/u/141672697?v=4" alt="" className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500" />
                                            <div>
                                                <p className="text-lg font-semibold">Abdullah Al Noman</p>
                                                <p className="text-sm dark:text-gray-600">Product Strategist & Community Engagement Lead</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
