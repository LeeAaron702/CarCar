import React from "react";
import { useEffect, useState } from "react";

const AutoMobileList = ({ autos }) => {


	return (

		<div>
			<h1 className="text-center">Automobiles</h1>
			<table className="table table-striped">
				<thead className="text-center">
					<tr>
						<th>Vin</th>
						<th>Color</th>
						<th>Year</th>
						<th>Model</th>
						<th>Manufacturer</th>
						<th>Picture</th>

					</tr>
				</thead>
				<tbody className="text-center">
					{autos.map((auto) => {
						return (
							<tr key={auto.id}>
								<td>{auto.vin}</td>
								<td>{auto.color}</td>
								<td>{auto.year}</td>
								<td>{auto.model.name}</td>
								<td>{auto.model.manufacturer.name}</td>
								<td>
									<a href={auto.picture_url}>
										<img
											src={auto.picture_url}
											alt={auto.name}
											style={{ maxHeight: "6vh", maxWidth: "6vw" }}
										/>
									</a>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div >

	);
};

export default AutoMobileList;
