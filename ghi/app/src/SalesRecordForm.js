import React, { useEffect, useState } from "react";

function SalesRecordCreateForm() {
  const [salesPersons, setSalesPersons] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);
  const [price, setPrice] = useState("");
  const [salesPerson, setSalesPerson] = useState("");
  const [customer, setCustomer] = useState("");
  const [automobile, setAutomobile] = useState("");

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value);
  };
  const handleSalePersonChange = (event) => {
    const value = event.target.value;
    setSalesPerson(value);
  };
  const handleCustomerChange = (event) => {
    const value = event.target.value;
    setCustomer(value);
  };
  const handleAutoMobileChange = (event) => {
    const value = event.target.value;
    setAutomobile(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.price = parseInt(price);
    data.sales_person = salesPerson;
    data.customer = customer;
    data.automobile = automobile;

    const SalesRecordsURL = "http://localhost:8090/api/salesrecords/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(SalesRecordsURL, fetchConfig);
    if (response.ok) {
      await response.json();

      setPrice("");
      setSalesPerson("");
      setCustomer("");
      setAutomobile("");

      fetchAutoMobileVO();
    }
  };

  const fetchSalesPersons = async () => {
    const SalesPersonUrl = "http://localhost:8090/api/salespersons/";

    const response = await fetch(SalesPersonUrl);

    if (response.ok) {
      const data = await response.json();
      setSalesPersons(data.sales_persons);
    }
  };

  const fetchCustomers = async () => {
    const CustomerUrl = "http://localhost:8090/api/customers/";

    const response = await fetch(CustomerUrl);

    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers);
    }
  };

  const fetchAutoMobileVO = async () => {
    const AutoMobileVoUrl = "http://localhost:8090/api/automobileVOs/";

    const response = await fetch(AutoMobileVoUrl);

    if (response.ok) {
      const data = await response.json();
      const availableAutomobiles = data.automobiles.filter(
        (automobile) => !automobile.is_sold
      );
      setAutomobiles(availableAutomobiles);
    }
  };

  useEffect(() => {
    fetchSalesPersons();
    fetchCustomers();
    fetchAutoMobileVO();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Record a New Sale</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <select
                  onChange={handleAutoMobileChange}
                  value={automobile}
                  required
                  name="automobile"
                  id="automobile"
                  className="form-select"
                >
                  <option value="">Choose an Automobile</option>
                  {automobiles.map((automobile) => {
                    return (
                      <option value={automobile.vin} key={automobile.vin}>
                        {automobile.vin}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group mb-3">
                <select
                  onChange={handleSalePersonChange}
                  value={salesPerson}
                  required
                  name="salesPerson"
                  id="salesPerson"
                  className="form-select"
                >
                  <option value="">Choose a Sales Person</option>
                  {salesPersons.map((salesperson) => {
                    return (
                      <option
                        value={salesperson.id}
                        key={salesperson.employee_number}
                      >
                        {salesperson.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group mb-3">
                <select
                  onChange={handleCustomerChange}
                  value={customer}
                  required
                  name="customer"
                  id="customer"
                  className="form-select"
                >
                  <option value="">Choose a Customer</option>
                  {customers.map((customer) => {
                    return (
                      <option value={customer.id} key={customer.phone_number}>
                        {customer.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handlePriceChange}
                  value={price}
                  placeholder="price"
                  required
                  type="text"
                  name="price"
                  id="price"
                  className="form-control"
                />
                <label htmlFor="price">Sale Price</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesRecordCreateForm;
