
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import expenseController from "./controllers/expenseController.js";
import userConroller from "./controllers/userController.js";
import verifyToken from "./middleware/authMiddleware.js";
import userModel from "./models/userModel.js";

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/Idea")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });

 
// Public routes
app.post("/register", userConroller.register);
app.post("/login", userConroller.login);

// Protected expense routes
app.get("/",verifyToken, expenseController.getAll)

app.get("/:id", verifyToken, expenseController.getOne);

app.post("/expenses", verifyToken, expenseController.create);

app.put("/expenses/:id", verifyToken, expenseController.update);

app.delete(
  "/expenses/delete/:id",
  verifyToken,
  expenseController.remove
);

// Start server
app.listen(3000, () => {
  console.log("Express server working finely on port 3000");
});
