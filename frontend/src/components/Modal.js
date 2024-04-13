import React, { Component } from 'react'
// importing all of these classes from reactstrap module
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
} from 'reactstrap'



class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    }

// To check if the check box is checked or not
handleChange = event => {
    let {name, value } = event.target;
    if (event.target === "checkbox") {
        value = event.target.checked;
    }
    const activeItem = {...this.state.activeItem, [name]: value };
    this.setState({ activeItem })
};
// rendering modal in the custommodal class received toggle and on save as props
render() {
    const { toggle, onSave } = this.props;
    return(
        <Modal isOpen={true} toggle={toggle} >
            <ModalHeader toggle={toggle}>Task Item</ModalHeader>
            <ModalBody>
                <Form> 

                     {/* 3 formgroup 1 title label */}
                    <FormGroup>
                        <Label for="grade">Grade</Label>
                        <Input 
                        type="number"
                        name='grade' 
                        value={this.state.activeItem.grade}
                        onChange={this.handleChange}
                        placeHolder="Enter Grade"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text"
                        name='description' 
                        value={this.state.activeItem.description}
                        onChange={this.handleChange}
                        placeHolder="Enter Description"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="climb">Climb Name</Label>
                        <Input type="text"
                        name='climb' 
                        value={this.state.activeItem.climb}
                        onChange={this.handleChange}
                        placeHolder="Enter Climb Name"
                        />

                    </FormGroup>

                    <FormGroup>
                        <Label for="completed">
                        <Input type="checkbox"
                        name='completed' 
                        value={this.state.activeItem.completed}
                        onChange={this.handleChange}
                        />
                        Completed
                        </Label>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color='success' onClick={() => onSave(this.state.activeItem)}
                >Save</Button>
            </ModalFooter>


            </Modal>
    );
}

}

export default CustomModal;