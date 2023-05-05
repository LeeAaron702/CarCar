import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditTechnicianForm(props) {
  const [name, setName] = useState(props.technician.name);
  const [employee_number, setEmployee_number] = useState(props.technician.employee_number)
  const navigate = useNavigate();


  // const getTechnician = async () => {
  //   const response = await fetch(`http://localhost:8080/api/technicians/${employee_number}`);
  //   console.log(employee_number);
  //   const data = await response.json();
  //   const name = data.name;
  //   setName(data.name)

  // // };

  // useEffect(() => {
  //   getTechnician();
  // }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.name = name;
    data.employee_number = employee_number;
    const submitUrl = `http://localhost:8080/api/technicians/${employee_number}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(submitUrl, fetchConfig);
    if (response.ok) {
      await response.json();
      props.getTechnicians();
      props.toggleEditMode();
    } else {
      console.error(
        "Error creating Technician: Employee number previously used"
      );
    }
  };
  return (

          <div className="shadow p-4 mt-4">
            <h1>Edit technician</h1>
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
                  readOnly
                  required
                />
                <label htmlFor="employee_number">Employee Number</label>
              </div>
              <button className="btn btn-primary">Edit</button>
            </form>
          </div>

  );
}
export default EditTechnicianForm;
