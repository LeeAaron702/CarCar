import React from "react";

function SaleableVehicles({ automobiles }) {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {automobiles.map((automobile) => {
        return (
          <div key={automobile.vin} className="col">
            <div className="card h-100 shadow">
              <img
                src={automobile.picture_url}
                className="card-img-top img-thumbnail"
                alt={`${automobile.manufacturer} ${automobile.model}`}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {automobile.manufacturer} {automobile.model}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">{automobile.color}</h6>
                <p className="card-text">{automobile.year}</p>
              </div>
              <div className="card-footer">{automobile.vin}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SaleableVehicles;
