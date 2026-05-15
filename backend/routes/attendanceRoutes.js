const express = require('express');
const router = express.Router();
const pool = require('../db');

// Employee Punch In
router.post('/punch-in', async (req, res) => {
  try {
    const { employee_id, employee_name } = req.body;

    if (!employee_id || !employee_name) {
      return res.status(400).json({
        message: 'Employee ID and Employee Name are required'
      });
    }

    const today = new Date().toISOString().split('T')[0];

    // Check if already punched in today
    const existingRecord = await pool.query(
      `SELECT * FROM attendance
       WHERE employee_id = $1
       AND attendance_date = $2`,
      [employee_id, today]
    );

    if (existingRecord.rows.length > 0) {
      return res.status(400).json({
        message: 'Employee already punched in today'
      });
    }

    const result = await pool.query(
      `INSERT INTO attendance
      (employee_id, employee_name, attendance_date, punch_in)
      VALUES ($1, $2, $3, NOW())
      RETURNING *`,
      [employee_id, employee_name, today]
    );

    res.status(201).json({
      message: 'Punch In successful',
      data: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});

// Employee Punch Out
router.post('/punch-out', async (req, res) => {
  try {
    const { employee_id } = req.body;

    if (!employee_id) {
module.exports = router;
