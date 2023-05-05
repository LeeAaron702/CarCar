import React, {useEffect,useState} from "react";
import CustomerList from "./CustomerList";
import CreateCustomerForm from "./CustomerForm";

function CustomerParent () {
    const [customers, setCustomers] = useState([]);

    const getCustomer = async () => {
      const response = await fetch("http://localhost:8090/api/customers/");
      const data = await response.json();
      setCustomers(data.customers);
    };


	useEffect(() => {
		getCustomer();
	}, []);


    return (
        <div className="container text-center">
        <div className="row align-items-start">
        <div className="col-6 mt-4 p-1">
            <CreateCustomerForm
            getCustomer = {getCustomer}
            />
        </div>
        <div className="col-6 mt-3">
            <CustomerList
            customers = {customers}
            getCustomer = {getCustomer}
            />
        </div>
      </div>
    </div>


     );
}

export default CustomerParent;