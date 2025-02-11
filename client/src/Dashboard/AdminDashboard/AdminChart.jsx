import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const AdminChart = ({ title }) => {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: title,
                data: [12, 19, 3, 5, 2, 3],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: title,
            },
        },
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <Line data={data} options={options} />
        </div>
    );
};

export default AdminChart;
