import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    fromLocation: { type: String, required: true },
    departureTimeAndDate: { type: Date, required: true },
    toLocation: { type: String, required: true },
    arrivalTimeAndDate: { type: Date, required: true },
    passengerType: { type: String, required: true }, //ex Adult, Child etc.
    ticketClass: { type: String }, //ex 1:st class
    price: { type: Number, required: true },
    train: [
      {
      advertisedTrainNumber: { type: Number }, //ex 188 GBG-STHLM
      trainCarNumber: { type: Number },
      trainCarSeat: { type: Number },
      trainCarSeatType: { type: String } //ex window seat
      }
    ],
    transfers: [
      {
        location: { type: String },
        waitingTime: { type: String },
        transferArrival: { type: Date },
        transferDeparture: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
