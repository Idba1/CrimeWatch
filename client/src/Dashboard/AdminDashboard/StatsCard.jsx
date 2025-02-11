
const StatsCard = ({ title, value, change, color }) => {
    const borderColor = {
        blue: "border-blue-500",
        green: "border-green-500",
        red: "border-red-500",
        orange: "border-orange-500",
    }[color] || "border-gray-500";

    return (
        <div className={`border-l-4 ${borderColor} bg-white p-4 rounded shadow`}>
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-2xl font-bold mt-2">{value}</p>
            <p className="text-sm text-gray-500 mt-1">{change}</p>
        </div>
    );
};

export default StatsCard;
