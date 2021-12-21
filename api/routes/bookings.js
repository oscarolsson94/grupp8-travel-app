import express from "express";
import Booking from "../models/Booking.js";
import verify from "../verifyToken.js";
import User from "../models/User.js";

const router = express.Router();

//GET ONE BOOKING BY _id
router.get("/single/:id", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const booking = await Booking.findOne({ _id: req.params.id });

    // Verify that the data belongs to the user who requested it.
    if (booking.userEmail !== user.email) {
      res.status(403).json("oh no, something went wrong");
    }
    else {
      res.send(booking);
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

//GET ALL BOOKINGS BY EMAIL
router.get("/:email", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Verify that the data belongs to the user who requested it.
    if (req.params.email !== user.email) {
      res.status(403).json("oh no, something went wrong");
    }
    else {
      const userBookings = await Booking.find({ userEmail: req.params.email });
      res.send(userBookings);
    }
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
    const user = await User.findById(req.user.id);
    const booking = await Booking.findOne({ _id: req.params.id });

    // Verify that the data belongs to the user who requested it.
    if (booking.userEmail !== user.email) {
      res.status(403).json("oh no, something went wrong");
    }
    else {
      await Booking.deleteOne({ _id: req.params.id, userEmail: user.email });
      res
        .status(204)
        .json(`The booking with id ${req.params.id} has been deleted...`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
