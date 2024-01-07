const express = require("express");
const Board = require("../models/Boards");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    const newboard = new Board({ title });
    const board = await newboard.save(); // Wait for the save operation to complete
    res.json(board);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create board" }); // Handle error with an appropriate response
  }
});
router.get("/:id", async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ msg: "Board not found" });
    }

    res.json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.get("/activity/:boardId", async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      return res.status(404).json({ msg: "Board not found" });
    }

    res.json(board.activity);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
