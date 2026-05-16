import { useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaWindowClose } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { publicRequest } from "./requestMethods"

function App() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState('');
  const [updatedID, setUpdatedID] = useState('');
  const [updatedLabel, setUpdatedLabel] = useState('');
  const [updatedAmount, setUpdatedAmount] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // ✅ Search filter
  const filteredExpenses = expenses.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Total expense
  const totalExpense = expenses.reduce((total, item) => total + Number(item.value), 0);

  const handleAllExpense = () => {
    setShowAddExpense(!showAddExpense);
  };

  const handleShowReport = () => {
    setShowReport(!showReport);
  };

  const handleUpdateExpense = async () => {
    if (updatedID) {
      try {
        await publicRequest.put(`/expenses/${updatedID}`, {
          value: updatedAmount,
          label: updatedLabel,
          date: updatedDate,
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleShowEdit = (id) => {
    setShowEdit(!showEdit);
    setUpdatedID(id);
  };

  const handleExpense = async () => {
    try {
      await publicRequest.post("/expenses", {
        label: label,
        value: amount,
        date: date,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const response = await publicRequest.get("/expenses");
        setExpenses(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/expenses/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="fixed z-[999] flex flex-col p-[10px] top-[20px] left-0 h-[500px] w-[500px] bg-white shadow-xl">
          <FaWindowClose onClick={handleAllExpense} className="self-end text-2xl text-red-500 cursor-pointer" />
          <label className="mt-[10px] font-semibold text-[18px]">Expense Name</label>
          <input type="text" placeholder="Bill" className="outline-none border-2 border-[#555] border-solid p-[10px]" onChange={(e) => setLabel(e.target.value)} />
          <label className="mt-[10px] font-semibold text-[18px]">Expense Date</label>
          <input type="date" className="outline-none border-2 border-[#555] border-solid p-[10px]" onChange={(e) => setDate(e.target.value)} />
          <label className="mt-[10px] font-semibold text-[18px]">Expense Amount</label>
          <input type="number" placeholder="1000" className="outline-none border-2 border-[#555] border-solid p-[10px]" onChange={(e) => setAmount(e.target.value)} />
          <button className="bg-[#af8978] text-white p-[10px] border-none cursor-pointer my-[10px]" onClick={handleExpense}>Add Expense</button>
        </div>
      )}

      {/* Expense Report Modal */}
      {showReport && (
        <div className="fixed z-[999] flex flex-col p-[10px] top-[20px] left-[100px] h-[500px] w-[500px] bg-white shadow-xl">
          <FaWindowClose onClick={handleShowReport} className="self-end text-2xl text-red-500 cursor-pointer" />
          <h2 className="text-[18px] font-semibold text-[#555] mt-[10px] mb-[10px]">Expense Report</h2>
          <PieChart width={400} height={350}>
            <Pie
              data={expenses}
              cx={200}
              cy={150}
              outerRadius={100}
              dataKey="value"
              nameKey="label"
              label={({ label }) => label}
            >
              {expenses.map((entry, index) => (
                <Cell key={index} fill={[
                  "#af8978",
                  "#60a5fa",
                  "#4ade80",
                  "#f87171",
                  "#facc15",
                  "#a78bfa",
                  "#fb923c",
                  "#34d399",
                  "#f472b6",
                  "#38bdf8"
                ][index % 10]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [value, name]} />
            <Legend />
          </PieChart>
        </div>
      )}

      {/* Edit Expense Modal */}
      {showEdit && (
        <div className="fixed z-[999] flex flex-col p-[10px] top-[25%] right-0 h-[500px] w-[500px] bg-white shadow-xl">
          <FaWindowClose onClick={handleShowEdit} className="self-end text-2xl text-red-500 cursor-pointer" />
          <label className="mt-[10px] font-semibold text-[18px]">Expense Name</label>
          <input type="text" placeholder="Bill" className="outline-none border-2 border-[#555] border-solid p-[10px]" onChange={(e) => setUpdatedLabel(e.target.value)} />
          <label className="mt-[10px] font-semibold text-[18px]">Expense Date</label>
          <input type="date" className="outline-none border-2 border-[#555] border-solid p-[10px]" onChange={(e) => setUpdatedDate(e.target.value)} />
          <label className="mt-[10px] font-semibold text-[18px]">Expense Amount</label>
          <input type="number" placeholder="1000" className="outline-none border-2 border-[#555] border-solid p-[10px]" onChange={(e) => setUpdatedAmount(e.target.value)} />
          <button className="bg-[#af8978] text-white p-[10px] border-none cursor-pointer my-[10px]" onClick={handleUpdateExpense}>Update Expense</button>
        </div>
      )}

      {/* Main Layout */}
      <div className="flex flex-col items-center mt-[3%] w-[80%] mr-[5%] ml-[5%]">
        <h1 className="text-2xl font-medium text-[#555]">Expense Tracker</h1>

        {/* ✅ Total Expense */}
        <div className="flex items-center justify-center mt-[10px] w-[100%]">
          <h2 className="text-[20px] font-semibold text-[#af8978]">Total Expense: Rs.{totalExpense}</h2>
        </div>

        <div className="relative flex items-center justify-between mt-5 w-[100%]">
          <div className="relative flex justify-between w-[300px]">
            <button onClick={handleAllExpense} className="bg-[#af8978] p-[10px] border-none outline-none cursor-pointer text-[#fff]">Add Expense</button>
            <button onClick={handleShowReport} className="bg-blue-300 p-[10px] border-none outline-none cursor-pointer text-[#fff]">Expense Report</button>
          </div>
          <div>
            {/* ✅ Search input with onChange */}
            <input
              type="text"
              placeholder="Search"
              className="p-[10px] w-[150px] border-2 border-[#444] border-solid"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* ✅ Expense List — uses filteredExpenses instead of expenses */}
        <div className="flex flex-col">
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((item, index) => (
              <div className="relative flex justify-between items-center w-[80vw] h-[100px] bg-[#f3edeb] my-[20px] py-[10px]" key={index}>
                <h2 className="m-[20px] text-[#555] text-[18px] font-medium">{item.label}</h2>
                <span className="m-[20px] text-[18px]">{formatDate(item.date)}</span>
                <span className="m-[20px] text-[18px] font-medium">Rs.{item.value}</span>
                <div className="m-[20px]">
                  <FaTrash className="text-red-500 mb-[10px] cursor-pointer" onClick={() => handleDelete(item._id)} />
                  <FaEdit className="text-[#555] mt-[10px] cursor-pointer" onClick={() => handleShowEdit(item._id)} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-[#555] mt-[20px] text-[18px]">No expenses found.</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;