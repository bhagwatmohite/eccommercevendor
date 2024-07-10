/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Pagination, Table } from 'react-bootstrap';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import useCustomHook from '../Components/useCustomHook';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  //custome hooks
  const { id } = useCustomHook();

  const [newProduct, setNewProduct] = useState({
    name: '',
    imageFile: null,
    description: '',
    price: '',
    quantity: '',
    sizes: '',
    category: '',
    colors: '',
    brandname: '',
    sellprice: '',
    categoryId: '',
    customerId: '',
    subcategoryId: '',
  });

  const fetchProductsForCustomer = async (customerId) => {
    try {
      const response = await axios.get(`http://13.201.255.228:8080/customer/${customerId}`);
      setProducts(response.data.products);
      // console.log(response.data.products);
    } catch (error) {
      console.error('Error fetching products for customer:', error);
    }
  };

  const fetchCustomerIdAndProducts = async () => {
    try {
      const email = localStorage.getItem('email');
      if (!email) {
        console.error('No email found in local storage');
        return;
      }

      const response = await axios.get('http://13.201.255.228:8080/allcustomer');
      const customers = response.data;
      const customer = customers.find(c => c.email === email);

      if (!customer) {
        console.error('No matching customer found');
        return;
      }

      fetchProductsForCustomer(customer.id); // Fetch products specific to the customer
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  useEffect(() => {
    fetchCustomerIdAndProducts();
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowEditModal(false);
    setValidated(false);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'imageFile' && files.length > 0) {
      const file = files[0];
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        imageFile: file,
      }));
    } else {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    setValidated(true);

    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('brandname', newProduct.brandname);
      formData.append('description', newProduct.description);
      formData.append('sizes', newProduct.sizes);
      formData.append('colors', newProduct.colors);
      // const colors = Array.isArray(newProduct.colors) ? newProduct.colors : [];
      // formData.append('colors', colors.join(',')); // Join colors array into a comma-separated string

      formData.append('category', newProduct.category);
      formData.append('quantity', newProduct.quantity);
      formData.append('categoryId', newProduct.categoryId);
      formData.append('customerId', id);
      formData.append('price', newProduct.price);
      formData.append('sellprice', newProduct.sellprice);
      formData.append('subcategoryId', newProduct.subcategoryId);

      if (newProduct.imageFile) {
        formData.append('imageFile', newProduct.imageFile);
      }

      const res = await axios.post('http://13.201.255.228:8080/product', formData);

      // console.log('New Product added successfully:', response.data);
      // console.log("formdata ", response.data);
      resetForm();
      setShowModal(false);
      fetchCustomerIdAndProducts(); // Fetch products again after adding
      console.log("addd data ", res.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };


  const resetForm = () => {
    setNewProduct({
      name: '',
      imageFile: null,
      description: '',
      price: '',
      quantity: '',
      sizes: '',
      category: '',
      colors: '',
      brandname: '',
      sellprice: '',
      categoryId: '',
      customerId: '',
      subcategoryId: ''
    });
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://13.201.255.228:8080/product/${productId}`);
      alert(`Product with ID ${productId} deleted successfully.`);
      fetchCustomerIdAndProducts(); // Fetch products again after deleting
    } catch (error) {
      alert(`Error deleting product with ID ${productId}:`, error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handleUpdateProduct = (updatedProduct) => {
    const updatedData = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product

    );
    setProducts(updatedData);

  };

  return (
    <>
      <div style={{ marginRight: '30px', padding: '20px', }}>
        <h1 className="text-center p-3 mb-4 bg-secondary text-white fw-bold" style={{ borderRadius: '15px' }}>All Products Here</h1>
        <div className="d-flex justify-content-end p-3">
          <Button type="button" className="btn btn-dark btn-lg" onClick={handleShowModal}>
            Add Product
          </Button>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Brand Name</th>
              <th>Description</th>
              <th>Size</th>
              <th>Color</th>
              <th>Base Price</th>
              <th>Sell Price</th>
              <th>Profit</th>
              <th>No. of Stocks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product) => (
              <tr key={product.id}>
                <td>
                  {product.imageUrl && (
                    <img
                      src={`http://13.201.255.228:8080/uploads/${product.imageUrl}`}
                      alt={product.name}
                      className="img-thumbnail rounded-circle"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </td>
                <td>{product.name}</td>
                <td>{product.brandname}</td>
                <td>{product.description}</td>
                <td>{product.sizes.join(', ')}</td>
                <td>{product.colors.join(', ')}</td>
                <td>₹ {product.price}</td>
                <td>₹ {product.sellprice}</td>
                <td>₹ {product.price - product.sellprice}</td>
                <td>{product.quantity}</td>
                <td>
                  <BsPencilSquare className="action-icon text-primary me-2" onClick={() => handleEdit(product)} />
                  <BsTrash className="action-icon text-danger" onClick={() => handleDelete(product.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="mt-4 d-flex justify-content-end" style={{ marginRight: '70px' }}>
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
            />
            <Pagination.Next
              onClick={() => setCurrentPage(currentPage < Math.ceil(products.length / itemsPerPage) ? currentPage + 1 : currentPage)}
              disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
            />
          </Pagination>
        </div>
        <AddProductModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          handleAddProduct={handleAddProduct}
          validated={validated}
          newProduct={newProduct}
          handleInputChange={handleInputChange}
        />


        {selectedProduct && (
          <EditProductModal
            showModal={showEditModal}
            handleCloseModal={handleCloseModal}

            handleUpdateProduct={handleUpdateProduct}
            validated={validated}
            product={selectedProduct}
            handleInputChange={handleInputChange}
          />
        )}
      </div>
    </>
  );
};

export default Products;
