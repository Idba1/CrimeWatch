const express = require('express')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 9000
const app = express()
const corsOptions = {
    origin: ['http://localhost:5173/', 'http://localhost:5174/'],
    Credential: true,
    optionSuccessStatus: 2000,
}
app.use(cors(corsOptions))
app.use(express.json())
const uri = `mongodb+srv://solosphere:iWVwKAPVokeFjwvl@cluster0.kfk05.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send("hello from solosphere server..!!");
})

app.listen(port, () =>
    console.log(`server running port on ${port}`))