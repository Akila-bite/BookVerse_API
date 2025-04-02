const mongoose = require("mongoose");

const MONGO_URI = mongodb+srv://akila_bookverse:1d2sxMT5cZfGKcSw@cluster0.y0e6w.mongodb.net/bookverse?retryWrites=true&w=majority&appName=Cluster0;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Atlas connected!");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1)
    }
};

module.exports = connectDB;