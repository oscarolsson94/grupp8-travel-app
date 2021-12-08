import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    toLocation: { type: String, required: true, unique: true },
    fromLocation: { type: String, required: true },
    userEmail: { type: String, required: true },
    price: { type: String, required: true },
    departureTimeAndDate: { type: String, required: true },
    arrivalTimeAndDate: { type: String, required: true },
    transfers: [
      {
        location: { type: String },
        waitingTime: { type: String },
        transferArrival: { type: String },
        transferDeparture: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
