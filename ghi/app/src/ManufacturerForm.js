import React, { useState } from "react";

function NewManufacturerForm({ getManufacturer }) {
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.name = name;

    const manufacturerURL = "http://localhost:8100/api/manufacturers/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(manufacturerURL, fetchConfig);
    if (response.ok) {
      await response.json();
      setName("");
      getManufacturer();
    } else {
      console.error("Error Manu Post Failed");
    }
  };

  return (
        <div className="shadow p-4 mt-4">
          <h1>Create a Manufacturer </h1>
          <form onSubmit={handleSubmit} id="manufacturer-form">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                placeholder="name"
              />
              <label htmlFor="Name">Name</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </div>
  );
}
export default NewManufacturerForm;
