/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */


// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Button, Form, Modal } from 'react-bootstrap';

// const AddProductModal = ({ showModal, handleCloseModal, handleAddProduct, validated, newProduct, handleInputChange }) => {
//   const [imageError, setImageError] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   const validateImage = (image) => {
//     setImageError(null);

//     if (!image.name.match(/\.(jpg|png|jpeg)$/)) {
//       setImageError('Image type must be .jpg, .jpeg or .png.');
//       return false;
//     }

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
//         handleInputChange(e);
//       }
//     }
//   };

//   useEffect(() => {
//     // Fetch categories from API endpoint
//     axios.get('http://localhost:8080/getallcategory')
//       .then(response => {
//         setCategories(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching categories:', error);
//       });

//   }, []);

//   const handleCategoryChange = async (categoryId) => {
//     try {
//       const response = await axios.get(`http://localhost:8080/subcategory/bycategory/${categoryId}`);
//       setSubcategories(response.data);
//     } catch (error) {
//       console.error('Error fetching subcategories:', error);
//     }
//   };

//   return (
//     <Modal show={showModal} onHide={handleCloseModal}>
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
//               onChange={(e) => {
//                 handleInputChange(e);
//                 handleCategoryChange(e.target.value);
//               }}
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
//               <option value="">Select subcategory</option>
//               {subcategories.map(subcategory => (
//                 <option key={subcategory.subcatid} value={subcategory.subcatid}>{subcategory.name}</option>
//               ))}
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">Please select a product subcategory.</Form.Control.Feedback>
//           </Form.Group>

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
//             <Form.Control.Feedback type="invalid">Please enter a product brandname.</Form.Control.Feedback>
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

//           <Form.Group controlId="productSize">
//             <Form.Label><b>Size:</b></Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter product sizes (comma-separated)"
//               name="sizes"
//               value={newProduct.sizes}
//               onChange={handleInputChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter product sizes.</Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group controlId="productColor">
//             <Form.Label><b>Color:</b></Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter product colors (comma-separated)"
//               name="colors"
//               value={newProduct.colors}
//               onChange={handleInputChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter product colors.</Form.Control.Feedback>
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
//             <Form.Label><b>Sell Price:</b></Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="Enter product sell price"
//               name="sellprice"
//               value={newProduct.sellprice}
//               onChange={handleInputChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a valid sell price.</Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group controlId="productQuantity">
//             <Form.Label><b>No. of Stocks:</b></Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="Enter product quantity"
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







// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Button, Form, Modal } from 'react-bootstrap';

// const AddProductModal = ({
//   showModal,
//   handleCloseModal,
//   handleAddProduct,
//   validated,
//   newProduct,
//   handleInputChange
// }) => {
//   const [imageError, setImageError] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [sizes, setSizes] = useState([]);
//   const [sizeInput, setSizeInput] = useState('');
//   const [colorInput, setColorInput] = useState('');
//   const [quantityInput, setQuantityInput] = useState('');

//   const [currentSize, setCurrentSize] = useState('');
//   const [currentColorImages, setCurrentColorImages] = useState({});
//   // Fetch categories from API endpoint
//   useEffect(() => {
//     axios.get('http://localhost:8080/getallcategory')
//       .then(response => {
//         setCategories(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching categories:', error);
//       });
//   }, []);

//   // Fetch subcategories based on the selected category
//   const handleCategoryChange = async (categoryId) => {
//     try {
//       const response = await axios.get(`http://localhost:8080/subcategory/bycategory/${categoryId}`);
//       setSubcategories(response.data);
//     } catch (error) {
//       console.error('Error fetching subcategories:', error);
//     }
//   };

//   // Add a new size
//   const addSize = () => {
//     if (sizeInput) {
//       // Check if the size already exists
//       const existingSize = sizes.find(size => size.size === sizeInput);
//       if (!existingSize) {
//         setSizes([...sizes, { size: sizeInput, colors: [] }]);
//       }
//       setCurrentSize(sizeInput);
//       setSizeInput('');
//     } else {
//       alert('Please enter a size.');
//     }
//   };



//   // Log the product data instead of sending it to the backend
//   const handleAddProductWithSizes = (e) => {
//     e.preventDefault();
//     const productData = {
//       ...newProduct,
//       sizes
//     };

//     // Log the product data to the console
//     console.log('Product Data:', productData);

//     // Optionally, you could also log the errors and other state


//     // Clear the form data
//     setSizes([]);

//     setCurrentColorImages({});
//     handleCloseModal();  // Close the modal
//   };

//   return (
//     <Modal show={showModal} onHide={handleCloseModal} centered>
//       <Modal.Header closeButton >
//         <Modal.Title>Add New Product</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form noValidate validated={validated} onSubmit={handleAddProductWithSizes}>
//           <Form.Group controlId="categoryId">
//             <Form.Label><b>Product Category :</b></Form.Label>
//             <Form.Select
//               as="select"
//               name="categoryId"
//               value={newProduct.categoryId}
//               onChange={(e) => {
//                 handleInputChange(e);
//                 handleCategoryChange(e.target.value);
//               }}
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
//               <option value="">Select subcategory</option>
//               {subcategories.map(subcategory => (
//                 <option key={subcategory.subcatid} value={subcategory.subcatid}>{subcategory.name}</option>
//               ))}
//             </Form.Select>
//             <Form.Control.Feedback type="invalid">Please select a product subcategory.</Form.Control.Feedback>
//           </Form.Group>

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
//             <Form.Control.Feedback type="invalid">Please enter a product brandname.</Form.Control.Feedback>
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
//             <Form.Label><b>Sell Price:</b></Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="Enter product sell price"
//               name="sellprice"
//               value={newProduct.sellprice}
//               onChange={handleInputChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a valid sell price.</Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group controlId="productQuantity">
//             <Form.Label><b>No. of Stocks:</b></Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="Enter product quantity"
//               name="quantity"
//               value={newProduct.quantity}
//               onChange={handleInputChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a valid quantity.</Form.Control.Feedback>
//           </Form.Group>



//           <div className="text-center">
//             <Button
//               variant="secondary"
//               type="submit"
//               disabled={!newProduct.categoryId || !newProduct.subcategoryId || !newProduct.name || !newProduct.brandname || !newProduct.description || !newProduct.price || !newProduct.sellprice || !newProduct.quantity}
//             >
//               Add Product
//             </Button>
//           </div>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default AddProductModal;


import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const AddProductModal = ({
  showModal,
  handleCloseModal,
  handleAddProduct,
  validated,
  newProduct,
  handleInputChange
}) => {
  const [imageError, setImageError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sizeInput, setSizeInput] = useState('');
  const [colorInput, setColorInput] = useState('');
  const [quantityInput, setQuantityInput] = useState('');

  // Fetch categories from API endpoint
  useEffect(() => {
    axios.get('http://localhost:8080/getallcategory')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Fetch subcategories based on the selected category
  const handleCategoryChange = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:8080/subcategory/bycategory/${categoryId}`);
      setSubcategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  // Add a new size
  const addSize = () => {
    if (sizeInput) {
      // Check if the size already exists
      const existingSize = sizes.find(size => size.size === sizeInput);
      if (!existingSize) {
        setSizes([...sizes, { size: sizeInput, colors: [] }]);
      }
      setSizeInput('');
    } else {
      alert('Please enter a size.');
    }
  };

  // Handle adding the product with sizes
  const handleAddProductWithSizes = (e) => {
    e.preventDefault();
    const productData = {
      ...newProduct,
      sizes
    };

    // Log the product data to the console
    console.log('Product Data:', productData);

    // Call the handleAddProduct function to post product data to the backend
    handleAddProduct(productData);

    // Clear the form data
    setSizes([]);
    handleCloseModal();  // Close the modal
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleAddProductWithSizes}>
          <Form.Group controlId="categoryId">
            <Form.Label><b>Product Category :</b></Form.Label>
            <Form.Select
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

          <div className="text-center">
            <Button
              variant="secondary"
              type="submit"
              disabled={!newProduct.categoryId || !newProduct.subcategoryId || !newProduct.name || !newProduct.brandname || !newProduct.description || !newProduct.price || !newProduct.sellprice || !newProduct.quantity}
            >
              Add Product
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;
