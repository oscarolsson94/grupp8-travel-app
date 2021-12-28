import express from "express";
import TicketClass from "../models/TicketClass.js";

const router = express.Router();


router.post("/", async (req, res) => {
    const ticketClass = new TicketClass(req.body);
    try {
        const savedTicketClass = await ticketClass.save();
        res.status(201).json(savedTicketClass);
    } catch (err) {
        res.status(500).json(err);
    }
});

// age group : adult, child etc
router.get("/:ageGroup", async (req, res) => {
    try {
        const findAgeGroup = await TicketClass.find({
            ageGroup: req.params.ageGroup,
        });
        res.status(200).json(findAgeGroup);
    } catch (err) {
        res.status(500).json("No age group match your search");
    }
});

export default router;
