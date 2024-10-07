// controllers/leaveController.js

import { Leave } from '../../models/Employee/employeeLeave.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'aurafitness00@gmail.com',
        pass: 'xfoitazpbtmygehq',
    },
});

// Save a new leave record
export const saveLeave = async (req, res) => {
    try {
        const { iD, name, email, dateStart, dateEnd, noDate, reason } = req.body;

        if (!iD || !name || !email || !dateStart || !dateEnd || !noDate || !reason) {
            return res.status(400).send({
                message: 'All fields are required: name, email, dateStart, dateEnd, noDate, reason',
            });
        }

        const newLeave = { iD, name, email, dateStart, dateEnd, noDate, reason, status: 'Pending' };
        const leave = await Leave.create(newLeave);
        return res.status(201).json(leave);
    } catch (error) {
        console.error('Error saving Leave record:', error.message);
        res.status(500).send({ message: 'Failed to save Leave record', error: error.message });
    }
};

// Get all pending leave records
export const getPendingLeaves = async (req, res) => {
    try {
        const leaveRecords = await Leave.find({ status: 'Pending' });
        return res.status(200).json({
            count: leaveRecords.length,
            data: leaveRecords,
        });
    } catch (error) {
        console.error('Error fetching Leave records:', error.message);
        res.status(500).send({ message: 'Failed to fetch Leave records', error: error.message });
    }
};

// Get all approved leave records
export const getApprovedLeaves = async (req, res) => {
    try {
        const approvedLeaves = await Leave.find({ status: 'Approved' });
        return res.status(200).json({
            count: approvedLeaves.length,
            data: approvedLeaves,
        });
    } catch (error) {
        console.error('Error fetching approved Leave records:', error.message);
        res.status(500).send({ message: 'Failed to fetch approved Leave records', error: error.message });
    }
};

// Get all rejected leave records
export const getRejectedLeaves = async (req, res) => {
    try {
        const rejectedLeaves = await Leave.find({ status: 'Rejected' });
        return res.status(200).json({
            count: rejectedLeaves.length,
            data: rejectedLeaves,
        });
    } catch (error) {
        console.error('Error fetching rejected Leave records:', error.message);
        res.status(500).send({ message: 'Failed to fetch rejected Leave records', error: error.message });
    }
};

// Get one leave record by ID
export const getLeaveById = async (req, res) => {
    try {
        const { id } = req.params;
        const leave = await Leave.findById(id);

        if (!leave) {
            return res.status(404).json({ message: 'Leave not found' });
        }

        return res.status(200).json(leave);
    } catch (error) {
        console.error('Error fetching leave record:', error.message);
        res.status(500).send({ message: 'Failed to fetch leave record', error: error.message });
    }
};

// Update leave details
export const updateLeave = async (req, res) => {
    try {
        const { iD, name, email, dateStart, dateEnd, noDate, reason, status } = req.body;

        if (!iD || !name || !email || !dateStart || !dateEnd || !noDate || !reason || !status) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        const { id } = req.params;
        const updatedLeave = await Leave.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedLeave) {
            return res.status(404).json({ message: 'Leave record not found' });
        }

        return res.status(200).send({ message: 'Leave details updated successfully', updatedLeave });
    } catch (error) {
        console.error('Error updating leave record:', error.message);
        res.status(500).send({ message: 'Failed to update leave record', error: error.message });
    }
};

// Approve leave request
export const approveLeave = async (req, res) => {
    try {
        const leaveId = req.params.leaveId;
        const leave = await Leave.findByIdAndUpdate(leaveId, { status: 'Approved' }, { new: true });

        if (!leave) return res.status(404).json({ message: 'Leave not found' });

        const mailOptions = {
            from: 'aurafitness00@gmail.com',
            to: leave.email,
            subject: 'Leave Approved',
            text: `Dear ${leave.name}, your leave from ${leave.dateStart} to ${leave.dateEnd} has been approved.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Leave approved', data: leave });
    } catch (error) {
        console.error('Error approving leave request:', error.message);
        res.status(500).json({ success: false, message: 'Error approving leave', error: error.message });
    }
};

// Reject leave request
export const rejectLeave = async (req, res) => {
    try {
        const leaveId = req.params.leaveId;
        const leave = await Leave.findByIdAndUpdate(leaveId, { status: 'Rejected' }, { new: true });

        if (!leave) return res.status(404).json({ message: 'Leave not found' });

        const mailOptions = {
            from: 'aurafitness00@gmail.com',
            to: leave.email,
            subject: 'Leave Rejected',
            text: `Dear ${leave.name}, your leave from ${leave.dateStart} to ${leave.dateEnd} has been rejected.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Leave rejected', data: leave });
    } catch (error) {
        console.error('Error rejecting leave request:', error.message);
        res.status(500).json({ success: false, message: 'Error rejecting leave', error: error.message });
    }
};
