import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';
import axios from 'axios';
// Below from Authentication Article
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "./components/Login";
import Home from "./components/Home";
import Navigation from './components/Navigation';
import Logout from './components/Logout';
// Above from Authentication Article

const App = () => {
  const [modal, setModal] = useState(false);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [activeItem, setActiveItem] = useState({
    grade: "",
    description: "",
    climb: "",
    completed: false
  });
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    axios.get("http://localhost:8000/api/tasks/")
      .then(res => setTaskList(res.data))
      .catch(err => console.log(err));
  };

  const displayCompleted = status => {
    setViewCompleted(status);
  };

  const renderTabList = () => {
    return (
      <div className="my-5 tab-list"> 
        <span 
          onClick={() => displayCompleted(true)} 
          className={viewCompleted ? "active" : ""}
        >
          Completed
        </span>
        <span
          onClick={() => displayCompleted(false)}
          className={viewCompleted ? "" : "active"}
        >
          Incompleted
        </span>
      </div>
    );
  };

  const renderItems = () => {
    const newItems = taskList.filter(item => item.completed === viewCompleted);

    return newItems.map(item => (
      <li key={item.id} className='list-group-item d-flex justify-content-between align-items-center'>
        <span className={`todo-description mr-2 ${viewCompleted ? "completed-todo" : ""}`}>
          {item.description} {item.grade} {item.climb} {item.id}
        </span>
        <span>
          <button className='btn btn-info' onClick={() => editItem(item)}>Edit</button>
          <button className='btn btn-danger mr-2' onClick={() => handleDelete(item)}>Delete</button>
        </span>
      </li>
    ));
  };

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = item => {
    toggle();
    if (item.id) {
      axios.put(`http://localhost:8000/api/tasks/${item.id}/`, item)
        .then(res => refreshList());
      return;
    }
    axios.post('http://localhost:8000/api/tasks/', item)
      .then(res => refreshList());
  };

  const handleDelete = item => {
    axios.delete(`http://localhost:8000/api/tasks/${item.id}/`)
      .then(res => refreshList());
  };

  const createItem = () => {
    const item = { grade: "", description: "", climb: "", completed: false };
    setActiveItem(item);
    setModal(!modal);
  };

  const editItem = item => {
    setActiveItem(item);
    setModal(!modal);
  };

  return (
    <>
    <BrowserRouter>
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
        </Routes>
      </BrowserRouter>
    <main className='content p-3 mb-2 bg-info'>
      <h1 className='text-black text-uppercase text-center my-4'> Task Manager</h1>
      <div className='row'>
        <div className='col-md-6 col-sma-10 mx-auto p-0'>
          <div className='card p-3'>
            <div className=''>
              <button className='btn btn-primary' onClick={createItem}>Add Task</button>
            </div>
            {renderTabList()}
            <ul className='list-group list-group-flush'>
              {renderItems()}
            </ul>
          </div>
        </div>
      </div>
      {modal && (
        <Modal
          activeItem={activeItem}
          toggle={toggle}
          onSave={handleSubmit}
        />
      )}
    </main>
    </>
  );
};

export default App;
