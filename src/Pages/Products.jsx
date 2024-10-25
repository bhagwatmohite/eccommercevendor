/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/exhaustive-deps */
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Button, Pagination, Table } from 'react-bootstrap';
// import { BsPencilSquare, BsTrash } from 'react-icons/bs';
// import useCustomHook from '../Components/useCustomHook';
// import AddProductModal from './AddProductModal';
// import EditProductModal from './EditProductModal';

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [validated, setValidated] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);

//   //custome hooks
//   const { id } = useCustomHook();

//   const [newProduct, setNewProduct] = useState({
//     name: '',
//     imageFile: null,
//     description: '',
//     price: '',
//     quantity: '',
//     sizes: '',
//     category: '',
//     colors: '',
//     brandname: '',
//     sellprice: '',
//     categoryId: '',
//     customerId: '',
//     subcategoryId: '',
//   });

//   const fetchProductsForCustomer = async (customerId) => {
//     try {
//       const response = await axios.get(`http://localhost:8080/customer/${customerId}`);
//       setProducts(response.data.products);
//       // console.log(response.data.products);
//     } catch (error) {
//       console.error('Error fetching products for customer:', error);
//     }
//   };

//   const fetchCustomerIdAndProducts = async () => {
//     try {
//       const email = localStorage.getItem('email');
//       if (!email) {
//         console.error('No email found in local storage');
//         return;
//       }

//       const response = await axios.get('http://localhost:8080/allcustomer');
//       const customers = response.data;
//       const customer = customers.find(c => c.email === email);

//       if (!customer) {
//         console.error('No matching customer found');
//         return;
//       }

//       fetchProductsForCustomer(customer.id); // Fetch products specific to the customer
//     } catch (error) {
//       console.error('Error fetching customer details:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCustomerIdAndProducts();
//   }, []);

//   const handleShowModal = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setShowEditModal(false);
//     setValidated(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === 'imageFile' && files.length > 0) {
//       const file = files[0];
//       setNewProduct((prevProduct) => ({
//         ...prevProduct,
//         imageFile: file,
//       }));
//     } else {
//       setNewProduct((prevProduct) => ({
//         ...prevProduct,
//         [name]: value,
//       }));
//     }
//   };

//   const handleAddProduct = async (event) => {
//     event.preventDefault();
//     setValidated(true);

//     try {
//       const formData = new FormData();
//       formData.append('name', newProduct.name);
//       formData.append('brandname', newProduct.brandname);
//       formData.append('description', newProduct.description);
//       formData.append('sizes', newProduct.sizes);
//       formData.append('colors', newProduct.colors);
//       // const colors = Array.isArray(newProduct.colors) ? newProduct.colors : [];
//       // formData.append('colors', colors.join(',')); // Join colors array into a comma-separated string

//       formData.append('category', newProduct.category);
//       formData.append('quantity', newProduct.quantity);
//       formData.append('categoryId', newProduct.categoryId);
//       formData.append('customerId', id);
//       formData.append('price', newProduct.price);
//       formData.append('sellprice', newProduct.sellprice);
//       formData.append('subcategoryId', newProduct.subcategoryId);

//       if (newProduct.imageFile) {
//         formData.append('imageFile', newProduct.imageFile);
//       }

//       const res = await axios.post('http://localhost:8080/product', formData);

//       // console.log('New Product added successfully:', response.data);
//       // console.log("formdata ", response.data);
//       resetForm();
//       setShowModal(false);
//       fetchCustomerIdAndProducts(); // Fetch products again after adding
//       console.log("addd data ", res.data);
//     } catch (error) {
//       console.error('Error adding product:', error);
//     }
//   };


//   const resetForm = () => {
//     setNewProduct({
//       name: '',
//       imageFile: null,
//       description: '',
//       price: '',
//       quantity: '',
//       sizes: '',
//       category: '',
//       colors: '',
//       brandname: '',
//       sellprice: '',
//       categoryId: '',
//       customerId: '',
//       subcategoryId: ''
//     });
//   };

//   const handleEdit = (product) => {
//     setSelectedProduct(product);
//     setShowEditModal(true);
//   };

//   const handleDelete = async (productId) => {
//     try {
//       await axios.delete(`http://localhost:8080/product/${productId}`);
//       alert(`Product with ID ${productId} deleted successfully.`);
//       fetchCustomerIdAndProducts(); // Fetch products again after deleting
//     } catch (error) {
//       alert(`Error deleting product with ID ${productId}:`, error);
//     }
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

//   const handleUpdateProduct = (updatedProduct) => {
//     const updatedData = products.map((product) =>
//       product.id === updatedProduct.id ? updatedProduct : product

//     );
//     setProducts(updatedData);

//   };

//   return (
//     <>
//       <div style={{ marginRight: '30px', padding: '20px', }}>
//         <h1 className="text-center p-3 mb-4 bg-secondary text-white fw-bold" style={{ borderRadius: '15px' }}>All Products Here</h1>
//         <div className="d-flex justify-content-end p-3">
//           <Button type="button" className="btn btn-dark btn-lg" onClick={handleShowModal}>
//             Add Product
//           </Button>
//         </div>
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>Name</th>
//               <th>Brand Name</th>
//               <th>Description</th>
//               <th>Size</th>
//               <th>Color</th>
//               <th>Base Price</th>
//               <th>Sell Price</th>
//               <th>Profit</th>
//               <th>No. of Stocks</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((product) => (
//               <tr key={product.id}>
//                 <td>
//                   {product.imageUrl && (
//                     <img
//                       src={`http://localhost:8080/uploads/${product.imageUrl}`}
//                       alt={product.name}
//                       className="img-thumbnail rounded-circle"
//                       style={{
//                         width: "60px",
//                         height: "60px",
//                         objectFit: "contain",
//                       }}
//                     />
//                   )}
//                 </td>
//                 <td>{product.name}</td>
//                 <td>{product.brandname}</td>
//                 <td>{product.description}</td>
//                 <td>{product.sizes.join(', ')}</td>
//                 <td>{product.colors.join(', ')}</td>
//                 <td>₹ {product.price}</td>
//                 <td>₹ {product.sellprice}</td>
//                 <td>₹ {product.price - product.sellprice}</td>
//                 <td>{product.quantity}</td>
//                 <td>
//                   <BsPencilSquare className="action-icon text-primary me-2" onClick={() => handleEdit(product)} />
//                   <BsTrash className="action-icon text-danger" onClick={() => handleDelete(product.id)} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//         <div className="mt-4 d-flex justify-content-end" style={{ marginRight: '70px' }}>
//           <Pagination>
//             <Pagination.Prev
//               onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
//               disabled={currentPage === 1}
//             />
//             <Pagination.Next
//               onClick={() => setCurrentPage(currentPage < Math.ceil(products.length / itemsPerPage) ? currentPage + 1 : currentPage)}
//               disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
//             />
//           </Pagination>
//         </div>
//         <AddProductModal
//           showModal={showModal}
//           handleCloseModal={handleCloseModal}
//           handleAddProduct={handleAddProduct}
//           validated={validated}
//           newProduct={newProduct}
//           handleInputChange={handleInputChange}
//         />


//         {selectedProduct && (
//           <EditProductModal
//             showModal={showEditModal}
//             handleCloseModal={handleCloseModal}

//             handleUpdateProduct={handleUpdateProduct}
//             validated={validated}
//             product={selectedProduct}
//             handleInputChange={handleInputChange}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default Products;




// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Button, Table } from 'react-bootstrap';
// import AddProductModal from './AddProductModal';

// const Products = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [validated, setValidated] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [sizes, setSizes] = useState([]);  // Initialize sizes array
//   const [newProduct, setNewProduct] = useState({
//     categoryId: '',
//     subcategoryId: '',
//     name: '',
//     brandname: '',
//     description: '',
//     price: '',
//     sellprice: '',
//     quantity: '',
//     sizes: []
//   });

//   // Fetch products from the API
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/allproduct');
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   // Fetch sizes from the API
//   const fetchSizes = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/getallsizes');
//       setSizes(response.data);
//     } catch (error) {
//       console.error('Error fetching sizes:', error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchSizes();  // Fetch sizes when the component mounts
//   }, []);

//   // Show the AddProductModal
//   const handleShowModal = () => setShowModal(true);
//   const handleCloseModal = () => setShowModal(false);

//   // Handle input changes for new product
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]: value,
//     }));
//   };

//   // Handle adding a product
//   const handleAddProduct = async (productData) => {
//     try {
//       const formData = new FormData();
//       formData.append('categoryId', productData.categoryId);
//       formData.append('customerId', 1);  // Replace with actual customerId
//       formData.append('product', new Blob([JSON.stringify({
//         name: productData.name,
//         brandname: productData.brandname,
//         description: productData.description,
//         price: productData.price,
//         sellprice: productData.sellprice,
//         quantity: productData.quantity,
//         sizes: productData.sizes,
//       })], { type: 'application/json' }));

//       await axios.post('http://localhost:8080/product', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       fetchProducts();
//       handleCloseModal();
//     } catch (error) {
//       console.error('Error adding product:', error);
//     }
//   };

//   return (
//     <div>
//       <br />
//       <Button onClick={handleShowModal}>Add New Product</Button>
//       <br />
//       <br />
//       <AddProductModal
//         showModal={showModal}
//         handleCloseModal={handleCloseModal}
//         handleAddProduct={handleAddProduct}
//         validated={validated}
//         newProduct={newProduct}
//         handleInputChange={handleInputChange}
//         sizes={sizes}  // Pass the fetched sizes to the modal
//       />
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Product ID</th>
//             <th>Product Name</th>
//             <th>Brand</th>
//             <th>Description</th>
//             <th>Category</th>
//             <th>SubCategory</th>
//             <th>Price</th>
//             <th>Sell Price</th>
//             <th>Stock</th>
//             <th>Sizes</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td>{product.id}</td>
//               <td>{product.name}</td>
//               <td>{product.brandname}</td>
//               <td>{product.description}</td>
//               <td>{product.categoryName}</td>
//               <td>{product.subcategoryName}</td>
//               <td>{product.price}</td>
//               <td>{product.sellprice}</td>
//               <td>{product.quantity}</td>
//               <td>
//                 {/* <Details for sizes and colors */}
//                 <div>
//                   {product.sizes && product.sizes.length > 0 ? (
//                     product.sizes.map((size, sizeIndex) => (
//                       <div key={sizeIndex}>
//                         <b>Size: {size.size}</b>
//                         <ul>
//                           {size.colors && size.colors.length > 0 ? (
//                             size.colors.map((color, colorIndex) => (
//                               <li key={colorIndex}>
//                                 <b>Color: {color.color}</b> - Quantity: {color.quantity}
//                                 <br />
//                                 {color.images && color.images.length > 0 && (
//                                   <div>
//                                     <h6>Uploaded Images:</h6>
//                                     {color.images.map((image, imgIndex) => (
//                                       <img
//                                         key={imgIndex}
//                                         src={image}
//                                         alt={`Image ${imgIndex + 1}`}
//                                         style={{ width: '100px', height: '100px', marginRight: '5px' }}
//                                       />
//                                     ))}
//                                   </div>
//                                 )}
//                               </li>
//                             ))
//                           ) : (
//                             <li>No colors available</li>
//                           )}
//                         </ul>
//                       </div>
//                     ))
//                   ) : (
//                     <p>No sizes available</p>
//                   )}
//                 </div>
//               </td>
//               <td>
//                 <Button
//                   onClick={() => setProductToEdit(product)}
//                   variant="warning"
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   onClick={() => setProductToEdit(product)}
//                   variant="success"
//                   className="ms-2"
//                 >
//                   Add
//                 </Button>
//                 <Button
//                   onClick={async () => {
//                     try {
//                       await axios.delete(`http://localhost:8080/deleteproduct/${product.id}`);
//                       fetchProducts();
//                     } catch (error) {
//                       console.error('Error deleting product:', error);
//                     }
//                   }}
//                   variant="danger"
//                   className="ms-2"
//                 >
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default Products;




// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Button, Table } from 'react-bootstrap';
// import AddProductModal from './AddProductModal';
// import AddSizeModal from './AddSizeModal';

// const Products = () => {
//   const [showProductModal, setShowProductModal] = useState(false);
//   const [showSizeModal, setShowSizeModal] = useState(false);
//   const [validated, setValidated] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     categoryId: '',
//     subcategoryId: '',
//     name: '',
//     brandname: '',
//     description: '',
//     price: '',
//     sellprice: '',
//     quantity: '',
//     sizes: []
//   });
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [newSize, setNewSize] = useState('');

//   // Fetch products from the API
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/allproduct');
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Show the AddProductModal
//   const handleShowProductModal = () => setShowProductModal(true);
//   const handleCloseProductModal = () => setShowProductModal(false);

//   // Show the AddSizeModal
//   const handleShowSizeModal = (product) => {
//     setSelectedProduct(product);
//     setShowSizeModal(true);
//   };
//   const handleCloseSizeModal = () => setShowSizeModal(false);

//   // Handle input changes for new product
//   const handleProductInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]: value,
//     }));
//   };

//   // Handle adding a product
//   const handleAddProduct = async (productData) => {
//     try {
//       await axios.post('http://localhost:8080/product', productData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       fetchProducts();
//       handleCloseProductModal();
//     } catch (error) {
//       console.error('Error adding product:', error);
//     }
//   };

//   // Handle adding a size to a product
//   const handleAddSize = async () => {
//     if (!selectedProduct || !newSize) return;

//     try {
//       await axios.post('http://localhost:8080/addsize', null, {
//         params: { size: newSize },
//       });
//       fetchProducts();
//       handleCloseSizeModal();
//     } catch (error) {
//       console.error('Error adding size:', error);
//     }
//   };

//   return (
//     <div>
//       <br />
//       <Button onClick={handleShowProductModal}>Add New Product</Button>
//       <br />
//       <br />
//       <AddProductModal
//         showModal={showProductModal}
//         handleCloseModal={handleCloseProductModal}
//         handleAddProduct={handleAddProduct}
//         validated={validated}
//         newProduct={newProduct}
//         handleInputChange={handleProductInputChange}
//       />
//       <AddSizeModal
//         showModal={showSizeModal}
//         handleCloseModal={handleCloseSizeModal}
//         handleAddSize={handleAddSize}
//         newSize={newSize}
//         setNewSize={setNewSize}
//       />
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Product ID</th>
//             <th>Product Name</th>
//             <th>Brand</th>
//             <th>Description</th>
//             {/* <th>Category</th>
//             <th>SubCategory</th> */}
//             <th>Price</th>
//             <th>Sell Price</th>
//             <th>Stock</th>
//             <th>Sizes</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td>{product.id}</td>
//               <td>{product.name}</td>
//               <td>{product.brandname}</td>
//               <td>{product.description}</td>
//               {/* <td>{product.categoryName}</td>
//               <td>{product.subcategoryName}</td> */}
//               <td>{product.price}</td>
//               <td>{product.sellprice}</td>
//               <td>{product.quantity}</td>
//               <td>
//                 <ul>
//                   {(product.sizes || []).map((size, index) => (
//                     <li key={index}>
//                       <b>Size: {size.size}</b>
//                       <ul>
//                         {(size.colors || []).map((color, colorIndex) => (
//                           <li key={colorIndex}>
//                             <b>Color: {color.color}</b> - Quantity: {color.quantity}
//                             <br />
//                             {color.images && (
//                               <div>
//                                 <h6>Uploaded Images:</h6>
//                                 {(color.images || []).map((image, imgIndex) => (
//                                   <img
//                                     key={imgIndex}
//                                     src={image}
//                                     alt={`Image ${imgIndex + 1}`}
//                                     style={{ width: '100px', height: '100px', marginRight: '5px' }}
//                                   />
//                                 ))}
//                               </div>
//                             )}
//                           </li>
//                         ))}
//                       </ul>
//                     </li>
//                   ))}
//                 </ul>
//                 <Button
//                   onClick={() => handleShowSizeModal(product)}
//                   variant="success"
//                 >
//                   Add Size
//                 </Button>
//               </td>
//               <td>
//                 <Button
//                   onClick={() => setSelectedProduct(product)}
//                   variant="warning"
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   onClick={async () => {
//                     try {
//                       await axios.delete(`http://localhost:8080/deleteproduct/${product.id}`);
//                       fetchProducts();
//                     } catch (error) {
//                       console.error('Error deleting product:', error);
//                     }
//                   }}
//                   variant="danger"
//                   className="ms-2"
//                 >
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default Products;


// for new changes 

// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Button, Table } from 'react-bootstrap';
// import AddProductModal from './AddProductModal';
// import AddSizeModal from './AddSizeModal';

// const Products = () => {
//   const [showProductModal, setShowProductModal] = useState(false);
//   const [showSizeModal, setShowSizeModal] = useState(false);
//   const [validated, setValidated] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     categoryId: '',
//     subcategoryId: '',
//     name: '',
//     brandname: '',
//     description: '',
//     price: '',
//     sellprice: '',
//     quantity: '',
//     sizes: [],
//     customerId: '', // Add customerId here
//   });
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [newSize, setNewSize] = useState('');

//   // Function to fetch the customer ID from local storage or any other source
//   const fetchCustomerId = async () => {
//     const email = localStorage.getItem('email');
//     if (!email) {
//       console.error('No email found in local storage');
//       return null;
//     }

//     try {
//       const response = await axios.get('http://localhost:8080/allcustomer');
//       const customers = response.data;
//       const customer = customers.find(c => c.email === email);
//       return customer ? customer.id : null; // Return the customer ID
//     } catch (error) {
//       console.error('Error fetching customer details:', error);
//       return null;
//     }
//   };

//   // Fetch products for a specific customer
//   const fetchProductsForCustomer = async (customerId) => {
//     try {
//       const response = await axios.get(`http://localhost:8080/customer/${customerId}`);
//       setProducts(response.data.products);
//     } catch (error) {
//       console.error('Error fetching products for customer:', error);
//     }
//   };

//   // Fetch products when component mounts
//   useEffect(() => {
//     const loadProducts = async () => {
//       const customerId = await fetchCustomerId();
//       if (customerId) {
//         fetchProductsForCustomer(customerId); // Fetch products for the customer
//       }
//     };
//     loadProducts();
//   }, []);

//   // Show the AddProductModal
//   const handleShowProductModal = () => setShowProductModal(true);
//   const handleCloseProductModal = () => setShowProductModal(false);

//   // Show the AddSizeModal
//   const handleShowSizeModal = (product) => {
//     setSelectedProduct(product);
//     setShowSizeModal(true);
//   };
//   const handleCloseSizeModal = () => setShowSizeModal(false);

//   // Handle input changes for new product
//   const handleProductInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]: value,
//     }));
//   };

//   // Handle adding a product
//   const handleAddProduct = async (productData) => {
//     try {
//       const customerId = await fetchCustomerId(); // Fetch customer ID again
//       if (customerId) {
//         const formData = new FormData();
//         formData.append('name', productData.name);
//         formData.append('brandname', productData.brandname);
//         formData.append('description', productData.description);
//         formData.append('price', productData.price);
//         formData.append('sellprice', productData.sellprice);
//         formData.append('quantity', productData.quantity);
//         formData.append('categoryId', productData.categoryId);
//         formData.append('subcategoryId', productData.subcategoryId);
//         formData.append('customerId', customerId); // Add customer ID to form data

//         await axios.post('http://localhost:8080/product', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         fetchProductsForCustomer(customerId); // Refresh products after adding
//         handleCloseProductModal();
//       }
//     } catch (error) {
//       console.error('Error adding product:', error);
//     }
//   };

//   // Handle adding a size to a product
//   const handleAddSize = async () => {
//     if (!selectedProduct || !newSize) return;

//     try {
//       await axios.post('http://localhost:8080/addsize', null, {
//         params: { size: newSize },
//       });
//       fetchProducts(); // You may want to fetch the specific customer's products here
//       handleCloseSizeModal();
//     } catch (error) {
//       console.error('Error adding size:', error);
//     }
//   };

//   const handleViewProduct = (product) => {
//     setSelectedProduct(product);
//   };

//   const handleBackToProducts = () => {
//     setSelectedProduct(null); // Reset selected product to go back to the product list
//   };

//   return (
//     <div>
//       <br />
//       <Button onClick={handleShowProductModal}>Add New Product</Button>
//       <br />
//       <br />
//       <AddProductModal
//         showModal={showProductModal}
//         handleCloseModal={handleCloseProductModal}
//         handleAddProduct={handleAddProduct}
//         validated={validated}
//         newProduct={newProduct}
//         handleInputChange={handleProductInputChange}
//       />
//       <AddSizeModal
//         showModal={showSizeModal}
//         handleCloseModal={handleCloseSizeModal}
//         handleAddSize={handleAddSize}
//         newSize={newSize}
//         setNewSize={setNewSize}
//       />
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Product ID</th>
//             <th>Product Name</th>
//             <th>Brand</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Sell Price</th>
//             <th>Stock</th>
//             <th>Sizes</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td>{product.id}</td>
//               <td>{product.name}</td>
//               <td>{product.brandname}</td>
//               <td>{product.description}</td>
//               <td>{product.price}</td>
//               <td>{product.sellprice}</td>
//               <td>{product.quantity}</td>
//               <td>
//                 <ul>
//                   {(product.sizes || []).map((size, index) => (
//                     <li key={index}>
//                       <b>Size: {size.size}</b>
//                       <ul>
//                         {(size.colors || []).map((color, colorIndex) => (
//                           <li key={colorIndex}>
//                             <b>Color: {color.color}</b> - Quantity: {color.quantity}
//                             <br />
//                             {color.images && (
//                               <div>
//                                 <h6>Uploaded Images:</h6>
//                                 {(color.images || []).map((image, imgIndex) => (
//                                   <img
//                                     key={imgIndex}
//                                     src={image}
//                                     alt={`Image ${imgIndex + 1}`}
//                                     style={{ width: '100px', height: '100px', marginRight: '5px' }}
//                                   />
//                                 ))}
//                               </div>
//                             )}
//                           </li>
//                         ))}
//                       </ul>
//                     </li>
//                   ))}
//                 </ul>
//                 <Button
//                   onClick={() => handleShowSizeModal(product)}
//                   variant="success"
//                 >
//                   Add Size
//                 </Button>
//               </td>
//               <td>
//                 <Button
//                   onClick={() => setSelectedProduct(product)}
//                   variant="warning"
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   onClick={async () => {
//                     try {
//                       await axios.delete(`http://localhost:8080/deleteproduct/${product.id}`);
//                       fetchProducts(); // Consider fetching customer products here as well
//                     } catch (error) {
//                       console.error('Error deleting product:', error);
//                     }
//                   }}
//                   variant="danger"
//                   className="ms-2"
//                 >
//                   Delete
//                 </Button>

//                 <Button
//                   // onClick={() => setSelectedProduct(product)}
//                   // variant="warning"
//                   onClick={() => handleViewProduct(product)}
//                 >
//                   View
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default Products;


import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';

import AddProductModal from './AddProductModal';
import AddSizeModal from './AddSizeModal';
import ViewDetails from './ViewDeails';

const Products = () => {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    categoryId: '',
    subcategoryId: '',
    name: '',
    brandname: '',
    description: '',
    price: '',
    sellprice: '',
    quantity: '',
    sizes: [],
    customerId: '', // Add customerId here
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newSize, setNewSize] = useState('');

  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');

  // Show/Close Description Modal
  const handleShowDescriptionModal = (description) => {
    setSelectedDescription(description);
    setShowDescriptionModal(true);
  };
  const handleCloseDescriptionModal = () => setShowDescriptionModal(false);

  // Function to fetch the customer ID from local storage or any other source
  const fetchCustomerId = async () => {
    const email = localStorage.getItem('email');
    if (!email) {
      console.error('No email found in local storage');
      return null;
    }

    try {
      const response = await axios.get('http://localhost:8080/allcustomer');
      const customers = response.data;
      const customer = customers.find(c => c.email === email);
      return customer ? customer.id : null; // Return the customer ID
    } catch (error) {
      console.error('Error fetching customer details:', error);
      return null;
    }
  };

  // Fetch products for a specific customer
  const fetchProductsForCustomer = async (customerId) => {
    try {
      const response = await axios.get(`http://localhost:8080/customer/${customerId}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products for customer:', error);
    }
  };

  // Fetch products when component mounts
  useEffect(() => {
    const loadProducts = async () => {
      const customerId = await fetchCustomerId();
      if (customerId) {
        fetchProductsForCustomer(customerId); // Fetch products for the customer
      }
    };
    loadProducts();
  }, []);

  // Show the AddProductModal
  const handleShowProductModal = () => setShowProductModal(true);
  const handleCloseProductModal = () => setShowProductModal(false);

  // Show the AddSizeModal
  const handleShowSizeModal = (product) => {
    setSelectedProduct(product);
    setShowSizeModal(true);
  };
  const handleCloseSizeModal = () => setShowSizeModal(false);

  // Handle input changes for new product
  const handleProductInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle adding a product
  const handleAddProduct = async (productData) => {
    try {
      const customerId = await fetchCustomerId(); // Fetch customer ID again
      if (customerId) {
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('brandname', productData.brandname);
        formData.append('description', productData.description);
        formData.append('price', productData.price);
        formData.append('sellprice', productData.sellprice);
        formData.append('quantity', productData.quantity);
        formData.append('categoryId', productData.categoryId);
        formData.append('subcategoryId', productData.subcategoryId);
        formData.append('customerId', customerId); // Add customer ID to form data

        await axios.post('http://localhost:8080/product', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        fetchProductsForCustomer(customerId); // Refresh products after adding
        handleCloseProductModal();
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Handle adding a size to a product
  const handleAddSize = async () => {
    if (!selectedProduct || !newSize) return;

    try {
      await axios.post('http://localhost:8080/addsize', null, {
        params: { size: newSize },
      });
      fetchProductsForCustomer(selectedProduct.customerId); // Fetch updated products
      handleCloseSizeModal();
    } catch (error) {
      console.error('Error adding size:', error);
    }
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null); // Reset selected product to go back to the product list
  };

  // Utility function to truncate description
  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <div>
      <br />
      <Button onClick={handleShowProductModal}>Add New Product</Button>
      <br />
      <br />
      <AddProductModal
        showModal={showProductModal}
        handleCloseModal={handleCloseProductModal}
        handleAddProduct={handleAddProduct}
        validated={validated}
        newProduct={newProduct}
        handleInputChange={handleProductInputChange}
      />
      <AddSizeModal
        showModal={showSizeModal}
        handleCloseModal={handleCloseSizeModal}
        handleAddSize={handleAddSize}
        newSize={newSize}
        setNewSize={setNewSize}
      />

      {/* Conditionally render ViewDetails component or product table */}
      {selectedProduct ? (
        <ViewDetails product={selectedProduct} onBack={handleBackToProducts} />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Brand</th>
              <th>Description</th>
              <th>Price</th>
              <th>Sell Price</th>
              <th>Stock</th>
              {/* <th>Sizes</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.brandname}</td>
                <td onClick={() => handleShowDescriptionModal(product.description)} style={{ cursor: 'pointer' }}>
                  {truncateText(product.description, 30)} {/* Show truncated description */}
                </td>
                <td>{product.price}</td>
                <td>{product.sellprice}</td>
                <td>{product.quantity}</td>
                {/* <td>
                  <ul>
                    {(product.sizes || []).map((size, index) => (
                      <li key={index}>
                        <b>Size: {size.size}</b>
                        <ul>
                          {(size.colors || []).map((color, colorIndex) => (
                            <li key={colorIndex}>
                              <b>Color: {color.color}</b> - Quantity: {color.quantity}
                              <br />
                              {color.images && (
                                <div>
                                  <h6>Uploaded Images:</h6>
                                  {(color.images || []).map((image, imgIndex) => (
                                    <img
                                      key={imgIndex}
                                      src={`http://localhost:8080/ColorImages/${image}`}
                                      alt={`Image ${imgIndex + 1}`}
                                      style={{ width: '100px', height: '100px', marginRight: '5px' }}
                                    />
                                  ))}
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handleShowSizeModal(product)}
                    variant="success"
                  >
                    Add Size
                  </Button>
                </td> */}
                <td>
                  <Button
                    onClick={() => setSelectedProduct(product)}
                    variant="warning"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={async () => {
                      try {
                        await axios.delete(`http://localhost:8080/deleteproduct/${product.id}`);
                        fetchProductsForCustomer(product.customerId); // Fetch updated customer products
                      } catch (error) {
                        console.error('Error deleting product:', error);
                      }
                    }}
                    variant="danger"
                    className="ms-2"
                  >
                    Delete
                  </Button>

                  <Button
                    onClick={() => handleViewProduct(product)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}


      {/* Modal to show full description */}
      <Modal show={showDescriptionModal} onHide={handleCloseDescriptionModal}>
        <Modal.Header closeButton>
          <Modal.Title>Product Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedDescription}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDescriptionModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;
