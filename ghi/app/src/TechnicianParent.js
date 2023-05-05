import React, { useEffect, useState } from "react";
import TechnicianList from "./TechnicianList";
import NewTechnicianForm from "./TechnicianForm";
import EditTechnicianForm from "./TechnicianEditForm";

function TechnicianParent() {
  const [technicians, setTechnicians] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTechnician, setEditingTechnician] = useState(null);

  const toggleEditMode = (technician) => {
    setIsEditing(!isEditing);
    setEditingTechnician(technician);
  };

  const getTechnicians = async () => {
    const response = await fetch("http://localhost:8080/api/technicians/");
    const data = await response.json();
    setTechnicians(data.technicians);
  };

  
  useEffect(() => {
    getTechnicians();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-4">
          {isEditing ? (
            <EditTechnicianForm
              technician={editingTechnician}
              toggleEditMode={toggleEditMode}
              getTechnicians={getTechnicians}
            />
          ) : (
            <NewTechnicianForm
              getTechnicians={getTechnicians}
            />
          )}
        </div>
        <div className="col-12 col-md-8">
          <div className="card-body">
            <TechnicianList
              technicians={technicians}
              toggleEditMode={toggleEditMode}
              getTechnicians={getTechnicians}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnicianParent;
