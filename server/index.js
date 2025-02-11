const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 9000;

const app = express();
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// app.use(express.json());
app.use(express.json());


// const uri = process.env.MONGO_URI;
const uri = `mongodb+srv://solosphere:iWVwKAPVokeFjwvl@cluster0.kfk05.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kfk05.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

// MongoDB client initialization
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

// Run MongoDB operations
async function run() {
    try {
        const userCollection = client.db('solosphere').collection('user');

        app.post('/users', async (req, res) => {
            try {
                const { email, pass, name, photo } = req.body;
                if (!email || !pass || !name || !photo) {
                    return res.status(400).json({ message: "All fields are required" });
                }

                const newUser = { email, pass, name, photo };
                const result = await userCollection.insertOne(newUser);

                res.status(201).json({ message: "User registered successfully", user: result });
            } catch (error) {
                console.error("Error creating user:", error);
                res.status(500).json({ message: "Error creating user", error: error.message });
            }
        });



        // Get all users (Read)
        app.get('/users', async (req, res) => {
            try {
                const users = await userCollection.find().toArray();
                res.status(200).send(users);
            } catch (err) {
                res.status(500).send({ message: 'Error fetching users', error: err.message });
            }
        });

        // Update user by ID
        app.put('/users/:id', async (req, res) => {
            const { name, email, photo } = req.body;
            const { id } = req.params;

            try {
                const updatedUser = await userCollection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { name, email, photo } }
                );

                if (updatedUser.matchedCount === 0) {
                    return res.status(404).send({ message: 'User not found' });
                }

                res.status(200).send({ success: true, message: 'User updated' });
            } catch (err) {
                res.status(500).send({ message: 'Error updating user', error: err.message });
            }
        });

        // Delete user by ID
        app.delete('/users/:id', async (req, res) => {
            const { id } = req.params;

            try {
                const deletedUser = await userCollection.deleteOne({ _id: new ObjectId(id) });

                if (deletedUser.deletedCount === 0) {
                    return res.status(404).send({ message: 'User not found' });
                }

                res.status(200).send({ success: true, message: 'User deleted' });
            } catch (err) {
                res.status(500).send({ message: 'Error deleting user', error: err.message });
            }
        });

        // Ping the MongoDB server
        await client.db('admin').command({ ping: 1 });
        console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } finally {
        // Ensures that the client will close when you finish/error
    }
}

run().catch(console.dir);

// Root endpoint
app.get('/', (req, res) => {
    res.send('Hello from crimeWatch server!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});