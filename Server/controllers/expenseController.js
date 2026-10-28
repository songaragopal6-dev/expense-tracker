import expenseModel from "../models/expenseModel.js";

const expenseController = {
  async create(req, res) {
    try {
      const { title, amount, category, paymentMethod, date, description } =
        req.body;

      const newRecord = new expenseModel({
        title,
        amount,
        category,
        paymentMethod,
        date,
        description,
        userId: req.user.id,
      });

      await newRecord.save();

      res.status(201).send({
        success: true,
        message: "Expense created successfully",
        record: newRecord,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "Error creating expense",
        error: error.message,
      });
    }
  },
  async getAll(req, res) {
    try {
  //     const total = await expenseModel.countDocuments();
  //     console.log(total);
  //     const limit = 2;
  //     const totalPages = Math.ceil(total / limit);
      
  // const query = req.query
  // const current = query?.current_page ||1;
  // const offset = (current-1)*limit

      const Data = await expenseModel.find({
        userId: req.user.id,
     } )
      // .skip(offset)
      // .limit(limit)

      res.status(200).send({
        success: true,
        message: "User expenses fetched successfully",
        Records: Data,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error fetching expenses",
        error: error.message,
      });
    }
  },

  async getOne(req, res) {
    try {
      const record = await expenseModel.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });

      if (!record) {
        return res.status(404).send({
          success: false,
          message: "Expense not found",
        });
      }

      res.status(200).send({
        success: true,
        message: "Expense found successfully",
        Records: record,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error fetching expense",
        error: error.message,
      });
    }
  },

  async remove(req, res) {
    try {
      const record = await expenseModel.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id,
      });

      if (!record) {
        return res.status(404).send({
          success: false,
          message: "Expense not found",
        });
      }

      res.status(200).send({
        success: true,
        message: "Expense deleted successfully",
        Records: record,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error deleting expense",
        error: error.message,
      });
    }
  },

  async update(req, res) {
    try {
      const record = await expenseModel.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.user.id,
        },
        req.body,
        {
          new: true,
          runValidators: true,
        },
      );

      if (!record) {
        return res.status(404).send({
          success: false,
          message: "Expense not found",
        });
      }

      res.status(200).send({
        success: true,
        message: "Expense updated successfully",
        Records: record,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error updating expense",
        error: error.message,
      });
    }
  },
};

export default expenseController;
