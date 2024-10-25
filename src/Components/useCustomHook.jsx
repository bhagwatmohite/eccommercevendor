import { useEffect, useState } from "react";

const useCustomHook = () => {
  const [email, setEmail] = useState('');
  const [vendorDetails, setVendorDetails] = useState(null);
  const [name, setName] = useState("");
  const [id, sertId] = useState("");

  useEffect(() => {
    // Retrieve email from local storage
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }

    // Fetch all user data from the API
    const fetchVendorData = async () => {
      try {
        const response = await fetch('http://localhost:8080/allcustomer');
        const data = await response.json();

        // Find the user whose email matches the stored email
        const vendor = data.find(vendor => vendor.email === storedEmail);
        if (vendor) {
          setVendorDetails(vendor);
          setName(vendor.firstName);
          sertId(vendor.id);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    if (storedEmail) {
      fetchVendorData();
    }
  }, []);

  return { email, vendorDetails, name, id };
};

export default useCustomHook;
