const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const crypto = require('crypto'); // Required for generating tokens in password recovery
require('dotenv').config();
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 9000;

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Use your MongoDB URI – ideally, store it in .env
const uri = `mongodb+srv://solosphere:iWVwKAPVokeFjwvl@cluster0.kfk05.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        await client.connect();
        const userCollection = client.db('solosphere').collection('user');
        const crimePostsCollection = client.db('solosphere').collection('crimePosts');

        // ──────────────────────────────
        // USER ENDPOINTS
        // ──────────────────────────────

        // POST /users – Create a new user
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

        // GET /users – Retrieve user(s). If an email query parameter is provided, returns that user.
        app.get('/users', async (req, res) => {
            try {
                const { email } = req.query;
                if (email) {
                    const user = await userCollection.findOne({ email });
                    if (!user) return res.status(404).json({ message: "User not found" });
                    return res.status(200).json(user);
                } else {
                    const users = await userCollection.find().toArray();
                    res.status(200).json(users);
                }
            } catch (err) {
                res.status(500).json({ message: 'Error fetching users', error: err.message });
            }
        });

        // PUT /users/:id – Update user profile (displayName, photoURL, bio, contact)
        app.put('/users/:id', async (req, res) => {
            const { id } = req.params;
            const { displayName, photoURL, bio, contact } = req.body;
            try {
                const result = await userCollection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { displayName, photoURL, bio, contact } }
                );
                if (result.matchedCount === 0) {
                    return res.status(404).json({ message: 'User not found' });
                }
                return res.status(200).json({ message: 'Profile updated successfully' });
            } catch (err) {
                return res.status(500).json({ message: 'Error updating profile', error: err.message });
            }
        });

        // DELETE /users/:id – Delete a user
        app.delete('/users/:id', async (req, res) => {
            const { id } = req.params;
            try {
                const deletedUser = await userCollection.deleteOne({ _id: new ObjectId(id) });
                if (deletedUser.deletedCount === 0) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json({ success: true, message: 'User deleted' });
            } catch (err) {
                res.status(500).json({ message: 'Error deleting user', error: err.message });
            }
        });

        // ──────────────────────────────
        // PASSWORD RECOVERY ENDPOINTS
        // ──────────────────────────────

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
                to: email,
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

        // ──────────────────────────────
        // CRIME POSTS ENDPOINTS
        // ──────────────────────────────

        // POST /crimePosts – Create a new crime post (now requires userEmail)
        app.post('/crimePosts', async (req, res) => {
            try {
                const { title, description, division, district, images, video, crimeTime, userEmail } = req.body;
                // Validate required fields including userEmail
                if (!title || !description || !division || !district || !images || !crimeTime || !userEmail) {
                    return res.status(400).json({ message: "Missing required fields" });
                }
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
                    userEmail,
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

        // GET /crimePosts – Get crime posts with optional query parameters for filtering, search, and pagination
        app.get('/crimePosts', async (req, res) => {
            const { userEmail, search, district, page = 1, limit = 8 } = req.query;
            const query = {};
            if (userEmail) query.userEmail = userEmail;
            if (search) {
                query.$or = [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ];
            }
            if (district) query.district = district;
            const pageNumber = parseInt(page);
            const limitNumber = parseInt(limit);
            try {
                const totalPosts = await crimePostsCollection.countDocuments(query);
                const posts = await crimePostsCollection.find(query)
                    .skip((pageNumber - 1) * limitNumber)
                    .limit(limitNumber)
                    .toArray();
                res.status(200).json({ posts, totalPosts, currentPage: pageNumber, totalPages: Math.ceil(totalPosts / limitNumber) });
            } catch (err) {
                return res.status(500).json({ message: 'Error fetching crime posts', error: err.message });
            }
        });

        // GET /crimePosts/:id – Get a single crime post by ID
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

        // PUT /crimePosts/:id – Update a crime post by ID
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

        // DELETE /crimePosts/:id – Delete a crime post by ID
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

        // Test connection to MongoDB
        await client.db('admin').command({ ping: 1 });
        console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } finally {
        // Optionally close the client when needed (for graceful shutdown)
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
