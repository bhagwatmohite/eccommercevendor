// /* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from "react";
// import {
//   FaBars,
//   FaRegChartBar,
//   FaShoppingBag,
//   FaTh,
//   FaThList
// } from "react-icons/fa";

// import { MdPayments } from "react-icons/md";
// import { NavLink } from 'react-router-dom';

// // eslint-disable-next-line react/prop-types
// const Sidebar = ({ setSidebarOpen, sidebarOpen }) => {

//   const [email, setEmail] = useState('');
//   const [vendorDetails, setVendorDetails] = useState(null);
//   const [name, setName] = useState("");

//   useEffect(() => {
//     // Retrieve email from local storage
//     const storedEmail = localStorage.getItem('email');
//     if (storedEmail) {
//       setEmail(storedEmail);
//     }

//     // Fetch all user data from the API
//     const fetchVendorData = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/allcustomer');
//         const data = await response.json();

//         // Find the user whose email matches the stored email
//         const vendor = data.find(vendor => vendor.email === storedEmail);
//         if (vendor) {
//           setVendorDetails(vendor);
//           setName(vendor.firstName);
//         }
//       } catch (error) {
//         console.error('Failed to fetch user data:', error);
//         console.log(vendorDetails);
//         console.log(email);
//       }
//     };

//     if (storedEmail) {
//       fetchVendorData();
//     }
//   }, []);


//   const toggle = () => setSidebarOpen(!sidebarOpen);
//   const menuItem = [
//     {
//       path: "/dashboard",
//       name: "Dashboard",
//       icon: <FaTh />
//     },
//     // {
//     //   path: "customers",
//     //   name: "Customers",
//     //   // icon: <FaUserAlt />
//     //   icon: <ImUsers />
//     // },
//     {
//       path: "/products",
//       name: "Products",
//       icon: <FaShoppingBag />
//     },
//     {
//       path: "stocks",
//       name: "Stocks",
//       icon: <FaRegChartBar />
//     },

//     {
//       path: "payments",
//       name: "Payments",
//       // icon: <FaCommentAlt />
//       icon: <MdPayments />
//     },
//     {
//       path: "reports",
//       name: "Reports",
//       icon: <FaThList />
//     },
//   ]
//   return (
//     <div className="container" style={{ overflow: 'hidden !important' }}>
//       <div style={{ width: sidebarOpen ? "200px" : "50px" }} className="sidebar">
//         <div className="top_section">



//           <h1 style={{ display: sidebarOpen ? "block" : "none" }} className="logo">{name}</h1>

//           <div style={{ marginLeft: sidebarOpen ? "50px" : "0px" }} className="bars">
//             <FaBars onClick={toggle} />
//           </div>
//         </div>
//         {
//           menuItem.map((item, index) => (
//             <NavLink to={item.path} key={index} className="link">
//               <div className="icon">{item.icon}</div>
//               <div style={{ display: sidebarOpen ? "block" : "none" }} className="link_text">{item.name}</div>
//             </NavLink>
//           ))
//         }
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


/* eslint-disable react/prop-types */

import { FaBars, FaRegChartBar, FaShoppingBag, FaTh, FaThList } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import useCustomHook from './useCustomHook'; // Import the custom hook

const Sidebar = ({ setSidebarOpen, sidebarOpen }) => {
  const { name } = useCustomHook(); // Call the custom hook

  const toggle = () => setSidebarOpen(!sidebarOpen);
  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTh />
    },
    {
      path: "/products",
      name: "Products",
      icon: <FaShoppingBag />
    },
    {
      path: "stocks",
      name: "Stocks",
      icon: <FaRegChartBar />
    },
    {
      path: "payments",
      name: "Payments",
      icon: <MdPayments />
    },
    {
      path: "reports",
      name: "Reports",
      icon: <FaThList />
    },
  ];

  return (
    <div className="container" style={{ overflow: 'hidden !important' }}>
      <div style={{ width: sidebarOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: sidebarOpen ? "block" : "none" }} className="logo">{name}</h1>
          <div style={{ marginLeft: sidebarOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {
          menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link">
              <div className="icon">{item.icon}</div>
              <div style={{ display: sidebarOpen ? "block" : "none" }} className="link_text">{item.name}</div>
            </NavLink>
          ))
        }
      </div>
    </div>
  );
};

export default Sidebar;
