import React, { useState, useEffect } from "react";

function NewTechnicianForm({ getTechnicians }) {
  const [name, setName] = useState("");
  const [employee_number, setEmployee_number] = useState("");
  const [nextEmployeeNumber, setNextEmployeeNumber] = useState("");

  const getEmployeeNumber = async () => {
    const response = await fetch("http://localhost:8080/api/technicians/");
    const data = await response.json();
    const technicianList = data.technicians;
    const maxEmployeeNumber =
      technicianList.length > 0
        ? Math.max(...technicianList.map((t) => t.employee_number))
        : 0;
    setNextEmployeeNumber(maxEmployeeNumber + 1);
    setEmployee_number(maxEmployeeNumber + 1);
  };

  useEffect(() => {
    getEmployeeNumber();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.name = name;
    data.employee_number = employee_number;
    const submitUrl = "http://localhost:8080/api/technicians/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(submitUrl, fetchConfig);
    if (response.ok) {
      await response.json();
      setName("");
      setEmployee_number("");
      getEmployeeNumber();
      getTechnicians();

    } else {
      console.error(
        "Error creating Technician: Employee number previously used"
      );
    }
  };
  return (
          <div className="shadow p-4 mt-4">
            <h1>Create technician</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  placeholder="name"
                />
                <label htmlFor="Name">Full Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="employee_number"
                  placeholder="123"
                  value={employee_number}
                  onChange={(event) => setEmployee_number(event.target.value)}
                  required
                />
                <label htmlFor="employee_number">Employee Number</label>
                <small>
                  Next available employee number: {nextEmployeeNumber}
                </small>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>

  );
}
export default NewTechnicianForm;
