import React, { useEffect, useState } from "react";

function SalesHistoryList() {
  const [salesrecords, setSalesRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [salesPersons, setSalesPersons] = useState([]);

  const getSalesRecords = async () => {
    const response = await fetch("http://localhost:8090/api/salesrecords/");
    const data = await response.json();
    setSalesRecords(data.sales_records);
  };

  const fetchSalesPersons = async () => {
    const SalesPersonUrl = "http://localhost:8090/api/salespersons/";
    const response = await fetch(SalesPersonUrl);
    if (response.ok) {
      const data = await response.json();
      setSalesPersons(data.sales_persons);
    }
  };

  useEffect(() => {
    getSalesRecords();
    fetchSalesPersons();
  }, []);

  return (
    <div>
      <h1 className="text-center">Sales History</h1>
      <div className="form-group mb-3">
        <input
          onChange={(event) => setSearch(event.target.value)}
          value={search}
          placeholder="Input Sales Person to Search"
          required
          type="text"
          id="search"
          className="form-control"
        />
      </div>
      <div className="form-group mb-3">
        <select
          onChange={(event) => setSearch(event.target.value)}
          value={search}
          required
          name="salesPerson"
          id="salesPerson"
          className="form-select"
        >
          <option value="">Select Sales Person</option>
          {salesPersons.map((salesperson) => {
            return (
              <option value={salesperson.id} key={salesperson.employee_number}>
                {salesperson.name}
              </option>
            );
          })}
        </select>
      </div>
      <table className="table table-striped">
        <thead className="text-center">
          <tr className="header">
            <th>Sales Person</th>
            <th>Customer Name</th>
            {/* <th>Automobile Name</th> */}
            <th>VIN</th>
            <th>Sale Price</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {salesrecords
            .filter((salesrecord) => {
              const searchInput = search.toUpperCase();
              const nameInput = salesrecord.sales_person.name.toUpperCase();
              return searchInput === ""
                ? salesrecord
                : nameInput.includes(searchInput);
            })
            .map((salesrecord) => {
              return (
                <tr key={salesrecord.id}>
                  <td>{salesrecord.sales_person.name}</td>
                  <td>{salesrecord.customer.name}</td>
                  {/* <td>{salesrecord.automobile.model}</td> */}
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
export default SalesHistoryList;
