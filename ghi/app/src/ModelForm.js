import React, { useEffect, useState } from "react";

function ModelCreateForm( {fetchModels} ) {
  const [manufacturerIds, setmanufacturerIds] = useState([]);
  const [name, setName] = useState("");
  const [manufacturerId, setmanufacturerId] = useState("");


  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };
  const handleManufacturerIdChange = (event) => {
    const value = event.target.value;
    setmanufacturerId(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = name;
    data.manufacturer_id = manufacturerId;

    const ModelUrl = "http://localhost:8100/api/models/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(ModelUrl, fetchConfig);
    if (response.ok) {
      await response.json();
      setName("");
      setmanufacturerId("");
      fetchModels();
    }
  };

  const fetchData = async () => {
    const ManufacturerUrl = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(ManufacturerUrl);
    if (response.ok) {
      const data = await response.json();

      setmanufacturerIds(data.manufacturers);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (

          <div className="shadow p-4 mt-4">
            <h1>Create New Vehicle Model</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  onChange={handleNameChange}
                  value={name}
                  placeholder="name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
                <label htmlFor="modelName">Name</label>
              </div>

              <div className="form-group mb-3">
                <select
                  onChange={handleManufacturerIdChange}
                  value={manufacturerId}
                  required
                  name="manufacturerId"
                  id="manufacturerId"
                  className="form-select"
                >
                  <option value="">Choose a Manufacturer</option>
                  {manufacturerIds.map((manufacturers) => {
                    return (
                      <option value={manufacturers.id} key={manufacturers.id}>
                        {manufacturers.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>

  );
}

export default ModelCreateForm;
