

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Navbar, Nav } from 'react-bootstrap';
// // import Login from './Login';
// // import AboutUs from './AboutUs';
// import '../../css/Home.css';
// import SignInForm from '../SignIn/SignInForm';
// import Aboutuspage from './Aboutuspage';
// import Dairyhomepage from './Dairyhomepage'

// function HomePage() {
//   const [activeTab, setActiveTab] = useState();

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   let content = null;
//   switch (activeTab) {
//     case 'home':
//       content = <Dairyhomepage />;
//       break;
//     case 'login':
//       content = <SignInForm />;
//       break;
//     case 'about':
//       content = <Aboutuspage />;
//       break;
//     default:
//       //content = <Dairyhomepage />;
//   }

//   return (
//     <div className="HomePage">
//       <Navbar bg="light" expand="lg">
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="mr-auto">
//             <h4>
//               <Nav.Link
//                 as={Link}
//                 to="/home"
//                 active={activeTab === 'home'}
//                 onClick={() => handleTabClick('home')}
//               >
//                 Home
//               </Nav.Link>
//             </h4>
//             <h4>
//               <Nav.Link
//                 as={Link}
//                 to="/login"
//                 active={activeTab === 'login'}
//                 onClick={() => handleTabClick('login')}
//               >
//                 Login
//               </Nav.Link>
//             </h4>
//             <h4>
//               <Nav.Link
//                 as={Link}
//                 to="/about"
//                 active={activeTab === 'about'}
//                 onClick={() => handleTabClick('about')}
//               >
//                 About Us
//               </Nav.Link>
//             </h4>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//       <div className="container">{content}</div>
//     </div>
//   );
// }

// export default HomePage;







// HomePage.js

// import React, { useState } from 'react';
// import Dairyhomepage from './Dairyhomepage';
// import {useRef} from 'react';


// function HomePage() {
//   const [activeTab, setActiveTab] = useState('/');

//   const buttonRef = useRef(null);


//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//     // window.location.reload();
//     // buttonRef.current.removeEventListener('click',handleTabClick);
//   };



//   return (
//     <div className="HomePage">
//       <Dairyhomepage/>
//     </div>
//   );
// }

// export default HomePage;
