import { useEffect, useState } from "react";
import axios from "axios";

const Community = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get("https://randomuser.me/api/?results=8&nat=us");
        setTeamMembers(response.data.results);
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
                  src={member.picture.large}
                  alt={member.name.first}
                  className="w-24 h-24 rounded-full mb-4 border-4 border-gray-700"
                />
                <h2 className="text-lg font-semibold">{`${member.name.first} ${member.name.last}`}</h2>
                <p className="text-sm text-gray-400">{member.email}</p>
                <div className="flex space-x-4 mt-3">
                  <a
                    href={`https://twitter.com/${member.login.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href={`https://linkedin.com/in/${member.login.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;