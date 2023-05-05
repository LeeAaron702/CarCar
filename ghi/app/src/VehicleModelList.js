import React from "react";
import { useEffect, useState } from "react";

const ModelList = () => {
  const [models, setModels] = useState([]);

  const fetchModels = async () => {
    const modelUrl = "http://localhost:8100/api/models/";

    const response = await fetch(modelUrl);

    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    } else {
      console.error(response);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <div>
      <h1 className="text-center">Vehicle Models</h1>
      <table className="table table-striped">
        <thead className="text-center">
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {models.map((model) => {
            return (
              <tr key={model.id}>
                <td>{model.name}</td>
                <td>{model.manufacturer.name}</td>
                <td>
                  <a href={model.picture_url}>
                    <img
                      src={model.picture_url}
                      alt={model.name}
                      style={{ maxHeight: "6vh", maxWidth: "6vw" }}
                    />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      );
};

export default ModelList;
