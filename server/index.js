const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 9000;
const nodemailer = require('nodemailer');

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
        // Create/use the "crimePosts" collection in your database
        const crimePostsCollection = client.db('solosphere').collection('crimePosts');

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

        const nodemailer = require('nodemailer');

        async function sendPasswordRecoveryEmail(email, resetLink) {
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: "crimewatch596@gmail.com",
                    pass: "crimewatch09+?",
                },
            });

            const mailOptions = {
                from: "crimewatch596@gmail.com",
                to: email, // Changed to dynamic email
                subject: 'Password Recovery',
                html: `<p>Please click the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log('Password recovery email sent successfully to', email);
            } catch (error) {
                console.error('Error sending password recovery email:', error);
            }
        }


        app.post('/request-password-recovery', async (req, res) => {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }

            try {
                const user = await userCollection.findOne({ email });
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                const token = crypto.randomBytes(32).toString('hex');
                const expireTime = new Date(Date.now() + 3600000); // Token expires in 1 hour

                await userCollection.updateOne({ email }, { $set: { resetToken: token, resetTokenExpire: expireTime } });

                const resetLink = `http://localhost:3000/reset-password?token=${token}&email=${email}`;

                // Send email with reset link (using an email service like SendGrid or NodeMailer)
                await sendPasswordRecoveryEmail(email, resetLink);

                res.status(200).json({ message: "Password recovery email sent" });
            } catch (err) {
                console.error("Error sending password recovery email:", err);
                res.status(500).json({ message: "Error sending password recovery email", error: err.message });
            }
        });


        async function testEmail() {
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: "crimewatch596@gmail.com",
                    pass: "crimewatch09+?",
                },
            });

            const mailOptions = {
                from: "crimewatch596@gmail.com",
                to: "moniraislam181@gmail.com",
                subject: 'Test Email',
                html: `<p>This is a test email.</p>`,
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log('Test email sent successfully');
            } catch (error) {
                console.error('Error sending test email:', error);
            }
        }

        testEmail();


        // ── CREATE: Add a new crime post 
        app.post('/crimePosts', async (req, res) => {
            try {
                const { title, description, division, district, images, video, crimeTime } = req.body;
                // Validate required fields
                if (!title || !description || !division || !district || !images || !crimeTime) {
                    return res.status(400).json({ message: "Missing required fields" });
                }

                // Set the post time to now (server-side) and convert crimeTime to a Date
                const postTime = new Date();
                const newCrimePost = {
                    title,
                    description,
                    division,
                    district,
                    images,
                    video: video || null,
                    postTime,
                    crimeTime: new Date(crimeTime),
                };

                const result = await crimePostsCollection.insertOne(newCrimePost);
                res.status(201).json({
                    message: "Crime post created successfully",
                    crimePost: { _id: result.insertedId, ...newCrimePost },
                });
            } catch (error) {
                console.error("Error creating crime post:", error);
                res.status(500).json({ message: "Error creating crime post", error: error.message });
            }
        });

        // ── READ: Get all crime posts 
        app.get('/crimePosts', async (req, res) => {
            try {
                const posts = await crimePostsCollection.find().toArray();
                res.status(200).json(posts);
            } catch (error) {
                res.status(500).json({ message: "Error fetching crime posts", error: error.message });
            }
        });

        // ── READ: Get a single crime post by ID 
        app.get('/crimePosts/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const post = await crimePostsCollection.findOne({ _id: new ObjectId(id) });
                if (!post) {
                    return res.status(404).json({ message: "Crime post not found" });
                }
                res.status(200).json(post);
            } catch (error) {
                res.status(500).json({ message: "Error fetching crime post", error: error.message });
            }
        });

        // ── UPDATE: Update a crime post by ID 
        app.put('/crimePosts/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const { title, description, division, district, images, video, crimeTime } = req.body;
                const updatedPost = {
                    title,
                    description,
                    division,
                    district,
                    images,
                    video: video || null,
                    crimeTime: new Date(crimeTime),
                };

                const result = await crimePostsCollection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: updatedPost }
                );

                if (result.matchedCount === 0) {
                    return res.status(404).json({ message: "Crime post not found" });
                }
                res.status(200).json({ message: "Crime post updated successfully" });
            } catch (error) {
                console.error("Error updating crime post:", error);
                res.status(500).json({ message: "Error updating crime post", error: error.message });
            }
        });

        // ── DELETE: Delete a crime post by ID 
        app.delete('/crimePosts/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const result = await crimePostsCollection.deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 0) {
                    return res.status(404).json({ message: "Crime post not found" });
                }
                res.status(200).json({ message: "Crime post deleted successfully" });
            } catch (error) {
                res.status(500).json({ message: "Error deleting crime post", error: error.message });
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