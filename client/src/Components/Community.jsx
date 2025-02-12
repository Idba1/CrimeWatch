import { useEffect, useState } from "react";
import axios from "axios";

const Community = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get("http://localhost:9000/users");
        setTeamMembers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching team members:", err);
        setError("Failed to load team members.");
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Meet Our Community</h1>
        <p className="text-center text-gray-400 mb-10">
          Discover the amazing individuals who make our community great.
        </p>
        {loading ? (
          <p className="text-center">Loading team members...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member._id || member.email}
                className="rounded-lg shadow-lg p-4 flex flex-col items-center text-center"
              >
                <img
                  src={member.photo || member.photoURL || "https://via.placeholder.com/150"}
                  alt="User Profile"
                  className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500"
                />
                <h2 className="text-lg font-semibold">
                  {member.name || member.displayName || "User Name"}
                </h2>
                <p className="text-sm text-black">{member.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;