import React, { useEffect, useState } from "react";
import ModelList from "./ModelList";
import ModelCreateForm from "./ModelForm";

function ModelParent () {
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
        <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-4">
              <ModelCreateForm fetchModels={fetchModels}  />
          </div>
          <div className="col-12 col-md-8">
            <div className="card-body">
              <ModelList
                models={models}
              />
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default ModelParent