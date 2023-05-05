import React, { useEffect, useState } from "react";
import AutoMobileList from "./AutoMobileList";
import NewAutomobileForm from "./AutomobileForm";

function AutomobileParent () {
    const [autos, setAutos] = useState([]);

    const fetchModels = async () => {
        const response = await fetch("http://localhost:8100/api/automobiles/");
        if (response.ok) {
            const data = await response.json();
            setAutos(data.autos);
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
                    <NewAutomobileForm fetchModels={fetchModels} />
                </div>
                <div className="col-12 col-md-8">
                    <div className="card-body">
                        <AutoMobileList
                            autos={autos}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AutomobileParent
