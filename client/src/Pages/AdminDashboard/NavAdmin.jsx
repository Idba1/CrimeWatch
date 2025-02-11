const { NavLink } = require("react-router-dom");
const { default: Home } = require("../Home/Home");
const { default: SettingsPage } = require("./SettingsPage");

const Navbar = () => (
    <nav className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-4">
            <li>
                <NavLink exact to="/" className="hover:underline" activeClassName="font-bold">
                    <Home className="inline mr-1" /> Dashboard
                </NavLink>
            </li>
            <li>
                <NavLink to="/teams" className="hover:underline" activeClassName="font-bold">
                    <Users className="inline mr-1" /> Teams
                </NavLink>
            </li>
            <li>
                <NavLink to="/settings" className="hover:underline" activeClassName="font-bold">
                    <SettingsPage className="inline mr-1" /> Settings
                </NavLink>
            </li>
        </ul>
    </nav>
);