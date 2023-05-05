import React, { useEffect, useState } from "react";
import ManufacturerList from "./ManufacturerList";
import NewManufacturerForm from "./ManufacturerForm";

function ManufacturerParent () {
    const [manufacturers, setManufacturers] = useState([]);

    const getManufacturer = async () => {
      const response = await fetch("http://localhost:8100/api/manufacturers/");
      const data = await response.json();
      setManufacturers(data.manufacturers);
    };
    useEffect(() => {
      getManufacturer();
    }, []);

    return (  
        <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-4">
              <NewManufacturerForm getManufacturer={getManufacturer}  />
          </div>
          <div className="col-12 col-md-8">
            <div className="card-body">
              <ManufacturerList
                manufacturers={manufacturers}
              />
            </div>
          </div>
        </div>
      </div>
    );
}
 

export default ManufacturerParent;


