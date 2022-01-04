import express from "express";
import TripPlan from "../models/TripPlan.js";

const router = express.Router();

router.get("/from/:searchTerm", async (req, res) => {
  try {
    const stations = await TripPlan
      .find({ fromLocation: { 
        $regex: '.*' + req.params.searchTerm + '.*',
        $options: 'i' } })
      .distinct("fromLocation");
    res.send(stations);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get("/to/:searchTerm", async (req, res) => {
  try {
    const stations = await TripPlan
      .find({ toLocation: { 
        $regex: '.*' + req.params.searchTerm + '.*',
        $options: 'i' } })
      .distinct("toLocation");
    res.send(stations);
  } catch (error) {
    res.status(404).json(error);
  }
});

export default router;
