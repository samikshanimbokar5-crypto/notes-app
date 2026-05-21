const express = require("express");

const Note = require("../models/Note");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE NOTE
router.post("/create", authMiddleware, async (req, res) => {

    try {

        const { title, content } = req.body;

        const newNote = new Note({
            title,
            content,
            userId: req.userId
        });

        await newNote.save();

        res.status(201).json({
            message: "Note created successfully",
            newNote
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});


// GET ALL NOTES
// UPDATE NOTE
router.put("/update/:id", authMiddleware, async (req, res) => {

    try {

        const { title, content } = req.body;

        const updatedNote = await Note.findOneAndUpdate(

            {
                _id: req.params.id,
                userId: req.userId
            },

            {
                title,
                content
            },

            {
                new: true
            }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note updated successfully",
            updatedNote
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});
// DELETE NOTE
router.delete("/delete/:id", authMiddleware, async (req, res) => {

    try {

        const deletedNote = await Note.findOneAndDelete({

            _id: req.params.id,
            userId: req.userId
        });

        if (!deletedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});
router.get("/", authMiddleware, async (req, res) => {

    try {

        const notes = await Note.find({
            userId: req.userId
        });

        res.status(200).json(notes);

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});

module.exports = router;