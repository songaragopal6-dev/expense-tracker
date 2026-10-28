import { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";

function Dashboard() {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    paymentMethod: "",
    date: "",
    description: "",
  });

  const [Data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:3000";

  // Calculate total expenses
  let total = 0;

  Data.forEach((expense) => {
    total += Number(expense.amount);
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  // Fetch logged-in user's expenses
const fetchData = async () => {
  try {
    const token = localStorage.getItem("userToken");

    if (!token) {
      console.log("Token not found. Please login again.");
      setData([]);
      return;
    }

    const response = await axios.get(`${API_URL}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Fetched expenses:", response.data);

    setData(response.data.Records );

  } catch (error) {
   console.log(error)

    setLoading(false);
  }
};
  // Add a new expense
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const expenseData = {
      ...form,
      amount: Number(form.amount),
      category: form.category,
    };

    const token = localStorage.getItem("userToken");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (editingId) {
      // Update existing expense
      await axios.put(
        `http://localhost:3000/expenses/${editingId}`,
        expenseData,
        config
      );

      alert("Expense updated successfully!");
    } else {
      // Add new expense
      await axios.post(
        "http://localhost:3000/expenses",
        {
          ...expenseData,
          catagory: expenseData.category,
        },
        config
      );

      alert("Expense added successfully!");
    }

    // Reset form
    setForm({
      title: "",
      amount: "",
      category: "",
      paymentMethod: "",
      date: "",
      description: "",
    });

    // Exit edit mode
    setEditingId(null);
    setShowForm(false);

    // Refresh expense list
    await fetchData();

  } catch (error) {
    console.log(
      "Error saving expense:",
      error.response?.data || error.message
    );

    alert("Failed to save expense.");
  }
};

  // Delete an expense
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) {
      return;
    }

    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        alert("Please log in first.");
        return;
      }

     const response =  await axios.delete(`${API_URL}/expenses/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data)
    
      // Refresh records after deletion
      await fetchData();
    } catch (error) {
      console.log(
        "Error deleting expense:",
        error.response?.data || error.message
      );
    }
  };
  const [editingId, setEditingId] = useState(null);
const handleEdit = (expense) => {
  setForm({
    title: expense.title || "",
    amount: expense.amount || "",
    category: expense.category || expense.catagory || "",
    paymentMethod: expense.paymentMethod || "",
    date: expense.date
      ? new Date(expense.date).toISOString().slice(0, 10)
      : "",
    description: expense.description || "",
  });

  setEditingId(expense._id);
  setShowForm(true);
};
  // Fetch expenses when dashboard loads
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard">

      <aside className="sidebar">
        <h2>Expense Tracker</h2>

        <button onClick={() => setShowForm(false)}>
          Dashboard
        </button>

        <button onClick={() => setShowForm(true)}>
          + Add Expense
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome to your expense tracker</p>
          </div>

          <button
            className="add-btn"
            onClick={() => setShowForm(!showForm)}
          >
            + Add New Expense
          </button>
        </header>

        {/* Summary Cards */}
        <div className="cards">
          <div className="card">
            <h3>Total Expenses</h3>
            <h2>₹ {total.toLocaleString("en-IN")}</h2>
          </div>

          <div className="card">
            <h3>Total Records</h3>
            <h2>{Data.length}</h2>
          </div>
        </div>

        {/* Add Expense Form */}
        {showForm && (
        <div className="form-card">
  <h2>
    {editingId ? "Edit Expense" : "Add New Expense"}
  </h2>

            <form onSubmit={handleSubmit}>
              <label>Expense Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter expense title"
                value={form.title}
                onChange={handleChange}
                required
              />

              <label>Amount</label>
              <input
                type="number"
                name="amount"
                placeholder="Enter amount"
                value={form.amount}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                required
              />

              <label>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Bill">Bill</option>
                <option value="Other">Other</option>
              </select>

              <label>Payment Method</label>
              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="">Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Net Banking">Net Banking</option>
              </select>

              <label>Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />

              <label>Description</label>
              <textarea
                name="description"
                placeholder="Enter description (optional)"
                value={form.description}
                onChange={handleChange}
              />
<button type="submit" className="save-btn">
  {editingId ? "Update Expense" : "Save Expense"}
</button>

              <button
                className=""
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* Expense Table */}
        <div className="table-card">
          <h2>Recent Expenses</h2>

          
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

<tbody>
  {Data.map((expense) => (
    <tr key={expense._id}>
      <td>{expense.title}</td>
      <td>{expense.category }</td>
      <td>₹ {Number(expense.amount).toLocaleString("en-IN")}</td>
      <td>
        {expense.date
          ? new Date(expense.date).toLocaleDateString("en-IN")
          : ""}
      </td>
    <td>
  <button
    className="edit-btn"
    onClick={() => handleEdit(expense)}
  >
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={() => handleDelete(expense._id)}
  >
    Delete
  </button>
</td>
    </tr>
  ))}
</tbody>
              </table>

              {Data.length === 0 && (
                <p className="empty-message">
                  No expenses found. Add your first expense!
                </p>
              )}
            </div>
          
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
