import express from "express";
import TripPlan from "../models/TripPlan.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const createTrip = new TripPlan(req.body);
  try {
    const savedTrip = await createTrip.save();
    res.status(201).json(savedTrip);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;