import express from 'express';
import {
    createSalary,
    getAllSalaries,
    searchSalaries,
    getSalaryById,
    updateSalary,
    deleteSalary
} from '../../controllers/Employee/salaryController.js';

const router = express.Router();

// Route for saving a new salary record
router.post('/', createSalary);

// Route for getting all salary records from the database
router.get('/', getAllSalaries);

// Route for searching salary records
router.get('/search-salaries', searchSalaries);

// Route for getting one salary record by id
router.get('/:id', getSalaryById);

// Route for updating a salary record
router.put('/:id', updateSalary);

// Route for deleting a salary record
router.delete('/:id', deleteSalary);

export default router;
