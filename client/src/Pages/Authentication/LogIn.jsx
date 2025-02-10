import { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
    const { signIn, signInWithGoogle, user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user, from, navigate]);

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/jwt`,
                { email: result.user.email },
                { withCredentials: true }
            );
            toast.success('Sign in successful!');
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleSignInEmailPass = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const result = await signIn(email, password);
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/jwt`,
                { email: result.user.email },
                { withCredentials: true }
            );
            toast.success('Login successful!');
            navigate(from, { replace: true });
        } catch (err) {
            toast.error(err.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-center">Login</h2>
                <form onSubmit={handleSignInEmailPass}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
                {/* <div className="mt-4 text-center">
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full py-2 border rounded-lg flex justify-center items-center gap-2 hover:bg-gray-100"
                    >
                        Sign in with Google
                    </button>
                </div> */}
                <p className="mt-4 text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/registration" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;