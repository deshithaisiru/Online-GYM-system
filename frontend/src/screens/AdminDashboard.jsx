import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  MdOutlineAddBox,
  MdEdit,
  MdDelete,
  MdVisibility,
} from "react-icons/md";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("name");
  const [filterTab, setFilterTab] = useState("all");
  const [bmiData, setBmiData] = useState([]);
  const [showChart, setShowChart] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/users/all")
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
        calculateBMI(response.data); // Calculate BMI distribution
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const calculateBMI = (users) => {
    let underweight = 0;
    let normal = 0;
    let overweight = 0;
    let obesity = 0;

    users.forEach((user) => {
      const heightInMeters = user.height / 100;
      const bmi = user.weight / (heightInMeters * heightInMeters);

      if (bmi < 18.5) {
        underweight++;
      } else if (bmi >= 18.5 && bmi < 24.9) {
        normal++;
      } else if (bmi >= 25 && bmi < 29.9) {
        overweight++;
      } else {
        obesity++;
      }
    });

    setBmiData([
      { name: "Underweight", value: underweight },
      { name: "Normal", value: normal },
      { name: "Overweight", value: overweight },
      { name: "Obesity", value: obesity },
    ]);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterUsers(term, filterTab);
  };

  const handleUpdate = (userId) => {
    navigate(`/users/edit/${userId}`);
  };

  const handleDelete = (userId) => {
    console.log("Delete user with ID:", userId);
    navigate(`/users/delete/${userId}`);
  };

  const handleView = (userId) => {
    navigate(`/users/view/${userId}`);
  };

  const filterUsers = (term, tab) => {
    let filtered = users.filter((user) => {
      if (filterBy === "name") {
        return user.name.toLowerCase().includes(term);
      } else if (filterBy === "email") {
        return user.email.toLowerCase().includes(term);
      } else if (filterBy === "userType") {
        return user.userType.toLowerCase().includes(term);
      }
      return false;
    });

    if (tab === "members") {
      filtered = filtered.filter((user) => user.userType === "Member");
    } else if (tab === "trainers") {
      filtered = filtered.filter((user) => user.userType === "Trainer");
    } else if (tab === "admins") {
      filtered = filtered.filter((user) => user.isAdmin === true);
    }

    setFilteredUsers(filtered);
  };

  const handleFilterTabChange = (tab) => {
    setFilterTab(tab);
    filterUsers(searchTerm, tab);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("User List", 14, 15);

    // Add a new column for BMI
    const tableColumn = [
      "Name",
      "Email",
      "Address",
      "User Type",
      "Mobile",
      "BMI",
      "Is Admin",
    ];

    // Assuming users have height and weight properties
    const tableRows = filteredUsers.map((user) => {
      // Calculate BMI if height and weight are available
      const bmi =
        user.height && user.weight
          ? (user.weight / (user.height / 100) ** 2).toFixed(2)
          : "N/A";

      return [
        user.name,
        user.email,
        user.address,
        user.userType,
        user.mobile,
        bmi,
        user.isAdmin ? "Yes" : "No",
      ];
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("user-list.pdf");
  };

  const UserTable = ({ users }) => (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Email</th>
          <th className="py-2 px-4 border-b">User Type</th>
          <th className="py-2 px-4 border-b">Mobile</th>
          <th className="py-2 px-4 border-b">Address</th>
          <th className="py-2 px-4 border-b">Is Admin</th>
          <th className="py-2 px-4 border-b">Operations</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id} className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">{user.name}</td>
            <td className="py-2 px-4 border-b">{user.email}</td>
            <td className="py-2 px-4 border-b">{user.userType}</td>
            <td className="py-2 px-4 border-b">{user.mobile}</td>
            <td className="py-2 px-4 border-b">{user.address}</td>
            <td className="py-2 px-4 border-b">
              {user.isAdmin ? "Yes" : "No"}
            </td>
            <td className="py-2 px-4 border-b flex gap-4">
              <button
                onClick={() => handleView(user._id)}
                className="text-green-600 hover:text-green-800 transition"
              >
                <MdVisibility className="text-2xl" />
              </button>
              <button
                onClick={() => handleUpdate(user._id)}
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <MdEdit className="text-2xl" />
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="text-red-600 hover:text-red-800 transition"
              >
                <MdDelete className="text-2xl" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const UserCard = ({ user }) => (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-gray-600">Type: {user.userType}</p>
      <p className="text-gray-600">Mobile: {user.mobile}</p>
      <p className="text-gray-600">Address: {user.address}</p>
      <p className="text-gray-600">Admin: {user.isAdmin ? "Yes" : "No"}</p>
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => handleView(user._id)}
          className="text-green-600 hover:text-green-800 transition"
        >
          <MdVisibility className="text-2xl" />
        </button>
        <button
          onClick={() => handleUpdate(user._id)}
          className="text-blue-600 hover:text-blue-800 transition"
        >
          <MdEdit className="text-2xl" />
        </button>
        <button
          onClick={() => handleDelete(user._id)}
          className="text-red-600 hover:text-red-800 transition"
        >
          <MdDelete className="text-2xl" />
        </button>
      </div>
    </div>
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col text-gray-700 bg-black bg-opacity-70 shadow-none rounded-xl bg-clip-border p-8 w-full max-w-6xl">
        <h1 className="block font-sans text-5xl antialiased font-semibold leading-snug tracking-normal text-center text-white mb-8">
          Aura Fitness Client's List
        </h1>

        <div className="flex justify-center items-center gap-x-4 mb-6">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              showType === "table"
                ? "bg-yellow-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setShowType("table")}
          >
            Table View
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              showType === "card"
                ? "bg-yellow-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setShowType("card")}
          >
            Card View
          </button>
        </div>

        <div className="flex gap-4 mb-6 items-center">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="p-2 border border-blue-gray-200 rounded-md focus:border-2 focus:border-gray-900"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="userType">User Type</option>
          </select>
          <input
            type="text"
            placeholder={`Search users by ${filterBy}...`}
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border border-blue-gray-200 rounded-md w-full focus:border-2 focus:border-gray-900"
          />
        </div>

        <div className="flex justify-between items-center mb-8">
          <Link to="/users/create" className="mr-4">
            <MdOutlineAddBox className="text-yellow-500 text-3xl hover:text-yellow-600" />
          </Link>
          <button
            onClick={downloadPDF}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded-md transition duration-300"
          >
            Download PDF
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-6">
          {["all", "members", "trainers", "admins"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 mx-1 text-sm font-medium rounded-md ${
                filterTab === tab
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handleFilterTabChange(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {showType === "table" ? (
              <UserTable users={filteredUsers} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {filteredUsers.map((user) => (
                  <UserCard key={user._id} user={user} />
                ))}
              </div>
            )}
          </div>
        )}
        
        <div>
      <button
        onClick={() => setShowChart(true)}
        className="bg-yellow-500 hover:bg-black text-white font-bold py-2 px-4 rounded mt-7"
      >
        Show BMI Distribution Chart
      </button>

      {showChart && (
        <>
          <h2 className="text-center text-white text-4xl font-extrabold mt-12 mb-6">
            BMI Distribution Chart
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={bmiData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60} // Added inner radius for a donut style
                label
                labelStyle={{ fontSize: "14px", fontWeight: "bold" }} // Style the labels
              >
                {bmiData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#fff" // Adding a stroke for clearer distinction between slices
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  padding: "10px",
                }} // Custom tooltip style
                itemStyle={{ color: "#333" }}
              />
              <Legend
                iconSize={10}
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: "20px" }} // Add padding to separate legend
              />
            </PieChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
        
      </div>
    </div>
  );
};

export default UserList;
