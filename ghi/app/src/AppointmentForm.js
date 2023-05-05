import React, { useState, useEffect } from "react";

// enter VIN
// name of owner
// datetime of appt
// drop down for techs
// description of visit

function NewAppointmentForm({getAppointments}) {
  const [vin, setVin] = useState("");
  const [customer_name, setCustomerName] = useState("");
  const [date_time, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const [technician, setTechnician] = useState("");
  const [technicians, setTechnicians] = useState([]);

  const fetchTech = async () => {
    const url = "http://localhost:8080/api/technicians/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    } else {
      console.error("No Models available");
    }
  };
  useEffect(() => {
    fetchTech();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.vin = vin;
    data.customer_name = customer_name;
    data.date_time = date_time;
    data.description = description;
    data.technician = technician;

    const submitUrl = "http://localhost:8080/api/service_appointments/";
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

      setCustomerName("");
      setDateTime("");
      setDescription("");
      setTechnician("");
      setVin("");
      getAppointments();
    } else {
      console.error("Error creating Automobile");
    }
  };

  return (
    <div className="shadow p-4 mt-4">
      <h1>Create a new Service Appointment</h1>
      <form onSubmit={handleSubmit} id="automobile-form">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="vin"
            value={vin}
            onChange={(event) => setVin(event.target.value)}
            required
            placeholder="vin"
          />
          <label htmlFor="vin">VIN</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="customer_name"
            value={customer_name}
            onChange={(event) => setCustomerName(event.target.value)}
            required
            placeholder="customer_name"
          />
          <label htmlFor="customer_name">Customer Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="datetime-local"
            className="form-control"
            placeholder="20XX-0X-0DT23:50:02+00:00"
            id="date_time"
            value={date_time}
            onChange={(event) => setDateTime(event.target.value)}
            required
          />
          <label htmlFor="date_time">Date & Time</label>
        </div>
        <div className="mb-3">
          <label htmlFor="date_time">Choose a Technician</label>

          <select
            onChange={(event) => setTechnician(event.target.value)}
            required
            name="technician"
            id="technician"
            value={technician}
            className="form-select"
          >
            <option value="technician">Technicians</option>
            {technicians.map((technician) => {
              return (
                <option
                  value={technician.employee_number}
                  key={technician.employee_number}
                >
                  {technician.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-floating mb-3">
          <textarea
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            placeholder="description"
          />
          <label htmlFor="description">Description</label>
        </div>
        <button className="btn btn-primary">Create</button>
      </form>
    </div>
  );
}
export default NewAppointmentForm;
