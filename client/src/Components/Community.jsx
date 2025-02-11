import { useEffect, useState } from "react";
import axios from "axios";

const Community = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get("http://localhost:9000/users");
        setTeamMembers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching team members:", error);
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Meet Our Community</h1>
        <p className="text-center text-gray-400 mb-10">
          Discover the amazing individuals who make our community great.
        </p>
        {loading ? (
          <p className="text-center">Loading team members...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center text-center"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mb-4 border-4 border-gray-700"
                />
                <h2 className="text-lg font-semibold">{member.name}</h2>
                <p className="text-sm text-gray-400">{member.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;