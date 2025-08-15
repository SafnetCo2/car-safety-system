// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
    const maxRetries = 5; // Number of retry attempts
    let attempts = 0;

    const connectWithRetry = async () => {
        try {
            const conn = await mongoose.connect(process.env.MONGO_URI);
            console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        } catch (error) {
            attempts++;
            console.error(`❌ MongoDB Connection Error: ${error.message}`);

            if (attempts < maxRetries) {
                console.log(`🔄 Retrying to connect... Attempt ${attempts}/${maxRetries}`);
                setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
            } else {
                console.error("❌ Max retries reached. Exiting...");
                process.exit(1);
            }
        }
    };

    connectWithRetry();
};

module.exports = connectDB;
