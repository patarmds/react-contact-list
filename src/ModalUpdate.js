import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalUpdate({isShow, handleClose, data, handleChange, handleSubmit}) {
  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" type="text" defaultValue={data.name} placeholder="Name" onChange={(e) => handleChange(e)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="text" defaultValue={data.email} placeholder="Email" onChange={(e) => handleChange(e)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="telp">
            <Form.Label>Telp</Form.Label>
            <Form.Control name="telp" type="text" defaultValue={data.telp} placeholder="Telp"  onChange={(e) => handleChange(e)} />
          </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdate;