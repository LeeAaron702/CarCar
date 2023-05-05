import React from "react";
import { useEffect, useState } from "react";

const ModelList = ({ models }) => {

  return (
    <div>
      <h1 className="text-center" >Vehicle Models</h1>
      <table className="table table-striped">
        <thead className="text-center">
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {models.map((model) => {
            return (
              <tr key={model.id}>
                <td>{model.name}</td>
                <td>{model.manufacturer.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div >
  );
};

export default ModelList;
