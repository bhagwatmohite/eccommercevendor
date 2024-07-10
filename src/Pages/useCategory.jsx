import axios from "axios";
import { useEffect, useState } from "react";


const useCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from API endpoint
    axios.get('http://13.201.255.228:8080/getallcategory')
      .then(response => {
        // Set categories state with the data received from API
        setCategories(response.data);
        // console.log(response.data)

      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        // console.log(categories)
      });

  }, []);

  return { categories };
}

export default useCategory