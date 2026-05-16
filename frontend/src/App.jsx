import { useState } from 'react';
import { FaTrash, FaEdit, FaWindowClose } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function App() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleAllExpense = () => {
    setShowAddExpense(!showAddExpense);
  };

  const handleShowReport = () => {
    setShowReport(!showReport);
  };
  const handleShowEdit = () =>{
    setShowEdit(!showEdit);
  };

  return (
    <div>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="fixed z-[999] flex flex-col p-[10px] top-[20px] left-0 h-[500px] w-[500px] bg-white shadow-xl">
          <FaWindowClose onClick={handleAllExpense} className="self-end text-2xl text-red-500 cursor-pointer"/>
          <label className="mt-[10px] font-semibold text-[18px]">Expense Name</label>
          <input type="text" placeholder="Bill" className="outline-none border-2 border-[#555] border-solid p-[10px]" />
          <label className="mt-[10px] font-semibold text-[18px]">Expense Date</label>
          <input type="date" className="outline-none border-2 border-[#555] border-solid p-[10px]" />
          <label className="mt-[10px] font-semibold text-[18px]">Expense Amount</label>
          <input type="number" placeholder="1000" className="outline-none border-2 border-[#555] border-solid p-[10px]" />
          <button className="bg-[#af8978] text-white p-[10px] border-none cursor-pointer my-[10px]">Add Expense</button>
        </div>
      )}

      {/* Expense Report Modal */}
      {showReport && (
  <div className="fixed z-[999] flex flex-col p-[10px] top-[20px] left-[100px] h-[500px] w-[500px] bg-white shadow-xl">
    <FaWindowClose onClick={handleShowReport} className="self-end text-2xl text-red-500 cursor-pointer"/>
    <h2 className="text-[18px] font-semibold text-[#555] mt-[10px] mb-[10px]">Expense Report</h2>
    <PieChart width={400} height={350}>
      <Pie
        data={[
          { name: 'Snacks', value: 20 },
          { name: 'Electricity', value: 200 },
          { name: 'Rent', value: 500 },
          { name: 'Wi-fi', value: 100 },
        ]}
        cx={200}
        cy={150}
        outerRadius={100}
        dataKey="value"
        label
      >
        <Cell fill="#af8978" />
        <Cell fill="#60a5fa" />
        <Cell fill="#4ade80" />
        <Cell fill="#f87171" />
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </div>
)}

      {/* Main Layout */}
      <div className="flex flex-col items-center mt-[3%] w-[80%] mr-[5%] ml-[5%]">
        <h1 className="text-2xl font-medium text-[#555]">Expense Tracker</h1>

        <div className="relative flex items-center justify-between mt-5 w-[100%]">
          <div className="relative flex justify-between w-[300px]">
            <button onClick={handleAllExpense} className="bg-[#af8978] p-[10px] border-none outline-none cursor-pointer text-[#fff]">Add Expense</button>
            <button onClick={handleShowReport} className="bg-blue-300 p-[10px] border-none outline-none cursor-pointer text-[#fff]">Expense Report</button>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search"
              className="p-[10px] w-[150px] border-2 border-[#444] border-solid"
            />
          </div>
        </div>

        {/* Expense List */}
        <div className="flex flex-col">
          <div className="relative flex justify-between items-center w-[80vw] h-[100px] bg-[#f3edeb] my-[20px] py-[10px]">
            <h2 className="m-[20px] text-[#555] text-[18px] font-medium">Snacks</h2>
            <span className="m-[20px] text-[18px]">16/05/2026</span>
            <span className="m-[20px] text-[18px] font-medium">$ 20</span>
            <div className="m-[20px]">
              <FaTrash className="text-red-500 mb-[10px] cursor-pointer"/>
              <FaEdit className="text-[#555] mt-[10px] cursor-pointer" onClick={handleShowEdit}/>
            </div>
          </div>
          <div className="relative flex justify-between items-center w-[80vw] h-[100px] bg-[#f3edeb] my-[20px] py-[10px]">
            <h2 className="m-[20px] text-[#555] text-[18px] font-medium">Electricity</h2>
            <span className="m-[20px] text-[18px]">05/05/2026</span>
            <span className="m-[20px] text-[18px] font-medium">$ 200</span>
            <div className="m-[20px]">
              <FaTrash className="text-red-500 mb-[10px] cursor-pointer"/>
              <FaEdit className="text-[#555] mt-[10px] cursor-pointer" onClick={handleShowEdit}/>
            </div>
          </div>
          <div className="relative flex justify-between items-center w-[80vw] h-[100px] bg-[#f3edeb] my-[20px] py-[10px]">
            <h2 className="m-[20px] text-[#555] text-[18px] font-medium">Rent</h2>
            <span className="m-[20px] text-[18px]">01/05/2026</span>
            <span className="m-[20px] text-[18px] font-medium">$ 500</span>
            <div className="m-[20px]">
              <FaTrash className="text-red-500 mb-[10px] cursor-pointer"/>
              <FaEdit className="text-[#555] mt-[10px] cursor-pointer" onClick={handleShowEdit}/>
            </div>
          </div>
          <div className="relative flex justify-between items-center w-[80vw] h-[100px] bg-[#f3edeb] my-[20px] py-[10px]">
            <h2 className="m-[20px] text-[#555] text-[18px] font-medium">Wi-fi</h2>
            <span className="m-[20px] text-[18px]">10/05/2026</span>
            <span className="m-[20px] text-[18px] font-medium">$ 100</span>
            <div className="m-[20px]">
              <FaTrash className="text-red-500 mb-[10px] cursor-pointer"/>
              <FaEdit className="text-[#555] mt-[10px] cursor-pointer" onClick={handleShowEdit}/>
            </div>
          </div>
        </div>
        { showEdit && (
          <div className="fixed z-[999] flex flex-col p-[10px] top-[25%] right-0 h-[500px] w-[500px] bg-white shadow-xl">
          <FaWindowClose onClick={handleShowEdit} className="self-end text-2xl text-red-500 cursor-pointer"/>
          <label className="mt-[10px] font-semibold text-[18px]">Expense Name</label>
          <input type="text" placeholder="Bill" className="outline-none border-2 border-[#555] border-solid p-[10px]" />
          <label className="mt-[10px] font-semibold text-[18px]">Expense Date</label>
          <input type="date" className="outline-none border-2 border-[#555] border-solid p-[10px]" />
          <label className="mt-[10px] font-semibold text-[18px]">Expense Amount</label>
          <input type="number" placeholder="1000" className="outline-none border-2 border-[#555] border-solid p-[10px]" />
          <button className="bg-[#af8978] text-white p-[10px] border-none cursor-pointer my-[10px]">Update Expense</button>
        </div>
        )}
      </div>
    </div>
  );
}

export default App;