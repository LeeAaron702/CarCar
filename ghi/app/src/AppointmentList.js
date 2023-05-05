import React, { useEffect, useState } from "react";

function AppointmentList({ appointments, getAppointments }) {
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);



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
    if (search.trim() !== "") {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
    getCompletedAppointments();
  }, [search]);

  const handleCancelAppointment = async (appointmentId) => {
    await fetch(
      `http://localhost:8080/api/service_appointments/${appointmentId}`,
      {
        method: "DELETE",
      }
    );
    await getAppointments();
  };

  const handleFinishedAppointment = async (appointmentId) => {
    const data = {};
    data["completed"] = true;
    const finishedUrl = `http://localhost:8080/api/service_appointments/${appointmentId}/`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(finishedUrl, fetchConfig);
    await getAppointments();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return `${formattedDate}  ${formattedTime}`;
  };



  return (
    <div>
      <h1 className="text-center">Appointments</h1>
      <div className="form-group mb-3">
        <input
          type="text"
          className="form-control"
          id="search"
          placeholder="Input VIN To Search for Service History"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          required
        />
      </div>
      {isSearching ? ( <table className="table table-striped">
        <thead className="text-center">
          <tr className="header">
            <th>VIN</th>
            <th>Customer Name</th>
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
                  <td>{appointment.vin}</td>
                  <td>{appointment.customer_name}</td>
                  <td>{`${formattedDate} ${formattedTime}`}</td>
                  <td>{appointment.technician.name}</td>
                  <td>{appointment.description}</td>
                </tr>
              );
            })}
        </tbody>
      </table>) : (<table className="table table-striped">
        <thead className="text-center">
          <tr className="header">
            <th>VIN</th>
            <th>Customer Name</th>
            <th>VIP Status</th>
            <th>Date & Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {appointments.map((appointment) => {
            return (
              <tr key={appointment.id}>
                <td>{appointment.vin}</td>
                <td>{appointment.customer_name}</td>
                <td>{appointment.VIP ? "Homies from day 1" : "Outsiders"}</td>
                <td>{formatDate(appointment.date_time)}</td>
                <td>{appointment.technician.name}</td>
                <td>{appointment.description}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleCancelAppointment(appointment.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFinishedAppointment(appointment.id)}
                    className="btn btn-success btn-sm"
                  >
                    Finished
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>) }
      
    </div>
  );
}

export default AppointmentList;
