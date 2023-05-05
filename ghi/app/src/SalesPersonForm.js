import React, { useState, useEffect } from "react";

function SalesPersonCreateForm({getSalesPeople}) {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [name, setName] = useState("");
  const [nextEmployeeNumber, setNextEmployeeNumber] = useState("");

  const getEmployeeNumber = async () => {
    const SalesPersonUrl = "http://localhost:8090/api/salespersons/";
    const response = await fetch(SalesPersonUrl);
    if (response.ok) {
      const data = await response.json();
      const salespersonList = data.sales_persons;
      const maxEmployeeNumber =
        salespersonList.length > 0
          ? Math.max(...salespersonList.map((s) => s.employee_number))
          : 0;
      setNextEmployeeNumber(maxEmployeeNumber + 1);
      setEmployeeNumber(maxEmployeeNumber + 1);
    }
  };

  useEffect(() => {
    getEmployeeNumber();
  }, []);

  const handlEmployeeNumberChange = (event) => {
    const value = Number(event.target.value);
    setEmployeeNumber(value);
  };
  const handleNameChange = (event) => {
    const value = event.target.value.trim();
    setName(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = name;
    data.employee_number = employeeNumber;

    const SalesPersonUrl = "http://localhost:8090/api/salespersons/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(SalesPersonUrl, fetchConfig);
    if (response.ok) {
      await response.json();
      setName("");
      setEmployeeNumber("");
      getEmployeeNumber();
      getSalesPeople();
    }
  };

  return (

          <div className="shadow p-4 mt-4">
            <h1>Add New Sales Person</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  onChange={handleNameChange}
                  value={name}
                  placeholder="name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handlEmployeeNumberChange}
                  value={employeeNumber}
                  placeholder="employeeNumber"
                  required
                  type="text"
                  name="employeeNumber"
                  id="employeeNumber"
                  className="form-control"
                />
                <label htmlFor="employeeNumber">Employee Number</label>
                <small>
                  Next available employee number: {nextEmployeeNumber}
                </small>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
  );
}

export default SalesPersonCreateForm;
