import React, { useEffect, useState } from "react";

function CustomerList({customers, getCustomer}) {
  // const [customers, setCustomers] = useState([]);

  // const getCustomer = async () => {
  //   const response = await fetch("http://localhost:8090/api/customers/");
  //   const data = await response.json();
  //   setCustomers(data.customers);
  // };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <div>
      <br></br>
      <h1 className="text-center">Customers</h1>
      <table className="table table-striped">
        <thead className="text-center">
          <tr className="header">
            <th>Name</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {customers.map((customer) => {
            return (
              <tr key={customer.address}>
                <td>{customer.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default CustomerList;
