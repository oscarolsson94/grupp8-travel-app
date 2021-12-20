import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    fromLocation: { type: String, required: true },
    departureTimeAndDate: { type: String, required: true },
    toLocation: { type: String, required: true },
    arrivalTimeAndDate: { type: String, required: true },
    passengerType: {type: String, required: true },
    price: { type: Number, required: true },
    train: [
      {
      advertisedTrainNumber: { type: String },
      trainCarNumber: { type: Number },
      trainCarSeat: { type: Number },
      trainCarSeatType: { type: String }
      }
    ],
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
