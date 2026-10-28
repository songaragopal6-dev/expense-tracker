import mongoose, { Schema } from "mongoose";
const expenseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
  },
  category: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  date: {
    type: Date,
  },
  description: {
    type: String,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const expenseModel = mongoose.model("Expense", expenseSchema);

export default expenseModel;
