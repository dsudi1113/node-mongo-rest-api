const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const router = express.Router();

const uri = "your-mongodb-connection-string";
const client = new MongoClient(uri);

const dbName = "sample_mflix"; // Change this to your database name
const collectionName = "users"; // Change this to your collection name

async function connectToDb() {
    if (!client.isConnected) {
        await client.connect();
        console.log("Connected to MongoDB");
    }
    return client.db(dbName).collection(collectionName);
}

// Routes
// 1. Get All Users
router.get("/", async (req, res) => {
    try {
        const collection = await connectToDb();
        const users = await collection.find({}).toArray();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// 2. Add a New User
router.post("/", async (req, res) => {
    try {
        const collection = await connectToDb();
        const newUser = req.body;
        const result = await collection.insertOne(newUser);
        res.status(201).json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// 3. Update a User
router.put("/:id", async (req, res) => {
    try {
        const collection = await connectToDb();
        const { id } = req.params;
        const updateData = req.body;
        const result = await collection.updateOne(
            { _id: new ObjectId(id) }, // Correctly use ObjectId
            { $set: updateData }
        );
        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// 4. Delete a User
router.delete("/:id", async (req, res) => {
    try {
        const collection = await connectToDb();
        const { id } = req.params;
        const result = await collection.deleteOne({ _id: new ObjectId(id) }); // Correctly use ObjectId
        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
