import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

const CustomModal = ({ activeItem, toggle, onSave }) => {
  const [item, setItem] = useState(activeItem);

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    const val = type === 'checkbox' ? checked : value;
    setItem({ ...item, [name]: val });
  };

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Task Item</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="grade">Grade</Label>
            <Input
              type="number"
              name="grade"
              value={item.grade}
              onChange={handleChange}
              placeholder="Enter Grade"
            />
          </FormGroup>

          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              value={item.description}
              onChange={handleChange}
              placeholder="Enter Description"
            />
          </FormGroup>

          <FormGroup>
            <Label for="climb">Climb Name</Label>
            <Input
              type="text"
              name="climb"
              value={item.climb}
              onChange={handleChange}
              placeholder="Enter Climb Name"
            />
          </FormGroup>

          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="completed"
                checked={item.completed}
                onChange={handleChange}
              />
              Completed
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => onSave(item)}>Save</Button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;
