const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const CardRoutes = require("./routes/cards");
const Boardsroutes = require("./routes/boards");
const ListRoutes = require("./routes/lists");
const Userroutes = require("./routes/auth");
app.use("/api/boards", Boardsroutes);
app.use("/api/lists", ListRoutes);
app.use("/api/cards", CardRoutes);
app.use("/api/auth", Userroutes);

mongoose
  .connect(
    "mongodb+srv://chawlamanav71:lnzK2dJ4SMk3EYAH@cluster0.3poam7j.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
