import React, { useEffect, useState } from "react";
import NewAppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList"

function AppointmentParent () {
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
      const response = await fetch(
        "http://localhost:8080/api/service_appointments/"
      );
      const data = await response.json();
      const filteredAppointments = data.appointments.filter(
        (appointment) => !appointment.completed
      );
      setAppointments(filteredAppointments);
    };
    useEffect(() => {
        getAppointments();
      }, []);

      return (  
        <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-4">
              <NewAppointmentForm getAppointments={getAppointments}  />
          </div>
          <div className="col-12 col-md-8">
            <div className="card-body">
              <AppointmentList
                appointments={appointments} getAppointments={getAppointments}
              />
            </div>
          </div>
        </div>
      </div>
    );
}
export default AppointmentParent