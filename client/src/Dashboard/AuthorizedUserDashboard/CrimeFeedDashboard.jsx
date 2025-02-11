import CrimeCard from "./CrimeCard";

const dummyCrimePosts = [
    {
        id: 1,
        title: "Burglary in Dhanmondi",
        description: "A burglary was reported in Dhanmondi. An image of the crime scene is attached.",
        division: "Dhaka",
        district: "Dhaka",
        postTime: "2025-02-06T10:00:00Z",
        crimeTime: "2025-02-05T22:00:00Z",
        upvotes: 12,
        downvotes: 3,
    },
    {
        id: 2,
        title: "Road Accident on Airport Road",
        description: "A major accident was witnessed on Airport Road. Community comments are validating the report.",
        division: "Dhaka",
        district: "Dhaka",
        postTime: "2025-02-06T11:30:00Z",
        crimeTime: "2025-02-06T10:45:00Z",
        upvotes: 20,
        downvotes: 2,
    },
    // Add more dummy posts as needed.
];

const CrimeFeedDashboard = () => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Crime Feed</h2>
            <div className="space-y-4">
                {dummyCrimePosts.map((post) => (
                    <CrimeCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default CrimeFeedDashboard;
