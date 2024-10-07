import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AddEmployee = () => {
    const [formData, setFormData] = useState({
        iD: '',
        fname: '',
        lname: '',
        nic: '',
        role: '',
        gender: '',
        dob: '',
        conNo: '',
        email: '',
        address: '',
        bsalary: '',
        dateJoin: '',
        dateTer: ''
    });

    const [minDateTer, setMinDateTer] = useState(''); // State to hold the minimum date for termination
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Update minDateTer when dateJoin changes
        if (name === 'dateJoin') {
            setMinDateTer(value); // Set the minimum date for date of termination
        }
    };

    const checkIfEmployeeExists = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5555/informations/${id}`);
            return response.data.exists; // Assuming the backend returns { exists: true/false }
        } catch (error) {
            console.error('Error checking employee existence:', error);
            return false; // If there's an error, consider the employee as not existing
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if the employee already exists
        const employeeExists = await checkIfEmployeeExists(formData.iD);
        if (employeeExists) {
            enqueueSnackbar('Already added this employee!', { variant: 'error' });
            return; // Stop the submission process
        }

        try {
            await axios.post('http://localhost:5555/informations', formData);
            enqueueSnackbar('Employee added successfully!', { variant: 'success' });
            navigate('/informations');
        } catch (error) {
            enqueueSnackbar('Error adding employee. Please try again.', { variant: 'error' });
            console.error('Error adding employee:', error);
        }
    };

    const handleBack = () => {
        navigate('/informations'); // Navigate back to the employee information page
    };

    return (
        <div className="p-8 bg-gradient-to-r from-white to-yellow-500 min-h-screen">
              <div className="mt-8"> {/* Adjust the margin here */}
                <button
                    type="button"
                    onClick={handleBack}
                    className="bg-gray-500 text-white font-bold px-6 py-3 rounded-lg ml-4 hover:bg-gray-700 transition-colors duration-500 transform hover:scale-105"
                >
                    Back
                </button>
            </div>


             
            <form 
                onSubmit={handleSubmit} 
                className="bg-white bg-opacity-50 border border-black rounded-lg p-8 shadow-lg"
            >
                <h1 className="text-3xl my-4 text-center font-bold"> Employee Details</h1>
                <div className="grid grid-cols-2 gap-2">

                    <div className="flex items-center space-x-2">
                        <label className="text-xl text-black w-32">Employee ID</label>
                        <input
                            type="text"
                            name="iD"
                            value={formData.iD}
                            onChange={handleChange}
                            placeholder="Employee ID"
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <label className="text-xl text-black w-32">First Name</label>
                        <input
                            type="text"
                            name="fname"
                            value={formData.fname}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <label className="text-xl text-black w-32">Last Name</label>
                        <input
                            type="text"
                            name="lname"
                            value={formData.lname}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <label className="text-xl text-black w-32">NIC</label>
                        <input
                            type="text"
                            name="nic"
                            value={formData.nic}
                            onChange={handleChange}
                            placeholder="NIC"
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <label className="text-xl text-black w-32">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value='' disabled>Select Role</option>
                            <option value='Coach'>Coach</option>
                            <option value='Cleaner'>Cleaner</option>
                            <option value='Dietitian'>Dietitian</option>
                            <option value='Receptionist'>Receptionist</option>
                            <option value='Manager'>Manager</option>
                            <option value='General Manager'>General Manager</option>
                            <option value='Fitness Instructor'>Fitness Instructor</option>
                            <option value='Personal Trainer'>Personal Trainer</option>
                            <option value='Physical Therapist'>Physical Therapist</option>
                        </select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <label className="text-xl text-black w-32">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <label className="text-xl text-black w-32">DOB</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <label className="text-xl text-black w-32">Contact No</label>
                        <input
                            type="text"
                            name="conNo"
                            value={formData.conNo}
                            onChange={handleChange}
                            placeholder="Contact Number"
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <label className="text-xl text-black w-32">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <label className="text-xl text-black w-32">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <label className="text-xl text-black w-32">Basic Salary</label>
                        <input
                            type="number"
                            name="bsalary"
                            value={formData.bsalary}
                            onChange={handleChange}
                            placeholder="Basic Salary"
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <label className="text-xl text-black w-32">Date of Join</label>
                        <input
                            type="date"
                            name="dateJoin"
                            value={formData.dateJoin}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <label className="text-xl text-black w-32">Date of Termination</label>
                        <input
                            type="date"
                            name="dateTer"
                            value={formData.dateTer}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded"
                            min={minDateTer} // Set the minimum date for termination
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-6">
    <button
        type="submit"
        className="bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors duration-500 transform hover:scale-105"
    >
        Save
    </button>
</div>

                
            </form>
        </div>
    );
};

export default AddEmployee;
