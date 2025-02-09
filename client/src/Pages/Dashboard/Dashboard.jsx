import { useUserRole } from '../../hooks/useUserRole';
import ErrorPage from '../ErrorPage/ErrorPage';
import AdminDashboard from './AdminDashboard';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';

const Dashboard = () => {
    const { role } = useUserRole();

    switch (role) {
        case 'teacher':
            return <TeacherDashboard />;
        case 'student':
            return <StudentDashboard />;
        case 'admin':
            return <AdminDashboard />;
        default:
            return <ErrorPage />;
    }
};

export default Dashboard;