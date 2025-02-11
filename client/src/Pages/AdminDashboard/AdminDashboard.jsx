import Card from "./Card";
import CardContent from "./CardContent";

const AdminDashboard = () => (
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-3 gap-4">
            <Card>
                <CardContent>
                    <h2 className="text-xl font-semibold">Total Teams</h2>
                    <p className="text-3xl">45</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <h2 className="text-xl font-semibold">Registered Participants</h2>
                    <p className="text-3xl">120</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <h2 className="text-xl font-semibold">Event Duration</h2>
                    <p className="text-lg">8 hours + 30 min break</p>
                </CardContent>
            </Card>
        </div>
    </div>
);


export default AdminDashboard;




// const App = () => (
//     <Router>
//         <Navbar />
//         <Switch>
//             <Route exact path="/" component={Dashboard} />
//             <Route path="/teams" component={Teams} />
//             <Route path="/settings" component={SettingsPage} />
//         </Switch>
//     </Router>
// );

// export default App;
