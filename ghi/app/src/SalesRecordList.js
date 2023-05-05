import React, { useEffect, useState } from "react";

function SalesRecordsList() {
  const [salesrecords, setSalesRecords] = useState([]);

  const getSalesRecords = async () => {
    const response = await fetch("http://localhost:8090/api/salesrecords/");
    const data = await response.json();
    setSalesRecords(data.sales_records);
  };

  useEffect(() => {
    getSalesRecords();
  }, []);

  return (
    <div>
      <h1 className="text-center">List of Sales</h1>
      <table className="table table-striped">
        <thead className="text-center">
          <tr className="header">
            <th>Sales Person</th>
            <th>Employee Number</th>
            <th>Purchaser Name</th>
            <th>Automobile VIN</th>
            <th>Price of Sale</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {salesrecords.map((salesrecord) => {
            return (
              <tr key={salesrecord.id}>
                <td>{salesrecord.sales_person.name}</td>
                <td>{salesrecord.sales_person.employee_number}</td>
                <td>{salesrecord.customer.name}</td>
                <td>{salesrecord.automobile.vin}</td>
                <td>$ {salesrecord.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default SalesRecordsList;
