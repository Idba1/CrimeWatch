import CrimeFeedDashboard from "./CrimeFeedDashboard";
import VerifiedSidebar from "./VerifiedSidebar";


const VerifiedDashboard = () => {
    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <VerifiedSidebar />

            {/* Main content */}
            <div className="flex-1 p-6">
                <header className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6">
                    <h1 className="text-2xl font-bold">Verified User Dashboard</h1>
                    <button
                        className="mt-4 md:mt-0 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                        // Replace the onClick handler with routing or modal logic as needed.
                        onClick={() => alert("Redirect to Report Crime page")}
                    >
                        Report Crime
                    </button>
                </header>

                {/* Crime Feed Section */}
                <CrimeFeedDashboard />
            </div>
        </div>
    );
};

export default VerifiedDashboard;
