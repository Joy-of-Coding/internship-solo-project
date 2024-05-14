import react, { useState, useContext, useEffect } from "react";
import axios from "axios";
///import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';


const CreateTask = () => {
  const navigateTo = useNavigate();

  const storedUserId = localStorage.getItem('userId');
  {!storedUserId ? navigateTo('/') : null}
  
  
  console.log("User id stored in session: " + storedUserId);
  
  
  const [values, setValues] = useState({
    title: "",
    description: "",
    duedate: "",
    userid: storedUserId,
  });
  
const [responseMessage, setResponseMessage] = useState("");
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!values.title || !values.description || !values.duedate) {
    setResponseMessage("Please fill in all the fields.");
    return; // Exit early if any field is empty
  }

  try {
    const response = await axios.post("http://localhost:3000/create", values);
    setResponseMessage(response.data.message); // Assuming the response contains a "message" field
    
  } catch (error) {
    console.log(error);
    setResponseMessage("An error occurred. Please try again.");
  }
};

  return (
    <div className="d-flex align-items-center flex-column mt-3">
      <h1>Add a Task</h1>
      
      <h3 >{responseMessage}</h3>
      <form className=" w-50" onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label className="form-label">Task Name</label>
          <input
            type="test"
            className="form-control"
            id="name"
            placeholder="Enter Task Name"
            name="name"
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Task Description</label>
          <input
            type="test"
            className="form-control"
            id="pwd"
            placeholder="Enter Task Description"
            name="description"
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            className="form-control"
            name="dueDate"
            onChange={(e) => setValues({ ...values, duedate: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
