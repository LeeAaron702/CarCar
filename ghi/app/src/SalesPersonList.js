import React, { useEffect, useState } from "react";

function SalesPersonList({salesPersons}) {
    return (
        <div>
            <h1 className="text-center">List of Sales People</h1>
            <table className="table table-striped">
                <thead className="text-center">
                    <tr className="header">
                        <th>Name</th>
                        <th>Employee Number</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {salesPersons.map((people) => {
                        return (
                            <tr key={people.employee_number}>
                                <td>{people.name}</td>
                                <td>{people.employee_number}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default SalesPersonList;