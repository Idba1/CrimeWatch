const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const crypto = require("crypto");
require("dotenv").config();
const nodemailer = require("nodemailer");
const axios = require("axios");

// For real-time notifications using Socket.IO
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const port = process.env.PORT || 9000;

// Create an HTTP server and integrate Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
  },
});

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB URI (store in .env in production)
const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://solosphere:iWVwKAPVokeFjwvl@cluster0.kfk05.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Mapping for connected users (userEmail => socket.id)
const connectedUsers = {};

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("register", (userEmail) => {
    connectedUsers[userEmail] = socket.id;
    console.log(`User registered: ${userEmail} with socket id: ${socket.id}`);
  });

  socket.on("disconnect", () => {
    for (let email in connectedUsers) {
      if (connectedUsers[email] === socket.id) {
        delete connectedUsers[email];
        break;
      }
    }
    console.log("A user disconnected:", socket.id);
  });
});

// Gemini API key and endpoint configuration
const geminiApiKey = "AIzaSyD80pwJZo2KwHm11TkJ-lo5EVSO92EIAV8";
// Replace with your actual Gemini API endpoint URL if different
const geminiApiEndpoint = "https://gemini-api.example.com/generate-description";

async function run() {
  try {
    await client.connect();
    // Collections
    const userCollection = client.db("solosphere").collection("user");
    const crimePostsCollection = client.db("solosphere").collection("crimePosts");

    // Helper function to send notifications based on user preferences.
    async function sendNotification(userEmail, notificationData) {
      const userDoc = await userCollection.findOne({ email: userEmail });
      if (userDoc) {
        const preferences = userDoc.notificationPreferences || {
          new_comments: true,
          votes: true,
          admin_actions: true,
        };
        if (notificationData.type === "new_comment" && !preferences.new_comments) return;
        if (notificationData.type === "vote" && !preferences.votes) return;
        if (notificationData.type === "admin_action" && !preferences.admin_actions) return;
      }
      if (connectedUsers[userEmail]) {
        io.to(connectedUsers[userEmail]).emit("notification", notificationData);
      }
    }

    // ──────────────────────────────
    // USER ENDPOINTS
    // ──────────────────────────────

    app.post("/users", async (req, res) => {
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

    app.get("/users", async (req, res) => {
      const { email } = req.query;
      try {
        if (email) {
          let user = await userCollection.findOne({ email });
          if (!user) {
            const defaultUser = {
              email,
              displayName: "",
              photoURL: "",
              bio: "",
              contact: "",
            };
            const result = await userCollection.insertOne(defaultUser);
            user = { ...defaultUser, _id: result.insertedId };
          }
          return res.status(200).json(user);
        } else {
          const users = await userCollection.find().toArray();
          return res.status(200).json(users);
        }
      } catch (err) {
        return res.status(500).json({ message: "Error fetching users", error: err.message });
      }
    });

    app.put("/users/:id", async (req, res) => {
      const { id } = req.params;
      const { displayName, photoURL, bio, contact, notificationPreferences } = req.body;
      try {
        const updateData = { displayName, photoURL, bio, contact };
        if (notificationPreferences) {
          updateData.notificationPreferences = notificationPreferences;
        }
        const result = await userCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );
        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Profile updated successfully" });
      } catch (err) {
        return res.status(500).json({ message: "Error updating profile", error: err.message });
      }
    });

    app.delete("/users/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const deletedUser = await userCollection.deleteOne({ _id: new ObjectId(id) });
        if (deletedUser.deletedCount === 0) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User deleted" });
      } catch (err) {
        res.status(500).json({ message: "Error deleting user", error: err.message });
      }
    });

    // ──────────────────────────────
    // PASSWORD RECOVERY ENDPOINTS
    // ──────────────────────────────

    async function sendPasswordRecoveryEmail(email, resetLink) {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER || "crimewatch596@gmail.com",
          pass: process.env.EMAIL_PASS || "crimewatch09+?",
        },
      });
      const mailOptions = {
        from: process.env.EMAIL_USER || "crimewatch596@gmail.com",
        to: email,
        subject: "Password Recovery",
        html: `<p>Please click the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
      };
      try {
        await transporter.sendMail(mailOptions);
        console.log("Password recovery email sent successfully to", email);
      } catch (error) {
        console.error("Error sending password recovery email:", error);
      }
    }

    app.post("/request-password-recovery", async (req, res) => {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      try {
        const user = await userCollection.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        const token = crypto.randomBytes(32).toString("hex");
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

    // Optional: Test Email function
    async function testEmail() {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER || "crimewatch596@gmail.com",
          pass: process.env.EMAIL_PASS || "crimewatch09+?",
        },
      });
      const mailOptions = {
        from: process.env.EMAIL_USER || "crimewatch596@gmail.com",
        to: "moniraislam181@gmail.com",
        subject: "Test Email",
        html: `<p>This is a test email.</p>`,
      };
      try {
        await transporter.sendMail(mailOptions);
        console.log("Test email sent successfully");
      } catch (error) {
        console.error("Error sending test email:", error);
      }
    }
    testEmail();

    // ──────────────────────────────
    // CRIME POSTS ENDPOINTS
    // ──────────────────────────────

    // POST /crimePosts – Create a new crime post (requires userEmail)
    app.post("/crimePosts", async (req, res) => {
      try {
        const { title, description, division, district, images, video, crimeTime, userEmail } = req.body;
        if (!title || !division || !district || !images || !crimeTime || !userEmail) {
          return res.status(400).json({ message: "Missing required fields" });
        }

        // For video posts, description must be provided manually.
        if (video && (!description || description.trim() === "")) {
          return res.status(400).json({ message: "Please provide a description manually for video posts." });
        }

        // For image posts, if no description is provided, generate one using Gemini API.
        let finalDescription = description;
        if (!video && (!description || description.trim() === "")) {
          // Ensure images is an array of URLs
          const imageUrls = Array.isArray(images) ? images : images.split(',').map(url => url.trim());
          try {
            // Call Gemini API with your API key as a query parameter.
            const geminiResponse = await axios.post(
              `${geminiApiEndpoint}?key=${geminiApiKey}`,
              { imageUrls }
            );
            if (geminiResponse.data && geminiResponse.data.description) {
              finalDescription = geminiResponse.data.description;
            }
          } catch (err) {
            console.error("Error generating description from Gemini API:", err);
            finalDescription = "No description available.";
          }
        }

        const postTime = new Date(); // Timestamp when the post is submitted
        const newCrimePost = {
          title,
          description: finalDescription,
          division,
          district,
          images: Array.isArray(images) ? images : images.split(',').map(url => url.trim()),
          video: video || null,
          postTime,
          crimeTime: new Date(crimeTime),
          userEmail,
          upvotes: 0,
          downvotes: 0,
          score: 0,
          comments: [],
        };

        const result = await crimePostsCollection.insertOne(newCrimePost);

        // Emit a notification to all connected users that a new crime post has been added.
        io.emit("notification", {
          type: "new_crime_post",
          message: `A new crime post "${newCrimePost.title}" has been added.`,
          postId: result.insertedId,
        });

        res.status(201).json({
          message: "Crime post created successfully",
          crimePost: { _id: result.insertedId, ...newCrimePost },
        });
      } catch (error) {
        console.error("Error creating crime post:", error);
        res.status(500).json({ message: "Error creating crime post", error: error.message });
      }
    });

    // GET /crimePosts – Retrieve crime posts with filtering, search, and pagination
    app.get("/crimePosts", async (req, res) => {
      const { userEmail, search, district, division, page = 1, limit = 8 } = req.query;
      const query = {};
      if (userEmail) query.userEmail = userEmail;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }
      if (district) query.district = district;
      if (division) {
        query.division = { $regex: division.trim(), $options: "i" };
      }
      const pageNumber = parseInt(page);
      const limitNumber = parseInt(limit);
      try {
        const totalPosts = await crimePostsCollection.countDocuments(query);
        const posts = await crimePostsCollection
          .find(query)
          .skip((pageNumber - 1) * limitNumber)
          .limit(limitNumber)
          .toArray();
        res.status(200).json({
          posts,
          totalPosts,
          currentPage: pageNumber,
          totalPages: Math.ceil(totalPosts / limitNumber),
        });
      } catch (err) {
        console.error("Error fetching crime posts:", err);
        res.status(500).json({ message: "Error fetching crime posts", error: err.message });
      }
    });

    // GET /crimePosts/:id – Get a single crime post by ID
    app.get("/crimePosts/:id", async (req, res) => {
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
    app.put("/crimePosts/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { title, description, division, district, images, video, crimeTime } = req.body;
        const updatedPost = {
          title,
          description,
          division,
          district,
          images: Array.isArray(images) ? images : images.split(',').map(url => url.trim()),
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
    app.delete("/crimePosts/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await crimePostsCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: "Crime post not found" });
        }
        io.emit("notification", {
          type: "admin_action",
          message: `A crime post (ID: ${id}) has been removed by an admin.`,
          action: "post_removed",
          postId: id,
        });
        res.status(200).json({ message: "Crime post deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error deleting crime post", error: error.message });
      }
    });

    // ──────────────────────────────
    // COMMUNITY INTERACTION ENDPOINTS (with Real-Time Notifications)
    // ──────────────────────────────

    // POST /crimePosts/:id/vote – Upvote or Downvote a crime post
    app.post("/crimePosts/:id/vote", async (req, res) => {
      const { id } = req.params;
      const { vote } = req.body; // Expected values: "upvote" or "downvote"
      if (!vote || (vote !== "upvote" && vote !== "downvote")) {
        return res.status(400).json({ message: "Invalid vote type. Must be 'upvote' or 'downvote'." });
      }
      const update =
        vote === "upvote"
          ? { $inc: { upvotes: 1, score: 1 } }
          : { $inc: { downvotes: 1, score: -1 } };
      try {
        const result = await crimePostsCollection.updateOne(
          { _id: new ObjectId(id) },
          update
        );
        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "Crime post not found" });
        }
        const post = await crimePostsCollection.findOne({ _id: new ObjectId(id) });
        if (post) {
          await sendNotification(post.userEmail, {
            type: "vote",
            message: `Your post received a ${vote}.`,
            postId: id,
            voteType: vote,
          });
        }
        res.status(200).json({ message: `Crime post ${vote}d successfully.` });
      } catch (error) {
        res.status(500).json({ message: "Error updating vote", error: error.message });
      }
    });

    // POST /crimePosts/:id/comments – Add a comment with proof to a crime post
    app.post("/crimePosts/:id/comments", async (req, res) => {
      const { id } = req.params;
      const { comment, userEmail, attachment } = req.body;
      if (!comment || !userEmail || !attachment) {
        return res.status(400).json({
          message: "Comment, userEmail, and a proof attachment (image/video URL) are required.",
        });
      }
      const newComment = {
        comment,
        userEmail,
        attachment,
        timestamp: new Date(),
        verified: true,
      };
      try {
        const result = await crimePostsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $push: { comments: newComment }, $inc: { score: 1 } }
        );
        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "Crime post not found" });
        }
        const post = await crimePostsCollection.findOne({ _id: new ObjectId(id) });
        if (post) {
          await sendNotification(post.userEmail, {
            type: "new_comment",
            message: "Your post has a new comment.",
            postId: id,
            comment: newComment,
          });
        }
        res.status(200).json({ message: "Comment added successfully", comment: newComment });
      } catch (error) {
        res.status(500).json({ message: "Error adding comment", error: error.message });
      }
    });

    // ──────────────────────────────
    // ADMIN ACTION ENDPOINT (Example: Ban a User)
    // ──────────────────────────────

    app.post("/admin/ban-user", async (req, res) => {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "User email is required" });
      }
      try {
        const result = await userCollection.updateOne({ email }, { $set: { isBanned: true } });
        if (result.modifiedCount === 0) {
          return res.status(404).json({ message: "User not found or already banned" });
        }
        await sendNotification(email, {
          type: "admin_action",
          message: "You have been banned by an admin.",
          action: "ban_user",
        });
        res.status(200).json({ message: "User banned and notified." });
      } catch (error) {
        res.status(500).json({ message: "Error banning user", error: error.message });
      }
    });

    // Test connection to MongoDB
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Optionally close the client when needed (for graceful shutdown)
  }
}

run().catch(console.dir);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello from crimeWatch server!");
});

// Start the server using the HTTP server (integrated with Socket.IO)
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});