// controllers/employeeController.js
import { Information } from '../../models/Employee/employeeInfo.js';

// Search employees
export const searchEmployees = async (req, res) => {
    const { query } = req.query;
    console.log("Received search query:", query);

    if (!query) {
        return res.status(400).json({ error: true, message: 'Search query is required' });
    }

    try {
        const searchCriteria = {
            $or: [
                { iD: { $regex: query, $options: 'i' } },
                { fname: { $regex: query, $options: 'i' } },
                { lname: { $regex: query, $options: 'i' } },
                { nic: { $regex: query, $options: 'i' } },
                { role: { $regex: query, $options: 'i' } }
            ]
        };

        const matchingInformations = await Information.find(searchCriteria);

        if (matchingInformations.length === 0) {
            return res.status(404).json({ error: true, message: 'No matching informations found' });
        }

        return res.json({
            error: false,
            informations: matchingInformations,
            message: 'Employee matching the search query retrieved successfully',
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: 'Internal Server Error',
        });
    }
};

// Get all employee information
export const getAllEmployees = async (req, res) => {
    try {
        const informations = await Information.find({});
        return res.status(200).json({ count: informations.length, data: informations });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Get one employee by ID
export const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const information = await Information.findById(id);
        if (!information) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        return res.status(200).json(information);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Save a new employee
export const createEmployee = async (req, res) => {
    const { iD, nic, email } = req.body;

    try {
        const existingEmployee = await Information.findOne({
            $or: [{ iD }, { nic }, { email }]
        });

        if (existingEmployee) {
            return res.status(400).json({
                error: true,
                message: 'Employee with the same NIC or Email already exists',
            });
        }

        const newInformation = { ...req.body };
        const info = await Information.create(newInformation);
        return res.status(201).json({
            error: false,
            message: 'Employee created successfully',
            data: info
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Update employee details
export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Information.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        return res.status(200).send({ message: 'Employee details updated successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Delete an employee
export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Information.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        return res.status(200).send({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};
