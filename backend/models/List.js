const { Schema, model } = require("mongoose");

const ListSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: "card",
    },
  ],
  archived: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = List = model("list", ListSchema);
