const API_BASE_URL = 'http://localhost:5000/api/attendance';
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        employee_id: employeeId
      })
    });

    const data = await response.json();

    alert(data.message);

    loadAttendanceRecords();

  } catch (error) {
    console.error(error);
    alert('Error during Punch Out');
  }
}

// Load Attendance Records
async function loadAttendanceRecords() {
  try {
    const response = await fetch(`${API_BASE_URL}/records`);

    const records = await response.json();

    const tableBody = document.getElementById('attendanceTableBody');

    tableBody.innerHTML = '';

    records.forEach(record => {
      const row = `
        <tr>
          <td>${record.employee_id}</td>
          <td>${record.employee_name}</td>
          <td>${formatDate(record.attendance_date)}</td>
          <td>${formatDateTime(record.punch_in)}</td>
          <td>${formatDateTime(record.punch_out)}</td>
          <td>${record.total_hours || '-'}</td>
        </tr>
      `;

      tableBody.innerHTML += row;
    });

  } catch (error) {
    console.error(error);
    alert('Error loading attendance records');
  }
}

function formatDate(dateString) {
  if (!dateString) {
    return '-';
  }

  return new Date(dateString).toLocaleDateString();
}

function formatDateTime(dateTimeString) {
  if (!dateTimeString) {
    return '-';
  }

  return new Date(dateTimeString).toLocaleString();
}
