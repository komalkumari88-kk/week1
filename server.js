const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017"; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Connection failed", err);
    };
    app.user ('/', authRoutes);
        app.listen(PORT,() => console.log('Server running on http://localhost:${PORT})'));