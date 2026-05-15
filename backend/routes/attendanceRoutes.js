const express = require('express');
const router = express.Router();
const pool = require('../db');

// Punch In
router.post('/punch-in', async (req, res) => {
  try {
    const { employee_id, employee_name } = req.body;

    if (!employee_id || !employee_name) {
      return res.status(400).json({
        message: 'Employee ID and Name are required'
      });
    }

    const today = new Date().toISOString().split('T')[0];

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

// Punch Out
router.post('/punch-out', async (req, res) => {
  try {
    const { employee_id } = req.body;

    if (!employee_id) {
      return res.status(400).json({
        message: 'Employee ID is required'
      });
    }

    const today = new Date().toISOString().split('T')[0];

    const attendanceResult = await pool.query(
      `SELECT * FROM attendance
       WHERE employee_id = $1
       AND attendance_date = $2`,
      [employee_id, today]
    );

    if (attendanceResult.rows.length === 0) {
      return res.status(404).json({
        message: 'Punch In record not found'
      });
    }

    const attendance = attendanceResult.rows[0];

    if (attendance.punch_out) {
      return res.status(400).json({
        message: 'Employee already punched out'
      });
    }

    const punchInTime = new Date(attendance.punch_in);

    const punchOutTime = new Date();

    const totalMilliseconds = punchOutTime - punchInTime;

    const totalHours = (
      totalMilliseconds / (1000 * 60 * 60)
    ).toFixed(2);

    const updatedResult = await pool.query(
      `UPDATE attendance
       SET punch_out = NOW(),
       total_hours = $1
       WHERE id = $2
       RETURNING *`,
      [totalHours, attendance.id]
    );

    res.json({
      message: 'Punch Out successful',
      data: updatedResult.rows[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});

// Get Records
router.get('/records', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM attendance
       ORDER BY id DESC`
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});

module.exports = router;
