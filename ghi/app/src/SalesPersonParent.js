import React, { useEffect, useState } from "react";
import SalesPersonCreateForm from "./SalesPersonForm";
import SalesPersonList from "./SalesPersonList";

function SalesPersonParent () {
    const [salesPersons, setSalesPeople] = useState([]);

    const getSalesPeople = async () => {
        const response = await fetch("http://localhost:8090/api/salespersons/");
        const data = await response.json();
        setSalesPeople(data.sales_persons);
    }

    useEffect(() => {
        getSalesPeople();
    }, []);

    return (  
        <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-4">
              <SalesPersonCreateForm getSalesPeople={getSalesPeople}  />
          </div>
          <div className="col-12 col-md-8">
            <div className="card-body">
              <SalesPersonList
                salesPersons={salesPersons}
              />
            </div>
          </div>
        </div>
      </div>
    );
}
export default SalesPersonParent