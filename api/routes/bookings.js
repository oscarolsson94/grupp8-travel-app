import express from "express";
import Booking from "../models/Booking.js";
import verify from "../verifyToken.js";

const router = express.Router();

//GET ONE BOOKING BY _id
router.get("/single/:id", verify, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id });
    res.send(booking);
  } catch (error) {
    res.status(404).json(error);
  }
});

//GET ALL BOOKINGS BY EMAIL
router.get("/:email", verify, async (req, res) => {
  try {
    const userBookings = await Booking.find({ userEmail: req.params.email });
    res.send(userBookings);
  } catch (error) {
    res.status(404).json(error);
  }
});

//CREATE
router.post("/", verify, async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE ONE BOOKING BY _id
router.delete("/:id", verify, async (req, res) => {
  try {
    await Booking.deleteOne({ _id: req.params.id });
    res
      .status(204)
      .json(`The booking with id ${req.params.id} has been deleted...`);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
