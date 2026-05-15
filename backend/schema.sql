CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL,
    employee_name VARCHAR(100) NOT NULL,
    attendance_date DATE NOT NULL,
    punch_in TIMESTAMP,
    punch_out TIMESTAMP,
    total_hours NUMERIC(5,2)
);
