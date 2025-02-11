import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import VerifiedDashboard from "../AuthorizedUserDashboard/VerifiedDashboard";

const ConditionalDashboard = () => {
    const { role } = useContext(AuthContext);

    // Render the AdminDashboard if the role is "admin"
    if (role === 'admin') {
        return <AdminDashboard />;
    }
    // Otherwise, render the VerifiedDashboard (for general/verified users)
    return <VerifiedDashboard />;
};

export default ConditionalDashboard;