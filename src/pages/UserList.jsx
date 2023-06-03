import React, { useState } from 'react';
import axios from 'axios';
import './UserList.css';


const UserList = () => {
  const [activeTab, setActiveTab] = useState('userManagement');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [userData, setUserData] = useState([]);
  const [featureData, setFeatureData] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = async () => {
    try {
      // Gửi yêu cầu HTTP để lấy dữ liệu từ MySQL dựa trên từ khóa tìm kiếm
      const response = await axios.get(`URL_API_SEARCH_ENDPOINT?keyword=${searchKeyword}`);
      
      // Cập nhật state với dữ liệu từ server
      if (activeTab === 'userManagement') {
        setUserData(response.data);
      } else if (activeTab === 'featureManagement') {
        setFeatureData(response.data);
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
    }
  };

  const renderUserManagement = () => {
    return (
      <div className="management-wrapper">
        <h2>User Management</h2>
        <div className="search-bar">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>User name</th>
              <th>Phone number</th>
              <th>Last update</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.lastUpdate}</td>
                <td>
                  <span className={`status-dot ${user.status ? 'active' : 'inactive'}`}></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderFeatureManagement = () => {
    return (
      <div className="management-wrapper">
        <h2>Feature Management</h2>
        <div className="search-bar">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {featureData.map((feature, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{feature.name}</td>
                <td>{feature.description}</td>
                <td>
                  <span className={`status-dot ${feature.status ? 'active' : 'inactive'}`}></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="user-list-container">
      <div className="left-column">
        <h1>Learning Hub</h1>
        <button
          className={`management-button ${activeTab === 'userManagement' ? 'active' : ''}`}
          onClick={() => handleTabChange('userManagement')}
        >
          User Management
        </button>
        <button
          className={`management-button ${activeTab === 'featureManagement' ? 'active' : ''}`}
          onClick={() => handleTabChange('featureManagement')}
        >
          Feature Management
        </button>
      </div>
      <div className="right-column">
        <div className="user-button">
          <button className="user-avatar">User Name</button>
        </div>
        {activeTab === 'userManagement' && renderUserManagement()}
        {activeTab === 'featureManagement' && renderFeatureManagement()}
      </div>
    </div>
  );
};

export default UserList;
