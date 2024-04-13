import React, { Component } from 'react';
import Modal from './components/Modal';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        grade: "",
        description: "",
        climb: "",
        completed: false
      },
      taskList:[]
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios // To send and recieve HTTP requests
      .get("http://localhost:8000/api/tasks/")
      .then(res => this.setState({ taskList: res.data }))
      .catch(err => console.log(err));
  };

  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true })
    }
    return this.setState({ viewCompleted: false })
    
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list"> 
        <span 
        onClick={() => this.displayCompleted(true)} 
        className={this.state.viewCompleted ? "active" : ""}
        >
          Completed
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}>
          Incompleted
        </span>
      </div>
    );
  };


  // Main variable to render items on screen
  renderItems = () => {
    const { viewCompleted } = this.state
    const newItems = this.state.taskList.filter(item => item.completed === viewCompleted);

    return newItems.map(item => (
      <li key={item.id}
       className='list-group-item d-flex justify-content-between align-items-center'
       >
        <span className={`todo-description mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`}>
          {item.description}
          {item.grade}
          {item.climb}
          {item.id}
        </span>
        <span>
          <button className='btn btn-info' onClick={() => this.editItem(item)}>Edit</button>
          <button className='btn btn-danger mr-2' onClick={() => this.handleDelete(item)}>Delete</button>
        </span>
      </li>
    ));
  };


  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      // if old post to edit and submit
      axios
        .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
        .then(res => this.refreshList())
      return;
    }
    axios
      .post('http://localhost:8000/api/tasks/', item)
      .then(res => this.refreshList())
  };

  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/tasks/${item.id}/`)
      .then(res => this.refreshList())
  };

  createItem = () => {
    const item = { grade: "", description: "", climb: "", completed:false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  
  // -I- Start by visual effects to viewer
  render() {
    return (
      <main className='content p-3 mb-2 bg-info'>
        <h1 className='text-black text-uppercase text-center my-4'> Task Manager</h1>
          <div className='row'>
          <div className='col-md-6 col-sma-10 mx-auto p-0'>
            <div className='card p-3'>
              <div className=''>
                <button className='btn btn-primary' onClick={this.createItem}>Add Task</button>
              </div>
              {this.renderTabList()}
              <ul className='list-group list-group-flush'>
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal activeItem={this.state.activeItem}
          toggle={this.toggle}
          onSave={this.handleSubmit} 
          />
        ) : null}
      </main>
    );
  }
}

export default App;
