import { NavLink, Outlet, Link } from 'react-router-dom';

function Nav() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">CarCar</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdownCars" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Manufacturer
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownCars">
                  <li><Link className="dropdown-item" activeclassname="inactive" to="/manufacturers">List of Manufacturers</Link></li>
                  <li><Link className="dropdown-item" activeclassname="inactive" to="/manufacturers/create">Create Manufacturer</Link></li>
                </ul>
              </li> */}
               <NavLink className="nav-link" to="manufacturer">Manufacturer</NavLink>
               <NavLink className="nav-link" to="model">Model</NavLink>
               <NavLink className="nav-link" to="automobile">Automobile</NavLink>
               <NavLink className="nav-link" to="technician">Technician</NavLink>
               <NavLink className="nav-link" to="salesperson">Sales Person</NavLink>
               <NavLink className="nav-link" to="appointment">Service Appointment</NavLink>

     
     
            
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdownCars" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  New Customer
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownCars">
                  {/* <li><Link className="dropdown-item" activeclassname="inactive" to="customer">List Of Customers</Link></li> */}
                  <li><Link className="dropdown-item" activeclassname="inactive" to="customer/create">Create Customer</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdownCars" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Sales Record
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownCars">
                  <li><Link className="dropdown-item" activeclassname="inactive" to="/salesrecord">List of Sale Records</Link></li>
                  <li><Link className="dropdown-item" activeclassname="inactive" to="salesrecord/create">Create Sales Record</Link></li>
                  <li><Link className="dropdown-item" activeclassname="inactive" to="saleshistory">Sales History by Sales Person</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}

export default Nav;
