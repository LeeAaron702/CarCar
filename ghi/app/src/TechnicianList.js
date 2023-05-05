import React from "react";

function TechnicianList({ technicians, getTechnicians, toggleEditMode }) {

  const handleFireTechnician = async (employee_number) => {
    await fetch(`http://localhost:8080/api/technicians/${employee_number}`, {
      method: "DELETE",
    });
    await getTechnicians();
  };

  return (
    <div>
      <h1 className="text-center">List of Technicians</h1>
      <table className="table table-striped">
        <thead className="text-center">
          <tr className="header">
            <th>Name</th>
            <th>Employee Number</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {technicians.sort((a, b) => a.employee_number - b.employee_number)
          .map((technician) => {
            return (
              <tr key={technician.employee_number}>
                <td>{technician.name}</td>
                <td>{technician.employee_number}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => toggleEditMode(technician)}
                    className="btn btn-warning"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleFireTechnician(technician.employee_number)
                    }
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TechnicianList;


