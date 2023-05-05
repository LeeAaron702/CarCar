import React, { useEffect, useState } from "react";

function ServiceHistory(props) {
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [search, setSearch] = useState("");

  const getCompletedAppointments = async () => {
    const response = await fetch(
      "http://localhost:8080/api/service_appointments/"
    );
    const data = await response.json();
    const filteredAppointments = data.appointments.filter(
      (appointment) => appointment.completed
    );
    setCompletedAppointments(filteredAppointments);
  };
  useEffect(() => {
    getCompletedAppointments();
  }, []);

  return (
    <div>
      <h1 className="text-center">Service History</h1>
      <div className="form-group mb-3">
        <input
          type="text"
          className="form-control"
          id="search"
          placeholder="Input VIN To Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          required
        />
      </div>
      <table className="table table-striped">
        <thead className="text-center">
          <tr className="header">
            <th>Customer Name</th>
            <th>VIN</th>
            <th>Date & Time</th>
            <th>Technician</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {completedAppointments
            .filter((appointment) => {
              const searchInput = search.toUpperCase();
              const vinInput = appointment.vin.toUpperCase();
              return searchInput === ""
                ? appointment
                : vinInput.includes(searchInput);
            })
            .map((appointment) => {
              const date = new Date(appointment.date_time);
              const formattedDate = date.toLocaleString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              });
              const formattedTime = date.toLocaleString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });
              return (
                <tr key={appointment.id}>
                  <td>{appointment.customer_name}</td>
                  <td>{appointment.vin}</td>
                  <td>{`${formattedDate} ${formattedTime}`}</td>
                  <td>{appointment.technician.name}</td>
                  <td>{appointment.description}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
export default ServiceHistory;
