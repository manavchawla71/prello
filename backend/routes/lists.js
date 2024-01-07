const express = require("express");
const router = express.Router();
const List = require("../models/List");
const Board = require("../models/Boards");
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    const boardid = req.header("boardid");
    const newlist = new List({ title });
    const list = await newlist.save();
    const board = await Board.findById(boardid);
    board.lists.push(list.id);
    await board.save();
    res.json(list);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/boardslists/:boardid", async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardid);
    if (!board) {
      return res.status(404).json({ msg: "Board not found" });
    }
    const lists = [];
    for (const listId of board.lists) {
      lists.push(await List.findById(listId));
    }
    res.json(lists);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.get("/:id", async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ msg: "List not found" });
    }

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.get("/:id", async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ msg: "List not found" });
    }

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.put("/update/:id", async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ msg: "List not found" });
    }

    list.title = req.body.title;
    await list.save();

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//   move a list

router.patch("/move/:id", async (req, res) => {
  try {
    const toIndex = req.body.toIndex ? req.body.toIndex : 0;
    const boardId = req.header("boardId");
    const board = await Board.findById(boardId);
    const listId = req.params.id;
    if (!listId) {
      return res.status(404).json({ msg: "List not found" });
    }

    board.lists.splice(board.lists.indexOf(listId), 1);
    board.lists.splice(toIndex, 0, listId);
    await board.save();

    res.send(board.lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
