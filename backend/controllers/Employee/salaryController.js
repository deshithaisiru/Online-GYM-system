import { Salary } from '../../models/Employee/employeeSalary.js';

// Controller for saving a new salary record
export const createSalary = async (req, res) => {
    try {
        const {
            iD, month, name, role, email,
            bsalary, tsalary, payst, otHour,
            otRate, otTotal, bonus
        } = req.body;

        if (!iD || !month || !name || !role || !email ||
            !bsalary || !tsalary || !payst || !otHour ||
            !otRate || !otTotal || !bonus) {
            return res.status(400).send({ message: 'Send all required fields' });
        }

        const newSalary = {
            iD, month, name, role, email,
            bsalary, tsalary, payst, otHour,
            otRate, otTotal, bonus
        };

        const salary = await Salary.create(newSalary);
        return res.status(201).send(salary);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for getting all salary records
export const getAllSalaries = async (req, res) => {
    try {
        const salaries = await Salary.find({});
        return res.status(200).json({ count: salaries.length, data: salaries });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for searching salary records
export const searchSalaries = async (req, res) => {
    const { query } = req.query;
    console.log("Received search query:", query);

    if (!query) {
        return res.status(400).json({ error: true, message: 'Search query is required' });
    }

    try {
        const searchCriteria = {
            $or: [
                { iD: { $regex: query, $options: 'i' } },
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { role: { $regex: query, $options: 'i' } },
            ]
        };

        const matchingSalaries = await Salary.find(searchCriteria);

        if (matchingSalaries.length === 0) {
            return res.status(404).json({ error: true, message: 'No matching salary records found' });
        }

        return res.json({
            error: false,
            salaries: matchingSalaries,
            message: 'Salary records matching the search query retrieved successfully',
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
};

// Controller for getting one salary record by id
export const getSalaryById = async (req, res) => {
    try {
        const { id } = req.params;
        const salary = await Salary.findById(id);

        if (!salary) {
            return res.status(404).json({ message: 'Salary record not found' });
        }

        return res.status(200).json(salary);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for updating a salary record
export const updateSalary = async (req, res) => {
    try {
        const {
            iD, month, name, role, email,
            bsalary, tsalary, payst, otHour,
            otRate, otTotal, bonus
        } = req.body;

        if (!iD || !month || !name || !role || !email ||
            !bsalary || !tsalary || !payst || !otHour ||
            !otRate || !otTotal || !bonus) {
            return res.status(400).send({ message: 'Send all required fields' });
        }

        const { id } = req.params;
        const result = await Salary.findByIdAndUpdate(id, req.body, { new: true });

        if (!result) {
            return res.status(404).json({ message: 'Salary record not found' });
        }

        return res.status(200).send({ message: 'Salary record updated successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for deleting a salary record
export const deleteSalary = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Salary.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Salary record not found' });
        }

        return res.status(200).send({ message: 'Salary record deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};
