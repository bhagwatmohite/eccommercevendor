/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// /* eslint-disable no-undef */
// /* eslint-disable react/prop-types */
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Button, Form, Modal } from 'react-bootstrap';
// import useCategory from './useCategory';

// const EditProductModal = ({ showModal, handleCloseModal, handleUpdateProduct, product, validated, }) => {

//   const [formData, setFormData] = useState(product);

//   const { categories } = useCategory();

//   useEffect(() => {
//     setFormData(product);
//   }, [product]);

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle file input change
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({ ...formData, imageFile: file });
//   };

//   // Handle form submission
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     const { name, description, size, category, color, price, quantity, imageFile } = formData;

//   //     // Create a new object with the updated fields
//   //     const updatedProduct = {
//   //       id: product.id,
//   //       name,
//   //       brandname,
//   //       description,
//   //       size,
//   //       category,
//   //       color,
//   //       price: parseFloat(price),
//   //       quantity: parseInt(quantity),
//   //     };

//   //     // Create FormData to send to the server
//   //     const formDataToSend = new FormData();

//   //     // Append updated fields to FormData
//   //     for (const key in updatedProduct) {
//   //       formDataToSend.append(key, updatedProduct[key]);
//   //     }

//   //     // If there's a new image selected, append it to the FormData
//   //     if (imageFile) {
//   //       formDataToSend.append('imageFile', imageFile);
//   //     }

//   //     // Make the API request to update the product
//   //     const response = await axios.put(`http://localhost:8080/product/${product.id}`, formDataToSend, {
//   //       headers: {
//   //         'Content-Type': 'multipart/form-data',
//   //       },
//   //     });

//   //     console.log('Product updated successfully:', response.data);

//   //     // Call the parent handler to indicate successful update
//   //     handleUpdateProduct();
//   //     handleCloseModal(); // Close the modal after update
//   //   } catch (error) {
//   //     console.error('Error updating product:', error);
//   //   }
//   // };

//   const handleSubmit = async () => {

//     try {
//       const response = await axios.put(`http://localhost:8080/product/${product.id}`, formData);

//       console.log("print", formData);

//       if (response.status === 200) {
//         handleUpdateProduct(formData);
//         handleCloseModal();
//       }
//     } catch (error) {
//       console.log("error updating product:", error);
//     }

//   };

//   return (
//     <Modal show={showModal} onHide={handleCloseModal}>
//       <Modal.Header closeButton>
//         <Modal.Title>Edit Product</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form noValidate validated={validated} onSubmit={handleSubmit}>


//           <Form.Group controlId="categoryId">
//             <Form.Label>Product Category :</Form.Label>
//             <Form.Select
//               as="select"
//               name="categoryId"
//               value={formData.categoryId}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select category</option>
//               {categories.map(category => (
//                 <option key={category.id} value={category.id}>{category.name}</option>
//               ))}

//             </Form.Select>
//             <Form.Control.Feedback type="invalid">Please select a product category.</Form.Control.Feedback>
//           </Form.Group>

//           {/* <Form.Group controlId="CustomerId">
//             <Form.Label>Vendors Id</Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="Enter vendor id  name"
//               name="customerId"
//               value={formData.customerId}
//               onChange={handleChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a product name.</Form.Control.Feedback>
//           </Form.Group> */}

//           <Form.Group controlId="productName">
//             <Form.Label>Product Name</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter product name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a product name.</Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group controlId="brandName">
//             <Form.Label>Brand Name</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter product brandname"
//               name="brandname"
//               value={formData.brandname}
//               onChange={handleChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a product name.</Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group controlId="productDescription">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               placeholder="Enter product description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a product description.</Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group controlId="productSize">
//             <Form.Label>Size</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter product size"
//               name="size"
//               value={formData.size}
//               onChange={handleChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a product size.</Form.Control.Feedback>
//           </Form.Group>
//           {/* <Form.Group controlId="productCategory">
//             <Form.Label>Category</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter product category"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a product category.</Form.Control.Feedback>
//           </Form.Group> */}
//           <Form.Group controlId="productColor">
//             <Form.Label>Color</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter product color"
//               name="color"
//               value={formData.color}
//               onChange={handleChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a product color.</Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group controlId="productPrice">
//             <Form.Label>Base Price</Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="Enter product price"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a valid price.</Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group controlId="sellPrice">
//             <Form.Label>Sell Price</Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="Enter product price"
//               name="sellprice"
//               value={formData.sellprice}
//               onChange={handleChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a valid price.</Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group controlId="productQuantity">
//             <Form.Label>No.of Stocks</Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="Enter product quantity"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleChange}
//               required
//             />
//             <Form.Control.Feedback type="invalid">Please enter a valid quantity.</Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group controlId="productImage">
//             <Form.Label>Upload Image</Form.Label>
//             <Form.Control
//               type="file"
//               accept="image/*"
//               name="imageFile"
//               onChange={handleFileChange}
//             />
//           </Form.Group>
//           <Button variant="primary" type="submit">
//             Update Product
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default EditProductModal;



import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const EditProductModal = ({ showModal, handleCloseModal, handleUpdateProduct, product }) => {
  const [formData, setFormData] = useState({
    id: '',
    categoryId: '',
    name: '',
    brandname: '', // Assuming the backend property is 'brandName'
    description: '',
    sizes: '',
    colors: '',
    price: '',
    sellprice: '',
    quantity: '',
    imageUrl: '',
    imageFile: null,
    customerId: '',
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(null);


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


  useEffect(() => {
    setFormData({
      id: product.id,
      categoryId: product.categoryId || '',
      name: product.name || '',
      brandname: product.brandname || '', // Adjusted to match backend property name
      description: product.description || '',
      sizes: product.sizes ? product.sizes.join(', ') : '', // Convert array to comma-separated string
      colors: product.colors ? product.colors.join(', ') : '', // Convert array to comma-separated string
      price: product.price || '',
      sellprice: product.sellprice || '',
      quantity: product.quantity || '',
      imageUrl: product.imageUrl || '',
      imageFile: null,
      customerId: product.customerId || '',
    });

    setLoading(false);
  }, [product]);



  const onFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const isValid = validateImage(file);
      if (isValid) {
        handleChange(e);
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://13.201.255.228:8080/getallcategory');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setFormData({ ...formData, imageFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', formData.id);
      formDataToSend.append('categoryId', formData.categoryId);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('brandname', formData.brandname); // Adjusted to match backend property name
      formDataToSend.append('description', formData.description);
      formDataToSend.append('sizes', formData.sizes); // Send sizes as comma-separated string
      formDataToSend.append('colors', formData.colors); // Send colors as comma-separated string
      formDataToSend.append('price', formData.price);
      formDataToSend.append('sellprice', formData.sellprice);
      formDataToSend.append('quantity', formData.quantity);
      formDataToSend.append('customerId', formData.customerId);
      if (formData.imageFile) {
        formDataToSend.append('imageFile', formData.imageFile);
      }

      const response = await axios.put(`http://13.201.255.228:8080/product/${formData.id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Product updated successfully:', response.data);

      handleUpdateProduct(response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error updating product:', error.response);
      alert('Failed to update product. Please try again.');
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="categoryId">
              <Form.Label><b>Product Category :</b></Form.Label>
              <Form.Select name="categoryId" value={formData.categoryId} onChange={handleChange} required>
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label><b>Product Name :</b></Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="brandName">
              <Form.Label><b>Brand Name :</b></Form.Label>
              <Form.Control type="text" name="brandname" value={formData.brandname} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label><b>Description :</b></Form.Label>
              <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} rows={3} />
            </Form.Group>

            <Form.Group controlId="sizes">
              <Form.Label><b>Sizes :</b></Form.Label>
              <Form.Control type="text" name="sizes" value={formData.sizes} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="colors">
              <Form.Label><b>Colors :</b></Form.Label>
              <Form.Control type="text" name="colors" value={formData.colors} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label><b>Price :</b></Form.Label>
              <Form.Control type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="sellPrice">
              <Form.Label><b>Sell Price :</b></Form.Label>
              <Form.Control type="number" step="0.01" name="sellprice" value={formData.sellprice} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="quantity">
              <Form.Label><b>Quantity :</b></Form.Label>
              <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="imageFile">
              <Form.Label><b>Product Image :</b></Form.Label>
              <Form.Control type="file" name="imageFile" onChange={onFileChange} />
              <Form.Text className="text-muted">Upload a new product image </Form.Text>
              {imageError && <p className="text-danger">{imageError}</p>}
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Product
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;
