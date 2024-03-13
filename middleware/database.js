import mongoose from "mongoose";

const connectDB = handler => async (req, res) => {
    try {
        if (mongoose.connections[0].readyState) {
            console.log("MongoDB is already connected");
            return handler(req, res);
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "amazeart",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connected");
        return handler(req, res);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export default connectDB;
