
const Card = ({ title, value }) => (
    <div className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-3xl mt-2">{value}</p>
    </div>
);

export default Card;