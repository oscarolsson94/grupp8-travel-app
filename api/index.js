import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import bookingsRoutes from "./routes/bookings.js";
import tripRoutes from "./routes/planTrip.js";
import ticketClassRoutes from "./routes/ticketClass.js";
import cors from "cors";

dotenv.config();

const path = require("path");
const PORT = process.env.PORT;
const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connection Successful"))
    .catch((err) => {
        console.error(err);
    });

app.use(express.json());

app.use(cors());

app.use("/api/auth", authRoutes);

app.use("/api/bookings", bookingsRoutes);

app.use("/api/planTrip", tripRoutes);

app.use("/api/ticketClass", ticketClassRoutes);

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
