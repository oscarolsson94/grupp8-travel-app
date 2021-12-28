import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import bookingsRoutes from "./routes/bookings.js";
import tripRoutes from "./routes/planTrip.js";
import ticketClassRoutes from "./routes/ticketClass.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static(path.resolve(dirname(__filename), "./client/build")));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connection Successful"))
    .catch((err) => {
        console.error(err);
    });

app.use(express.json());

app.use(cors());

app.use("api/auth", authRoutes);

app.use("api/bookings", bookingsRoutes);

app.use("api/planTrip", tripRoutes);

app.use("api/ticketClass", ticketClassRoutes);

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
