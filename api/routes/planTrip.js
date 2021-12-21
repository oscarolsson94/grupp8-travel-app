import express from "express";
import TripPlan from "../models/TripPlan.js";
import verify from "../verifyToken.js";

const router = express.Router();

//fundering här om man ska lägga in parametrarna in i en parameter istället, typ :search och hämta ut bägge variablerna ur den - DE
router.get("/:fromLocation/:toLocation", async (req, res) => {
  try {
    const trips = await TripPlan.find({
      fromLocation: req.params.fromLocation,
      toLocation: req.params.toLocation,
    });
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json("No trips match your search");
  }
});

router.get("/single/:id", async (req, res) => {
  try {
    const trip = await TripPlan.findOne({ _id: req.params.id });
    res.send(trip);
  } catch (error) {
    res.status(404).json(err);
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
