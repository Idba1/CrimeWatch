import AdminChart from "./AdminChart";
import AdminSidebar from "./AdminSidebar";
import StatsCard from "./StatsCard";


const AdminDashboard = () => {
    return (
        <div className="flex bg-gray-100 min-h-screen">
            <AdminSidebar />
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
                {/* Stats Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StatsCard
                        title="Today's Crime"
                        value="3k"
                        change="+55% from last week"
                        color="blue"
                    />
                    <StatsCard
                        title="Today's Users"
                        value="2,300"
                        change="+3% from last month"
                        color="green"
                    />
                    <StatsCard
                        title="New Visitors"
                        value="3,462"
                        change="-2% than yesterday"
                        color="red"
                    />
                    <StatsCard
                        title="News"
                        value="$103,430"
                        change="+5% than yesterday"
                        color="orange"
                    />
                </div>
                {/* Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <AdminChart title="Website View" />
                    <AdminChart title="Daily News" />
                    <AdminChart title="Viewers Feedback" />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;