import express from "express";
import TripPlan from "../models/TripPlan.js";

const router = express.Router();

//fundering här om man ska lägga in parametrarna in i en parameter istället, typ :search och hämta ut bägge variablerna ur den - DE
router.get("/:fromLocation/:toLocation", async (req, res) => {
  try {
    const trips = await TripPlan.find({
      fromLocation: req.params.fromLocation,
      toLocation: req.params.toLocation
    });
    res.status(200).json({ ...trips });
  } catch (err) {
    res.status(500).json(
      "No trips match your search"
    );
  }
});

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
