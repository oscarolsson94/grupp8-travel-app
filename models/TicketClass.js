import mongoose from "mongoose";

const TicketClassSchema = new mongoose.Schema(
  {
    ageGroup: { type: String, required: true, unique: true },
    class1: { type: Number, required: true },
    class2: { type: Number, required: true }, 
  },
);

const TicketClass = mongoose.model("TicketClass", TicketClassSchema);

export default TicketClass;
