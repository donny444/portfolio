require("dotenv").config();
const mongodb = require("mongodb");

async function Skills(req, res) {
    try {
        const client = new mongodb.MongoClient(process.env.MONGODB_URI);
        client.connect();

        const database = await client.db("portfolio");
        const collection = await database.collection("skills");

        const result = await collection.find({}).toArray();
        await client.close();

        return res.status(200).json(result);
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error"});
    }
}

module.exports = Skills;