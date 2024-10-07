import { OT } from '../../models/Employee/employeeOT.js';

// Controller for saving a new OT record
export const saveOTRecord = async (request, response) => {
    try {
        if (
            !request.body.iD ||
            !request.body.name ||
            !request.body.otDate ||
            !request.body.otHrs
        ) {
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }

        const newOT = {
            iD: request.body.iD,
            name: request.body.name,
            otDate: request.body.otDate,
            otHrs: request.body.otHrs,
        };

        const ot = await OT.create(newOT);
        return response.status(201).send(ot);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

// Controller for getting all OT records from the database
export const getAllOTRecords = async (request, response) => {
    try {
        const overtimeRecords = await OT.find({});
        return response.status(200).json({
            count: overtimeRecords.length,
            data: overtimeRecords
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

// Controller for searching OT records
export const searchOTRecords = async (req, res) => {
    const { query, isDate } = req.query;
    console.log("Received search query:", query);

    if (!query) {
        return res.status(400).json({ error: true, message: 'Search query is required' });
    }

    try {
        let searchCriteria = [];

        // Check if the query is a date
        if (isDate === 'true') {
            const parsedDate = new Date(query);
            if (!isNaN(parsedDate)) {
                searchCriteria.push({ otDate: { $eq: parsedDate } });
            }
        }

        // Check if the query is a number (for otHrs)
        const numericQuery = parseFloat(query);
        if (!isNaN(numericQuery)) {
            searchCriteria.push({ otHrs: numericQuery });
        }

        // If the query is not a number, apply regex to the name field
        if (isNaN(numericQuery)) {
            searchCriteria.push({ name: { $regex: query, $options: 'i' } });
        }

        // Combine search conditions with $or
        const matchingOT = await OT.find({ $or: searchCriteria });
        console.log("Matching OT Records:", matchingOT);

        if (matchingOT.length === 0) {
            return res.status(404).json({
                error: true,
                message: 'No matching OT records found',
            });
        }

        return res.json({
            error: false,
            ot: matchingOT,
            message: 'OT records matching the search query retrieved successfully',
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            error: true,
            message: 'Internal Server Error',
        });
    }
};
