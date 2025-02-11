import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import VerifiedDashboard from "../AuthorizedUserDashboard/VerifiedDashboard"

const ConditionalDashboard = () => {
    const { role } = useContext(AuthContext);

    // If the role is 'admin', show AdminDashboard. Otherwise, show VerifiedDashboard.
    if (role === "admin") {
        return <AdminDashboard />;
    } else {
        return <VerifiedDashboard />;
    }
};

export default ConditionalDashboard;