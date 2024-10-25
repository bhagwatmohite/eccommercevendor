/* eslint-disable react/prop-types */

import { Button, Form, Modal } from 'react-bootstrap';

const AddSizeModal = ({ showModal, handleCloseModal, handleAddSize, newSize, setNewSize }) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Size</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formSize">
            <Form.Label>Size</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter size"
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddSize}>
          Add Size
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSizeModal;
