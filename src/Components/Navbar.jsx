/* eslint-disable react/prop-types */
import { Dropdown, Nav, Navbar } from 'react-bootstrap';
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

const CustomNavbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/'); // Redirect to login page on logout
  };

  return (
    <Navbar bg="light" variant="light" style={{ height: '60px', display: 'flex', justifyContent: 'end', paddingRight: '80px', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
      <Nav className="ml-auto d-flex justify-content-end">
        <CgProfile className="text-dark fs-3 pt-1" style={{ width: '37px' }} />
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            <Dropdown.Item> Edit Profile </Dropdown.Item>
            <Dropdown.Item> Settings </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
