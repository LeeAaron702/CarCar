import React, { useEffect, useState } from "react";
import SaleableVehciles from "./AvailVehicleGallery"


function MainPage() {
  const [automobiles, setAutomobiles] = useState([]);
  // const [automobileColumns, setAutomobileCoumns] = useState([[],[],[]])
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
    fetchAutoMobileVO();
  }, []);

  return (
    <div className="container">
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">CarCar</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            The premiere solution for automobile dealership
            management!
          </p>
        </div>
      </div>
      <div className="">
        < SaleableVehciles automobiles={automobiles} />
      </div>
    </div>
  );
}


export default MainPage;
