// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react/prop-types */

// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Button, Form, Modal } from 'react-bootstrap';


// const AddProductModal = ({ showModal, handleCloseModal, handleAddProduct, validated, newProduct, handleInputChange }) => {

//   //Image Vallidation here 
//   const [imageError, setImageError] = useState(null);

//   //usecustom hooks


//   //categories
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);


//   const validateImage = (image) => {
//     setImageError(null);

//     // Check image type
//     if (!image.name.match(/\.(jpg|png|jpeg)$/)) {
//       setImageError('Image type must be .jpg, .jpeg or .png.');
//       return false;
//     }

//     // Check image size (1MB limit)
//     if (image.size > 1000000) {
//       setImageError('Image size must be less than 1MB.');
//       return false;
//     }

//     return true;
//   };

//   const onFileChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       const isValid = validateImage(file);
//       if (isValid) {
//         handleInputChange(e); // Call parent component's input change handler
//       }
//     }
//   };

//   useEffect(() => {
//     // Fetch categories from API endpoint
//     // axios.get('http://localhost:8080/getallcategory')
//     //   .then(response => {
//     //     // Set categories state with the data received from API
//     //     setCategories(response.data);
//     //     // console.log(response.data)

//     //   })
//     //   .catch(error => {
//     //     console.error('Error fetching categories:', error);
//     //     // console.log(categories)
//     //   });

//     getCategory();
//     getSubcategpries();

//   }, []);

//   const getCategory = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/getallcategory');
//       setCategories(response.data);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   }

//   const getSubcategpries = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/getallsubcategory");
//       setSubcategories(response.data);

//     } catch (error) {
//       console.log("Error fetching subcategories", error);
//     }
//   }
//   // const fetchProductsForCustomer = async (customerId) => {
//   //   try {
//   //     const response = await axios.get(`http://localhost:8080/customer/${customerId}`);
//   //     setProducts(response.data.products);
//   //     // console.log(response.data.products);
//   //   } catch (error) {
//   //     console.error('Error fetching products for customer:', error);
//   //   }
//   // };

//   return (

//     <Modal show={showModal} onHide={handleCloseModal} >
//       <Modal.Header closeButton>
//         <Modal.Title>Add New Product</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form noValidate validated={validated} onSubmit={handleAddProduct}>

//           <Form.Group controlId="categoryId">
//             <Form.Label><b>Product Category :</b></Form.Label>
//             <Form.Select
//               as="select"
//               name="categoryId"
//               value={newProduct.categoryId}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="">Select category</option>
//               {categories.map(category => (
//                 <option key={category.id} value={category.id}>{category.name}</option>
//               ))}

//             </Form.Select>
//             <Form.Control.Feedback type="invalid">Please select a product category.</Form.Control.Feedback>
//           </Form.Group>


//           <Form.Group controlId="subcategoryId">
//             <Form.Label><b>Product SubCategory :</b></Form.Label>
//             <Form.Select
//               as="select"
//               name="subcategoryId"
//               value={newProduct.subcategoryId}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="">Select category</option>
//               {subcategories.map(category => (
//                 <option key={category.subcatid} value={category.subcatid}>{category.name}</option>
//               ))}

//             </Form.Select>
//             <Form.Control.Feedback type="invalid">Please select a product category.</Form.Control.Feedback>
//           </Form.Group>

//           {/* <Form.Group controlId="customerId">
//             <Form.Label>customerId:</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter product No. of customer"
//               name="customerId"
//               value={id}
//               onChange={handleInputChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a valid quantity.</Form.Control.Feedback>
//           </Form.Group> */}


//           <Form.Group controlId="productName">
//             <Form.Label><b>Product Name:</b></Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter product name"
//               name="name"
//               value={newProduct.name}
//               onChange={handleInputChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a product name.</Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group controlId="BrandName">
//             <Form.Label><b>Brand Name:</b></Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter product brandname"
//               name="brandname"
//               value={newProduct.brandname}
//               onChange={handleInputChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a product name.</Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group controlId="productDescription">
//             <Form.Label><b>Description:</b></Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               placeholder="Enter product description"
//               name="description"
//               value={newProduct.description}
//               onChange={handleInputChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a product description.</Form.Control.Feedback>
//           </Form.Group>
//           {/* <Form.Group controlId="productSize">
//             <Form.Label>Size:</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter product size"
//               name="size"
//               value={newProduct.size}
//               onChange={handleInputChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a product size.</Form.Control.Feedback>
//           </Form.Group> */}
//           <Form.Group controlId="productSize">
//             <Form.Label><b>Size:</b></Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter product sizes (comma-separated)"
//               name="sizes"
//               value={newProduct.sizes}  // Ensure newProduct.sizes is a string
//               onChange={handleInputChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter product sizes.</Form.Control.Feedback>
//           </Form.Group>
//           {/* <Form.Group controlId="productCategory">
//             <Form.Label>Category:</Form.Label>
//             <Form.Select
//               as="select"
//               name="category"
//               value={newProduct.category}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="">Select category</option>
//               {categories.map(category => (
//                 <option key={category.id} value={category.name}>{category.name}</option>
//               ))}
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">Please select a product category.</Form.Control.Feedback>
//           </Form.Group> */}
//           {/* <Form.Group controlId="productColor">
//             <Form.Label>Color:</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter product color"
//               name="color"
//               value={newProduct.color}
//               onChange={handleInputChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a product color.</Form.Control.Feedback>
//           </Form.Group> */}

//           {/* <Form.Group controlId="productColor">
//             <Form.Label>Color:</Form.Label>
//             <Form.Select
//               name="color"
//               value={newProduct.color}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="">Select a color</option>
//               <option value="black">Black</option>
//               <option value="red">Red</option>
//               <option value="white">White</option>
//               <option value="blue">Blue</option>
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">Please select a product color.</Form.Control.Feedback>
//           </Form.Group> */}

//           <Form.Group controlId="productColor">
//             <Form.Label><b>productColor:</b></Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter product color"
//               name="colors"
//               value={newProduct.colors}
//               onChange={handleInputChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a product name.</Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group controlId="productPrice">
//             <Form.Label><b>Base Price:</b></Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="Enter product price"
//               name="price"
//               value={newProduct.price}
//               onChange={handleInputChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a valid price.</Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group controlId="sellPrice">
//             <Form.Label><b>sellPrice:</b></Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="Enter product sellprice"
//               name="sellprice"
//               value={newProduct.sellprice}
//               onChange={handleInputChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a valid sellprice.</Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group controlId="productQuantity">
//             <Form.Label><b>No.of Stocks:</b></Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="Enter product No. of Stocks"
//               name="quantity"
//               value={newProduct.quantity}
//               onChange={handleInputChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a valid quantity.</Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group controlId="productImage">
//             <Form.Label><b>Upload Image:</b></Form.Label>
//             <Form.Control
//               type="file"
//               accept="image/*"
//               name="imageFile"
//               onChange={onFileChange}
//               required
//             />
//             {imageError && <p className="text-danger">{imageError}</p>}
//             {/* <Form.Control.Feedback type="invalid">{imageError && <p>{imageError}</p>}</Form.Control.Feedback> */}
//           </Form.Group>
//           <Button variant="primary" type="submit">
//             Add Product
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default AddProductModal;


/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const AddProductModal = ({ showModal, handleCloseModal, handleAddProduct, validated, newProduct, handleInputChange }) => {
  const [imageError, setImageError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const validateImage = (image) => {
    setImageError(null);

    if (!image.name.match(/\.(jpg|png|jpeg)$/)) {
      setImageError('Image type must be .jpg, .jpeg or .png.');
      return false;
    }

    if (image.size > 1000000) {
      setImageError('Image size must be less than 1MB.');
      return false;
    }

    return true;
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const isValid = validateImage(file);
      if (isValid) {
        handleInputChange(e);
      }
    }
  };

  useEffect(() => {
    // Fetch categories from API endpoint
    axios.get('http://13.201.255.228:8080/getallcategory')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

  }, []);

  const handleCategoryChange = async (categoryId) => {
    try {
      const response = await axios.get(`http://13.201.255.228:8080/subcategory/bycategory/${categoryId}`);
      setSubcategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleAddProduct}>
          <Form.Group controlId="categoryId">
            <Form.Label><b>Product Category :</b></Form.Label>
            <Form.Select
              as="select"
              name="categoryId"
              value={newProduct.categoryId}
              onChange={(e) => {
                handleInputChange(e);
                handleCategoryChange(e.target.value);
              }}
              required
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">Please select a product category.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="subcategoryId">
            <Form.Label><b>Product SubCategory :</b></Form.Label>
            <Form.Select
              as="select"
              name="subcategoryId"
              value={newProduct.subcategoryId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select subcategory</option>
              {subcategories.map(subcategory => (
                <option key={subcategory.subcatid} value={subcategory.subcatid}>{subcategory.name}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">Please select a product subcategory.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="productName">
            <Form.Label><b>Product Name:</b></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">Please enter a product name.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="BrandName">
            <Form.Label><b>Brand Name:</b></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product brandname"
              name="brandname"
              value={newProduct.brandname}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">Please enter a product brandname.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="productDescription">
            <Form.Label><b>Description:</b></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">Please enter a product description.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="productSize">
            <Form.Label><b>Size:</b></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product sizes (comma-separated)"
              name="sizes"
              value={newProduct.sizes}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">Please enter product sizes.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="productColor">
            <Form.Label><b>Color:</b></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product colors (comma-separated)"
              name="colors"
              value={newProduct.colors}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">Please enter product colors.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="productPrice">
            <Form.Label><b>Base Price:</b></Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">Please enter a valid price.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="sellPrice">
            <Form.Label><b>Sell Price:</b></Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product sell price"
              name="sellprice"
              value={newProduct.sellprice}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">Please enter a valid sell price.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="productQuantity">
            <Form.Label><b>No. of Stocks:</b></Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product quantity"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">Please enter a valid quantity.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="productImage">
            <Form.Label><b>Upload Image:</b></Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="imageFile"
              onChange={onFileChange}
              required
            />
            {imageError && <p className="text-danger">{imageError}</p>}
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Product
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;
