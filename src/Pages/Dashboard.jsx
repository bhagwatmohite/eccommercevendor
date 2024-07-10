import axios from "axios";
import { useEffect, useState } from "react";
import { LuUsers } from "react-icons/lu";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [menProductsCount, setMenProductsCount] = useState(0);
  const [womenProductsCount, setWomenProductsCount] = useState(0);

  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get('http://13.201.255.228:8080/allcustomer');
      const customers = response.data;
      setTotalUsers(customers.length);
    } catch (error) {
      console.error('Error fetching total users:', error);
    }
  };

  const fetchVendorProducts = async (vendorId) => {
    try {
      const response = await axios.get(`http://13.201.255.228:8080/customer/${vendorId}`);
      const products = response.data.products; // Assuming products are in the 'products' field
      setTotalProducts(products.length);



      const menProducts = products.filter(product => product.category === 'fashion');
      setMenProductsCount(menProducts.length);

      const womenProducts = products.filter(product => product.category === 'women');
      setWomenProductsCount(womenProducts.length);
    } catch (error) {
      console.error('Error fetching vendor products:', error);
    }
  };

  const fetchVendorDetails = async () => {
    try {
      const email = localStorage.getItem('email');
      if (!email) {
        console.error('No email found in local storage');
        return;
      }

      const response = await axios.get('http://13.201.255.228:8080/allcustomer');
      const customers = response.data;
      const vendor = customers.find(customer => customer.email === email);

      if (!vendor) {
        console.error('No matching vendor found');
        return;
      }

      fetchVendorProducts(vendor.id); // Fetch products specific to the vendor
    } catch (error) {
      console.error('Error fetching vendor details:', error);
    }
  };

  useEffect(() => {
    fetchTotalUsers();
    fetchVendorDetails();
  });

  return (
    <div className="container" style={{
      display: "grid",
      maxWidth: '100vw',
      width: '100%',
      padding: '0 20px',
      boxSizing: 'border-box'
    }}>
      <h1 className="text-center p-3 mb-4 bg-secondary text-white fw-bold mt-4" style={{ borderRadius: '15px' }}>DashBoard</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4" style={{ height: '200px' }}>
        <div className="col">
          <div className="card h-100 bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Orders</h5>
              <LuUsers />
              <p className="card-title">Todays orders:</p>
              <p className="card-text">{totalUsers}</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Revenue in Month</h5>
              <RiMoneyRupeeCircleFill />
              <p className="card-text">$10,000</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 bg-warning text-white">
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <h5 className="card-title">Products</h5>
                  <LuUsers />
                  <p className="card-text">Total Products: {totalProducts}</p>
                </div>
                <div className="col-6">
                  <h5 className="card-text">Category</h5>
                  <div className="row">
                    <div className="col-6">
                      <p className="card-text">fashion: {womenProductsCount}</p>
                    </div>
                    <div className="col-6">
                      <p className="card-text">Men: {menProductsCount}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
