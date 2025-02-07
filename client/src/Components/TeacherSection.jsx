const TeacherSection = () => {
    return (
        <div>
            <div className="bg-blue-50 py-10 px-4 md:px-16 lg:px-24">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Left Section */}
                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-blue-600 uppercase">Teachers</h2>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
                            Empower your students
                        </h1>
                        <p className="text-gray-600 mt-4">
                            Help every student confidently learn anything. With free flashcard
                            sets, study modes, and in-class games like Quizlet Live, you can
                            instantly create a more engaged classroom.
                        </p>
                        <button className="mt-6 bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                            Sign up as a teacher
                        </button>
                        <p className="mt-4 text-blue-500 underline cursor-pointer">
                            See how teachers use Quizlet
                        </p>
                    </div>

                    {/* Right Section */}
                    <div className="flex-1">
                        <img
                            src="https://i.ibb.co.com/HwjFKyD/Zp-Fqj-B5-Le-NNTx-Hvk-teacher-image-LOH.jpg"
                            alt="Teacher in a classroom"
                            className="rounded-3xl shadow-md"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherSection;