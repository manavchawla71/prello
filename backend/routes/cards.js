const express = require("express");
const Card = require("../models/Card");
const router = express.Router();
// add a new card in list
router.post("/", async (req, res) => {
  try {
    const { title, listId } = req.body;
    const boardsid = req.header("boardId");
    const newcard = new Card({ title });
    const card = await newcard.save();
    const list = await List.findById(listId);
    list.cards.push(card.id);
    await list.save();
    res.json({ cardId: card.id, listId });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
// get all the cards of a list
router.get("/listCards/:listId", async (req, res) => {
  try {
    const list = await List.findById(req.params.listId);
    if (!list) {
      return res.status(404).json({ msg: "List not found" });
    }

    const cards = [];
    for (const cardId of list.cards) {
      cards.push(await List.findById(cardId));
    }

    res.json(cards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.get("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ msg: "Card not found" });
    }

    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.delete("/:listId/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    const list = await List.findById(req.params.listId);
    if (!card || !list) {
      return res.status(404).json({ msg: "List/card not found" });
    }

    list.cards.splice(list.cards.indexOf(req.params.id), 1);
    await list.save();
    await card.remove();

    // Log activity
    // const user = await User.findById(req.user.id);
    // const board = await Board.findById(req.header("boardId"));
    // board.activity.unshift({
    //   text: `${user.name} deleted '${card.title}' from '${list.title}'`,
    // });
    // await board.save();

    res.json(req.params.id);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.put("/move/:id", async (req, res) => {
  try {
    const { fromid, toid, toindex } = req.body; // Changed variable names to match case with usage
    const boardid = req.header("boardId");
    const cardId = req.params.id;
    const from = await List.findById(fromid);
    const to = await List.findById(toid);
    if (!cardId || !from || !to) {
      return res.status(404).json({ msg: "List/card not found" });
    } else if (fromid === toid) {
      // Changed variable names to match case with usage
      to = from;
    }

    const fromIndex = from.cards.indexOf(cardId);
    if (fromIndex !== -1) {
      from.cards.splice(fromIndex, 1);
      await from.save();
    }

    if (!to.cards.includes(cardId)) {
      if (toindex === 0 || toindex) {
        // Changed variable names to match case with usage
        to.cards.splice(toindex, 0, cardId);
      } else {
        to.cards.push(cardId);
      }
      await to.save();
    }
    res.status(200).json({ msg: "Card moved successfully" }); // Send a success message if the card is moved
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
