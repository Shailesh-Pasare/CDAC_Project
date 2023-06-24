import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignInForm from "./components/SignIn/SignInForm";
import AddEmployeeForm from "./components/Admin/AddEmployeeForm";
import EmployeeList from "./components/Admin/EmployeeList";
import AdminHome from "./components/Admin/AdminHome";
import ProductListForStore from "./components/Store/ProductListForStore";
import OrderSuccess from "./components/Store/OrderSuccess";
import Dairyhomepage from "./components/main/Dairyhomepage";
import video from "./assets/homepagevideo.mp4";
import HomePage from "./components/main/Homepage";
import EmployeeHome from "./components/Employee/EmployeeHome";
import MilkRate from "./components/Bills/milkRate";
import History from "./components/Bills/History";
import NewBill from "./components/Bills/NewBill";
import ProductDetails from "./components/Product/ProductDetails";
import ProductAdd from "./components/Product/ProductAdd";
import ProductList from "./components/Product/ProductList";
import AddMilkSupplier from "./components/Supplier/AddMilkSupplier";
import ViewMilkSupplier from "./components/Supplier/ViewMilkSuppliers";
import UpdateMilkSupplier from "./components/Supplier/UpdateMilkSupplier";
import SuppliersHome from "./components/Supplier/SupplierHome";
import React, { useState } from 'react';
import { useRef } from 'react';
import Navigation from "./components/main/Navigation";
import Aboutuspage from "./components/main/Aboutuspage";


function App() {

  const [activeTab, setActiveTab] = useState('/');

  const buttonRef = useRef(null);


  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // window.location.reload();
    // buttonRef.current.removeEventListener('click',handleTabClick);
  };

  let content = null;
  switch (activeTab) {
    case 'home':
      window.location.href = "./";
      // content = <Dairyhomepage />;
      break;
    case 'login':
      window.location.href = "./login";
      // content = <SignInForm />;
      break;
    case 'about':
      window.location.href = "./about";
      // content = <Aboutuspage />;
      break;
    default:
    // content = <Dairyhomepage />;
  }


  return (
    <div className="App">
      <div>
        <video
          autoPlay
          muted
          loop
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Router>
          <Navigation activeTab={activeTab} handleTabClick={handleTabClick} />
          <div className="container">{content}</div>
          <Switch>
            <Route exact path="/" component={Dairyhomepage} />
            <Route exact path="/dairyhomepage" component={Dairyhomepage} />

            <Route path="/employees" component={AdminHome} />

            <Route path="/login" component={SignInForm} />
            <Route path="/about" component={Aboutuspage} />

            <Route
              path="/employees/save-employees"
              component={AddEmployeeForm}
            />

            <Route path="/employees/get-employees" component={EmployeeList} />

            <Route
              path="/products/get-products/:id"
              component={ProductListForStore}
            />
            <Route path="/order-success/:id" component={OrderSuccess} />
            {/* --------------------------------------------------------------------------------------------------------------------------- */}

            <Route path="/employeehome" exact component={EmployeeHome} />
            {/* } --------------------------------------------------------------------------------------------------------------------------- */}
            <Route path="/milk-rate" exact component={MilkRate} />
            <Route path="/history" exact component={History} />
            <Route path="/bill-form" exact component={NewBill} />

            <Route path="/view/:id" exact component={ProductDetails} />
            <Route path="/add/:id" exact component={ProductAdd} />
            <Route path="/list" exact component={ProductList} />
            <Route path="/suppliers/add" component={AddMilkSupplier} />
            <Route path="/update/:supplierId" component={UpdateMilkSupplier} />
            <Route path="/suppliers/view" component={ViewMilkSupplier} />

            <Route path="/supplier" component={SuppliersHome} />

          </Switch>
        </Router>
        <footer>
          <p className="footerclass" >&copy; 2023 CDAC . All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
















//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




// import logo from './logo.svg';
// import Home from './Home';
// import UpdateMilkSupplier from './components/UpdateMilkSupplier';

// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
// import AddMilkSupplier from './components/AddMilkSupplier';
// import AcceptMilk from './AcceptMilk';
// import ViewMilkSuppliers from './components/ViewMilkSuppliers';
// import MilkRate from './components/MilkRate';
// import Store from './components/Store';
// import ProductList from './components/ProductList';
// import ProductAdd from './components/ProductAdd';
// import ProductDetails from './components/ProductDetails';
// import OrderEmployee from './components/OrderEmployee';



// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Switch> 
//            <Route path="/" exact  component={Home}/>
//            <Route path="/suppliers/add"  component={AddMilkSupplier}/>
//            <Route path="/update/:supplierId" component={UpdateMilkSupplier}/>
//            <Route path="/suppliers/view" component={ViewMilkSuppliers}/>

//            <Route path="/milkrate" exact  component={MilkRate}/>
//            <Route path="/store" exact  component={Store}/>
//            <Route path="/list" exact  component={ProductList}/>
//            <Route path="/list"  component={ProductList}/>
//            <Route path="/add/:id" component={ProductAdd}/>
//            <Route path="/view/:id" component={ProductDetails}/>
//            <Route path="/orderEmployee" component={OrderEmployee}/>
//         </Switch>
//       </Router>
//     </div>
//   );
// }

// export default App;
