import React from "react";
import { useEffect, useState } from "react";

const VehicleCards = () => {
	const [models, setModels] = useState([]);
	const fetchModels = async () => {
		const automobileURL = `http://localhost:8100/api/automobiles/`;
		const response = await fetch(automobileURL);
        console.log(response)


		if (response.ok) {
			const data = await response.json();
			console.log(data, " THIS is the dataaaaaaa")
			setModels(data);
            const test = models["autos"][0]["color"]
            console.log(test)
		} else {
			console.error(response);
		}
	};


	useEffect(() => {
		fetchModels();
	}, []);


	return (
		<div className="container">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          <div className="d-flex mt-5 justify-content-center">
            <div className="card" style={{ width: "40vh" }}>
              <img
                className="card-img-top"
                src="\images\BMW.jpg"
                alt="Card image cap"
                style={{
                  maxHeight: "40vh",
                  maxWidth: "40vw",
                }}></img>
              <div className="card-body">
                <h5 className="card-title">hello</h5>
                <p className="card-text">
                  Model: {} <br></br> Color:  <br></br> Bin:
                </p>
              </div>
              <div className="card-body">
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="d-flex mt-5 justify-content-center">
            <div className="card" style={{ width: "40vh" }}>
              <img
                className="card-img-top"
                src="\images\BMW.jpg"
                alt="Card image cap"
                style={{
                  maxHeight: "40vh",
                  maxWidth: "40vw",
                }}></img>
              <div className="card-body">
                <h5 className="card-title">hello</h5>
                <p className="card-text">
                  Model: <br></br> Color: {models["autos"][0]["color"]} <br></br> Bin:
                </p>
              </div>
              <div className="card-body">
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="d-flex mt-5 justify-content-center">
            <div className="card" style={{ width: "40vh" }}>
              <img
                className="card-img-top"
                src="\images\BMW.jpg"
                alt="Card image cap"
                style={{
                  maxHeight: "40vh",
                  maxWidth: "40vw",
                }}></img>
              <div className="card-body">
                <h5 className="card-title">hello</h5>
                <p className="card-text">
                  Model:  <br></br> Color:  <br></br> Bin:
                </p>
              </div>
              <div className="card-body">
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleCards;