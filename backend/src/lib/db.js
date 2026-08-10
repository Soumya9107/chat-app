import mongoose from 'mongoose';

export async function connectDB() { 
    try {
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error("MONGO_URI is required");
        }
        const conn =await mongoose.connect(mongoURI)

        console.log("MongoDB connected", conn.connection.host);
    } catch (error) { 
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
}