import React, { useState } from 'react';

function CreateCustomerForm({getCustomer}) {
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');



  const handleAddressChange = (event) => {
    const value = event.target.value;
    setAddress(value);
  }
  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
  }
  const handleNameChange = (event) => {
    const value = event.target.value.trim();
    setName(value);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = name;
    data.address = address;
    data.phone_number = phoneNumber;




    const CustomerUrl = 'http://localhost:8090/api/customers/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(CustomerUrl, fetchConfig);
    if (response.ok) {
      await response.json();

      setAddress('');
      setPhoneNumber('');
      setName('')
      getCustomer()
    }
  }



  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add New Customer</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input onChange={handleNameChange}
                  value={name}
                  placeholder="name"
                  required type="text"
                  name="name"
                  id="name"
                  className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleAddressChange} value={address} placeholder="address" required type="text" name="address" id="address" className="form-control" />
                <label htmlFor="employeeNumber">Address</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handlePhoneNumberChange} value={phoneNumber} placeholder="phoneNumber" required type="text" name="phoneNumber" id="phoneNumber" className="form-control" />
                <label htmlFor="phoneNumber">Phone Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>


  );
}

export default CreateCustomerForm;