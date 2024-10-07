// routes/employeeRoutes.js
import express from 'express';
import {
    searchEmployees,
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from '../../controllers/Employee/employeeInfoController.js';

const router = express.Router();

// Route for searching employees
router.get('/search-informations', searchEmployees);

// Route for getting all employee information from the database
router.get('/', getAllEmployees);

// Route for getting one employee information from the database by id
router.get('/:id', getEmployeeById);

// Route for saving a new employee
router.post('/', createEmployee);

// Route for updating employee details
router.put('/:id', updateEmployee);

// Route for deleting an employee
router.delete('/:id', deleteEmployee);

export default router;
