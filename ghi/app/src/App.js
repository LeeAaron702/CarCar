import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ModelCreateForm from "./ModelForm";
import ManufacturerList from "./ManufacturerList";
import NewManufacturerForm from "./ManufacturerForm";
import AutoMobileList from "./AutoMobileList";
import NewAutomobileForm from "./AutomobileForm";
import SalesPersonCreateForm from "./SalesPersonForm";
import CreateCustomerForm from "./CustomerForm";
import SalesRecordCreateForm from "./SalesRecordForm";
import SalesRecordsList from "./SalesRecordList";
import SalesHistoryList from "./SalesHistory";
import NewTechnicianForm from "./TechnicianForm";
import NewAppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";
import ServiceHistory from "./ServiceHistory";
import TechnicianList from "./TechnicianList";
import SalesPersonList from "./SalesPersonList";
import EditTechnicianForm from "./TechnicianEditForm";
import TechnicianParent from "./TechnicianParent";
import ManufacturerParent from "./ManufacturerParent";
import ModelParent from "./ModelParent";
import AppointmentParent from "./AppointmentParent";
import AutomobileParent from "./AutomobileParent";
import SalesPersonParent from "./SalesPersonParent";
import VehicleCards from "./VehicleCards";
import CustomerList from "./CustomerList";
import CustomerParent from "./CustomerParent";


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="manufacturer" element={<ManufacturerParent />} />
          <Route path="model" element={<ModelParent />} />
          <Route path="automobile" element={<AutomobileParent />} />
          <Route path="salesperson" element={<SalesPersonParent />} />
          <Route path="customer" element={<CustomerParent />} />
          <Route path="appointment" element={<AppointmentParent />} />
          <Route path="technician" element={<TechnicianParent />}  />
          


          <Route path="manufacturers" element={<ManufacturerList />} />
          <Route
            path="manufacturers/create"
            element={<NewManufacturerForm />}
          />

          {/* <Route path="models" element={<ModelList />} />
          <Route path="models/create" element={<ModelCreateForm />} />
          <Route path="automobile" element={<AutoMobileList />} />
          <Route path="automobile/create" element={<NewAutomobileForm />} /> */}

          {/* <Route
            path="salesperson/create"
            element={<SalesPersonCreateForm />}
          /> */}
          {/* <Route path="customer" element={<CustomerList />} /> */}
          {/* <Route path="customer/create" element={<CreateCustomerForm />} /> */}

          <Route path="salesrecord" element={<SalesRecordsList />} />
          <Route path="salesrecord/create" element={<SalesRecordCreateForm />} />

          <Route path="saleshistory" element={<SalesHistoryList />} />

          {/* <Route path="appointment/create" element={<NewAppointmentForm />} />
          <Route path="appointment/list" element={<AppointmentList />} /> */}

{/* 
          <Route path="technician" element={<TechnicianList />} />
          <Route path="technician/create" element={<NewTechnicianForm />} />
          <Route path="technician/edit/:employee_number" element={<EditTechnicianForm />} /> */}
          
            {/* <Route path="technician/create" element={<NewTechnicianForm />} /> */}
            {/* <Route path="technician/edit/:employee_number" element={<EditTechnicianForm />} /> */}

          {/* <Route path="servicehistory" element={<ServiceHistory />} /> */}
          <Route path="servicehistory" element={<ServiceHistory />} />
          <Route path="vehiclecard" element={<VehicleCards />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
