
import { Table } from 'react-bootstrap';

const Reports = () => {
  // Example customer data
  const customers = [
    {
      id: 1,
      name: 'John Doe',
      mobile: '123-456-7890',
      email: 'john@example.com',
      report: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      mobile: '987-654-3210',
      email: 'jane@example.com',
      report: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    // Add more customers as needed
  ];

  return (
    <>
      <h1 className="mb-4">Reports</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Report/Description</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.mobile}</td>
              <td>{customer.email}</td>
              <td>{customer.report}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Reports;


// import { useState } from 'react';
// import { Button, Form } from 'react-bootstrap';

// const Reports = () => {
//   const [product, setProduct] = useState({
//     productName: '',
//     brandName: '',
//     image: null,
//     description: '',
//     categoryId: '',
//     customerId: '',
//     sizes: [{ size: '', quantity: '' }],
//     basePrice: '',
//     sellingPrice: '',
//     stocks: '',
//     // Add your own additional fields here
//   });

//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     if (name === 'size' || name === 'quantity') {
//       const sizes = [...product.sizes];
//       sizes[index][name] = value;
//       setProduct({ ...product, sizes });
//     } else {
//       setProduct({ ...product, [name]: value });
//     }
//   };

//   const handleAddSize = () => {
//     setProduct({ ...product, sizes: [...product.sizes, { size: '', quantity: '' }] });
//   };

//   const handleRemoveSize = (index) => {
//     const sizes = [...product.sizes];
//     sizes.splice(index, 1);
//     setProduct({ ...product, sizes });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here
//   };

//   return (

//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="productName">
//         <Form.Label>Product Name</Form.Label>
//         <Form.Control type="text" name="productName" value={product.productName} onChange={handleInputChange} required />
//       </Form.Group>

//       <Form.Group controlId="brandName">
//         <Form.Label>Brand Name</Form.Label>
//         <Form.Control type="text" name="brandName" value={product.brandName} onChange={handleInputChange} required />
//       </Form.Group>

//       <Form.Group controlId="description">
//         <Form.Label>Description</Form.Label>
//         <Form.Control as="textarea" rows={3} name="description" value={product.description} onChange={handleInputChange} required />
//       </Form.Group>

//       <Form.Group controlId="basePrice">
//         <Form.Label>Base Price</Form.Label>
//         <Form.Control type="number" name="basePrice" value={product.basePrice} onChange={handleInputChange} required />
//       </Form.Group>

//       <Form.Group controlId="sellingPrice">
//         <Form.Label>Selling Price</Form.Label>
//         <Form.Control type="number" name="sellingPrice" value={product.sellingPrice} onChange={handleInputChange} required />
//       </Form.Group>

//       {/* Add other form fields as needed */}

//       {product.sizes.map((size, index) => (
//         <div key={index}>
//           <Form.Group controlId={`size-${index}`}>
//             <Form.Label>Size</Form.Label>
//             <Form.Control type="text" name="size" value={size.size} onChange={(e) => handleInputChange(e, index)} required />
//           </Form.Group>
//           <Form.Group controlId={`quantity-${index}`}>
//             <Form.Label>Quantity</Form.Label>
//             <Form.Control type="number" name="quantity" value={size.quantity} onChange={(e) => handleInputChange(e, index)} required />
//           </Form.Group>
//           {index > 0 && (
//             <Button variant="danger" onClick={() => handleRemoveSize(index)}>
//               Remove Size
//             </Button>
//           )}
//         </div>
//       ))}
//       <Button variant="primary" onClick={handleAddSize}>
//         Add Size
//       </Button>

//       <Button variant="primary" type="submit">
//         Add Product
//       </Button>
//     </Form>

//   );
// };

// export default Reports;

