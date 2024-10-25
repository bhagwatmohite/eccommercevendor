/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// // ViewDetails.js

// import { Button } from 'react-bootstrap';

// const ViewDetails = ({ product, onBack }) => {
//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Product Details</h2>
//       <Button variant="secondary" onClick={onBack} style={{ marginBottom: '20px' }}>
//         Back to Products
//       </Button>

//       <div>
//         <h4><strong>Product ID:</strong> {product.id}</h4>
//         <h4><strong>Product Name:</strong> {product.name}</h4>
//         <h4><strong>Brand:</strong> {product.brandname}</h4>
//         <h4><strong>Description:</strong> {product.description}</h4>
//         <h4><strong>Price:</strong> ${product.price}</h4>
//         <h4><strong>Sell Price:</strong> ${product.sellprice}</h4>
//         <h4><strong>Stock:</strong> {product.quantity}</h4>
//       </div>

//       <div style={{ marginTop: '20px' }}>
//         <h3>Sizes and Colors:</h3>
//         {(product.sizes || []).map((size, index) => (
//           <div key={index} style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
//             <h5><strong>Size:</strong> {size.size}</h5>
//             <ul>
//               {(size.colors || []).map((color, colorIndex) => (
//                 <li key={colorIndex} style={{ marginBottom: '10px' }}>
//                   <strong>Color:</strong> {color.color} - <strong>Quantity:</strong> {color.quantity}
//                   {color.images && color.images.length > 0 && (
//                     <div style={{ marginTop: '5px' }}>
//                       <h6>Uploaded Images:</h6>
//                       {(color.images || []).map((image, imgIndex) => (
//                         <img
//                           key={imgIndex}
//                           src={image}
//                           alt={`Image ${imgIndex + 1}`}
//                           style={{ width: '100px', height: '100px', marginRight: '5px', borderRadius: '5px' }}
//                         />
//                       ))}
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ViewDetails;



// import { Button } from 'react-bootstrap';

// const ViewDetails = ({ product, onBack }) => {
//   return (
//     <div>
//       <h2>Product Details</h2>
//       <p><strong>Product ID:</strong> {product.id}</p>
//       <p><strong>Product Name:</strong> {product.name}</p>
//       <p><strong>Brand:</strong> {product.brandname}</p>
//       <p><strong>Description:</strong> {product.description}</p>
//       <p><strong>Price:</strong> {product.price}</p>
//       <p><strong>Sell Price:</strong> {product.sellprice}</p>
//       <p><strong>Stock:</strong> {product.quantity}</p>
//       <h5>Sizes</h5>
//       <ul>
//         {(product.sizes || []).map((size, index) => (
//           <li key={index}>
//             <strong>Size: {size.size}</strong>
//             <ul>
//               {(size.colors || []).map((color, colorIndex) => (
//                 <li key={colorIndex}>
//                   <strong>Color: {color.color}</strong> - Quantity: {color.quantity}
//                   <br />
//                   {color.images && (
//                     <div>
//                       <h6>Uploaded Images:</h6>
//                       {(color.images || []).map((image, imgIndex) => (
//                         <img
//                           key={imgIndex}
//                           src={image}
//                           alt={`Image ${imgIndex + 1}`}
//                           style={{ width: '100px', height: '100px', marginRight: '5px' }}
//                         />
//                       ))}
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//       <Button onClick={onBack}>Back to Products</Button>
//     </div>
//   );
// };

// export default ViewDetails;



// //after adding color with images in sizes
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Button, Form, Modal } from 'react-bootstrap';

// const ViewDetails = ({ product, onBack }) => {
//   const [sizes, setSizes] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedSizeId, setSelectedSizeId] = useState(null);
//   const [colorData, setColorData] = useState({ color: '', quantity: '', images: [] });

//   // Fetch sizes based on the product ID when the component mounts
//   useEffect(() => {
//     const fetchSizes = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/getSizesByProductId/${product.id}`);
//         setSizes(response.data);
//       } catch (error) {
//         console.error("Error fetching sizes:", error);
//       }
//     };

//     fetchSizes();
//   }, [product.id]);

//   // Handle modal open for specific size
//   const handleAddColorClick = (sizeId) => {
//     setSelectedSizeId(sizeId);
//     setShowModal(true);
//   };

//   // Handle file input change for images
//   const handleImageChange = (e) => {
//     setColorData({
//       ...colorData,
//       images: Array.from(e.target.files), // Handle multiple files
//     });
//   };

//   // Handle form submission to add color with images
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create form data object to handle file upload
//     const formData = new FormData();
//     formData.append('color', colorData.color);
//     formData.append('quantity', colorData.quantity);
//     formData.append('sizeId', selectedSizeId);

//     // Append multiple images
//     // eslint-disable-next-line no-unused-vars
//     colorData.images.forEach((image, index) => {
//       formData.append('images', image);
//     });

//     try {
//       const response = await axios.post('http://localhost:8080/colors/addcolorwithimages', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       console.log('Color added successfully:', response.data);

//       // Close the modal and reset form
//       setShowModal(false);
//       setColorData({ color: '', quantity: '', images: [] });
//     } catch (error) {
//       console.error('Error adding color:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Product Details</h2>
//       <p><strong>Product ID:</strong> {product.id}</p>
//       <p><strong>Product Name:</strong> {product.name}</p>
//       <p><strong>Brand:</strong> {product.brandname}</p>
//       <p><strong>Description:</strong> {product.description}</p>
//       <p><strong>Price:</strong> {product.price}</p>
//       <p><strong>Sell Price:</strong> {product.sellprice}</p>
//       <p><strong>Stock:</strong> {product.quantity}</p>

//       <h5>Sizes</h5> <span> <p style={{ color: 'greenyellow', cursor: 'pointer' }} >
//         <b>Add Size</b>
//       </p></span>
//       <ul>
//         {(sizes || []).map((size, index) => (
//           <li key={index}>
//             <strong>Size: {size.size}</strong>
//             <p style={{ color: 'greenyellow', cursor: 'pointer' }} onClick={() => handleAddColorClick(size.id)}>
//               <b>Add Color</b>
//             </p>
//             <ul>
//               {(size.colors || []).length > 0 ? (
//                 size.colors.map((color, colorIndex) => (
//                   <li key={colorIndex}>
//                     <strong>Color: {color.color}</strong> - Quantity: {color.quantity}
//                     <br />
//                     {color.images && (
//                       <div>
//                         <h6>Uploaded Images:</h6>
//                         <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                           {(color.images || []).map((image, imgIndex) => (
//                             <img
//                               key={imgIndex}
//                               src={`http://localhost:8080/ColorImages/${image}`}
//                               alt={`Image ${imgIndex + 1}`}
//                               className="img-thumbnail rounded-circle"
//                               style={{
//                                 width: "60px",
//                                 height: "60px",
//                                 objectFit: "contain",
//                                 marginRight: '5px'
//                               }}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </li>
//                 ))
//               ) : (
//                 <li>No colors available for this size.</li>
//               )}
//             </ul>
//           </li>
//         ))}
//       </ul>

//       <Button onClick={onBack}>Back to Products</Button>

//       {/* Modal for adding color */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Color</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="color">
//               <Form.Label>Color</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter color"
//                 value={colorData.color}
//                 onChange={(e) => setColorData({ ...colorData, color: e.target.value })}
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="quantity">
//               <Form.Label>Quantity</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter quantity"
//                 value={colorData.quantity}
//                 onChange={(e) => setColorData({ ...colorData, quantity: e.target.value })}
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="images">
//               <Form.Label>Upload Images</Form.Label>
//               <Form.Control
//                 type="file"
//                 multiple
//                 onChange={handleImageChange}
//                 required
//               />
//             </Form.Group>

//             <Button variant="primary" type="submit">
//               Add Color
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default ViewDetails;



import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, ListGroup, Modal, Row } from 'react-bootstrap';

const ViewDetails = ({ product, onBack }) => {
  const [sizes, setSizes] = useState([]);
  const [showColorModal, setShowColorModal] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [colorData, setColorData] = useState({ color: '', quantity: '', images: [] });
  const [newSize, setNewSize] = useState('');

  // Fetch sizes based on the product ID when the component mounts
  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getSizesByProductId/${product.id}`);
        setSizes(response.data);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };

    fetchSizes();
  }, [product.id]);

  const handleAddColorClick = (sizeId) => {
    setSelectedSizeId(sizeId);
    setShowColorModal(true);
  };

  const handleAddSizeClick = () => {
    setShowSizeModal(true);
  };

  const handleImageChange = (e) => {
    setColorData({
      ...colorData,
      images: Array.from(e.target.files),
    });
  };

  const handleAddColorSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('color', colorData.color);
    formData.append('quantity', colorData.quantity);
    formData.append('sizeId', selectedSizeId);

    // eslint-disable-next-line no-unused-vars
    colorData.images.forEach((image, index) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post('http://localhost:8080/colors/addcolorwithimages', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Color added successfully:', response.data);

      setShowColorModal(false);
      setColorData({ color: '', quantity: '', images: [] });
    } catch (error) {
      console.error('Error adding color:', error);
    }
  };

  const handleAddSizeSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8080/addSizeWithProductId?size=${newSize}&productId=${product.id}`);
      console.log('Size added successfully:', response.data);

      setShowSizeModal(false);
      setNewSize('');

      const updatedSizes = await axios.get(`http://localhost:8080/getSizesByProductId/${product.id}`);
      setSizes(updatedSizes.data);
    } catch (error) {
      console.error('Error adding size:', error);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', marginTop: '50px', textAlign: 'center' }}>
      <Card style={{ backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', transition: 'all 0.3s ease' }}>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h2 style={{ color: '#1e90ff', fontFamily: "'Poppins', sans-serif", fontWeight: '600', fontSize: '32px', letterSpacing: '1px', textTransform: 'uppercase', animation: 'fadeIn 2s ease-in-out' }}>
                {product.name}
              </h2>
              <h5 style={{ fontSize: '20px', color: '#333', marginTop: '20px' }}><strong>Product ID:</strong> {product.id}</h5>
              <h6 style={{ fontSize: '18px', color: '#333' }}><strong>Brand:</strong> {product.brandname}</h6>
              <p style={{ fontSize: '16px', color: '#666', marginTop: '15px' }}><strong>Description:</strong> {product.description}</p>
              <p style={{ fontSize: '18px', color: '#333', marginTop: '15px' }}><strong>Price:</strong> ₹{product.price}</p>
              <p style={{ fontSize: '18px', color: '#333', marginTop: '15px' }}><strong>Sell Price:</strong> ₹{product.sellprice}</p>
              <p style={{ fontSize: '18px', color: '#333', marginTop: '15px' }}><strong>Stock:</strong> {product.quantity}</p>
            </Col>
            <Col md={6}>

              <img
                src={
                  sizes && sizes.length > 0 && sizes[0].colors && sizes[0].colors.length > 0 && sizes[0].colors[0].images
                    ? `http://localhost:8080/ColorImages/${sizes[0].colors[0].images[0]}`
                    : 'http://localhost:8080/Images/placeholder-image.jpg'  // Fallback image URL
                }
                alt={product.name}
                style={{
                  width: '40%',
                  borderRadius: '15px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  animation: 'zoomIn 2s ease-in-out',
                }}
              />


            </Col>
          </Row>

          <hr />
          <h5 style={{ marginTop: '30px', fontSize: '24px', fontFamily: "'Poppins', sans-serif", color: '#333', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Sizes
          </h5>
          <span>
            <p
              style={{ color: '#32CD32', cursor: 'pointer', fontWeight: 'bold', fontSize: '18px', marginTop: '15px' }}
              onClick={handleAddSizeClick}
            >
              Add Size
            </p>
          </span>

          <ListGroup>
            {(sizes || []).map((size, index) => (
              <ListGroup.Item key={index} style={{ backgroundColor: '#e8f5e9', marginBottom: '15px', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', animation: 'fadeIn 2s ease-in-out' }}>
                <h6 style={{ fontSize: '20px', fontWeight: 'bold', color: '#4CAF50' }}><strong>Size: {size.size}</strong></h6>
                <p
                  style={{ color: 'dodgerblue', cursor: 'pointer', fontWeight: 'bold', fontSize: '18px' }}
                  onClick={() => handleAddColorClick(size.id)}
                >
                  Add Color
                </p>
                <ListGroup variant="flush">
                  {(size.colors || []).length > 0 ? (
                    size.colors.map((color, colorIndex) => (
                      <ListGroup.Item key={colorIndex} style={{ backgroundColor: '#fff3e0', marginBottom: '10px', borderRadius: '5px', padding: '15px' }}>
                        <strong style={{ fontSize: '18px' }}>Color: {color.color}</strong> - Quantity: {color.quantity}
                        <div>
                          {color.images && (
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                              <h6 style={{ fontSize: '16px', color: '#666' }}>Uploaded Images:</h6>
                              {(color.images || []).map((image, imgIndex) => (
                                <img
                                  key={imgIndex}
                                  src={`http://localhost:8080/ColorImages/${image}`}
                                  alt={`Image ${imgIndex + 1}`}
                                  style={{
                                    width: '60px',
                                    height: '60px',
                                    objectFit: 'contain',
                                    marginRight: '5px',
                                    borderRadius: '50%',
                                    transition: 'transform 0.3s ease',
                                  }}
                                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </ListGroup.Item>
                    ))
                  ) : (
                    <ListGroup.Item>No colors available for this size.</ListGroup.Item>
                  )}
                </ListGroup>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      <Button
        style={{
          marginTop: '30px',
          backgroundColor: '#6c757d',
          border: 'none',
          padding: '15px 25px',
          borderRadius: '10px',
          cursor: 'pointer',
          fontSize: '18px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s ease',
        }}
        onClick={onBack}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#5a6268')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#6c757d')}
      >
        Back to Products
      </Button>

      {/* Modal for adding color */}
      <Modal show={showColorModal} onHide={() => setShowColorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Color</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddColorSubmit}>
            <Form.Group controlId="color">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter color"
                value={colorData.color}
                onChange={(e) => setColorData({ ...colorData, color: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                value={colorData.quantity}
                onChange={(e) => setColorData({ ...colorData, quantity: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="images">
              <Form.Label>Upload Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={handleImageChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Color
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for adding size */}
      <Modal show={showSizeModal} onHide={() => setShowSizeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Size</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSizeSubmit}>
            <Form.Group controlId="size">
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter size"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Size
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ViewDetails;
