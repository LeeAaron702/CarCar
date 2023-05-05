import React from "react";

function ManufacturerList({ manufacturers }) {


  return (
    <div>
      <h1 className="text-center">Manufacturers</h1>
      <table className="table table-striped">
        <thead className="text-center">
          <tr className="header">
            <th>Name</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {manufacturers.map((manufacturer) => {
            return (
              <tr key={manufacturer.href}>
                <td>{manufacturer.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default ManufacturerList;
