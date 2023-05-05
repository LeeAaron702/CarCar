import React, { useState, useEffect } from "react";

function NewAutomobileForm(props) {
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [vin, setVin] = useState("");
  const [model_id, setModel] = useState("");
  const [models, setModels] = useState([]);
  const [PictureUrl, setPictureUrl] = useState("");

  const handlePictureUrlChange = (event) => {
    const value = event.target.value;
    setPictureUrl(value);
  };

  const fetchModels = async () => {
    const url = "http://localhost:8100/api/models/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    } else {
      console.error("No Models available");
    }
  };
  useEffect(() => {
    fetchModels();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.color = color;
    data.year = year;
    data.vin = vin;
    data.model_id = model_id;
    data.picture_url = PictureUrl;
    const submitUrl = "http://localhost:8100/api/automobiles/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(submitUrl, fetchConfig);
    if (response.ok) {
      await response.json();
      setColor("");
      setModel("");
      setVin("");
      setYear("");
      setPictureUrl("");
      props.fetchModels();
    } else {
      console.error("Error creating Automobile");
    }
  };

  return (
        <div className="shadow p-4 mt-4">
          <h1>Create a new Automobile</h1>
          <form onSubmit={handleSubmit} id="automobile-form">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                value={color}
                onChange={(event) => setColor(event.target.value)}
                required
                placeholder="Color"
              />
              <label htmlFor="Name">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="year"
                value={year}
                onChange={(event) => setYear(event.target.value)}
                required
                placeholder="Year"
              />
              <label htmlFor="Year">Year</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="vin"
                value={vin}
                onChange={(event) => setVin(event.target.value)}
                required
                placeholder="VIN"
              />
              <label htmlFor="VIN">VIN</label>
            </div>
            <div className="form-floating mb-3">
                <input
                  onChange={handlePictureUrlChange}
                  value={PictureUrl}
                  placeholder="pictureUrl"
                  required
                  type="text"
                  name="pictureUrl"
                  id="pictureUrl"
                  className="form-control"
                />
                <label htmlFor="ends">PictureUrl</label>
              </div>
            <div className="mb-3">
              <select
                onChange={(event) => setModel(event.target.value)}
                required
                name="model"
                id="model"
                value={model_id}
                className="form-select"
              >
                <option value="">Choose a model</option>
                {models.map((model) => {
                  return (
                    <option value={model.id} key={model.id}>
                      {model.name}
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
export default NewAutomobileForm;
