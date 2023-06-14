// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./FeatureList.css";
// import Header from "../components/layout/Header";
// import Footer from "../components/layout/Footer";

// const FeatureList = () => {
//   const [activeTab, setActiveTab] = useState("userManagement");
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [userData, setUserData] = useState([]);
//   const [featureData, setFeatureData] = useState([]);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleSearch = async (event) => {
//     /* try {
//       const response = await axios.get("http://127.0.0.1:8080/api/v1/user");
//       const data = response.data;
  
//       if (activeTab === 'userManagement') {
//         setUserData(data.data);
//       } else if (activeTab === 'featureManagement') {
//         setFeatureData(data.data);
//       }
//     } catch (error) {
//       console.error('Lỗi khi tìm kiếm:', error);
//     } */
//     try {
//       const response = await fetch("http://localhost:8080/api/v1/feature");
//     } catch (error) {}
//   };

//   const renderFeatureManagement = () => {
//     return (
//       <div className="management-wrapper">
//         <h2>Feature Management</h2>
//         <div className="search-bar">
//           <input
//             type="text"
//             value={searchKeyword}
//             onChange={(e) => setSearchKeyword(e.target.value)}
//           />
//           <button onClick={handleSearch}>Search</button>
//         </div>
//         <table>
//           <thead>
//             <tr>
//               <th>STT</th>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {featureData.map((feature, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{feature.name}</td>
//                 <td>{feature.description}</td>
//                 <td>
//                   <span
//                     className={`status-dot ${
//                       feature.status ? "active" : "inactive"
//                     }`}
//                   ></span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <Header></Header>
//       <div className="user-list-container">
//         <div className="left-column">
//           <h1>Learning Hub</h1>
//           {/* <button
//           className={`management-button ${activeTab === 'userManagement' ? 'active' : ''}`}
//           onClick={() => handleTabChange('userManagement')}
//         >
//           User Management
//         </button> */}
//           <button
//             className={`management-button ${
//               activeTab === "featureManagement" ? "active" : ""
//             }`}
//             onClick={() => handleTabChange("featureManagement")}
//           >
//             Feature Management
//           </button>
//         </div>
//         <div className="right-column">
//           {/* {activeTab === 'userManagement' && renderUserManagement()} */}
//           {activeTab === "featureManagement" && renderFeatureManagement()}
//         </div>
//       </div>
//       <Footer></Footer>
//     </div>
//   );
// };

// export default FeatureList;
