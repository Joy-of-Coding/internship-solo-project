
import react, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
///import { AuthContext }  from './AuthContext';

const Tasks = () => {
  const navigateTo = useNavigate();
  // Check if userId exists in localStorage, if not go back to login

  const storedUserId = localStorage.getItem('userId');
  {!storedUserId ? navigateTo('/') : null}

  const [deletedTaskId, setDeletedTaskId] = useState(null);
  
  console.log("User id stored in storedUserId and myId:" + storedUserId );

  const [task, setTasks] = useState([]);
   
  const handleDelete = (taskId) => {
    const result = window.confirm("Are you sure you want to proceed?");
    
    if (result) {
      axios
      .delete(`http://localhost:3000/delete/${taskId}`)
      .then((response) => {
        console.log("item deleted");
        //by setting deletedTaskId to taskId we can refresh the page with useEffect below
        setDeletedTaskId(taskId);
        
      })
      .catch((error) => {
        console.error(error);
        // Handle the error here
        alert("er " + error);
      });
    }
  };


  //Get tasks by userid, if something is deleted, refresh the page
  useEffect(() => {
    axios
      .get(`http://localhost:3000/tasks/${storedUserId}`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  }, [deletedTaskId]);
  

//*********************  SORTING */

const [sortColumn, setSortColumn] = useState('');
const [sortOrder, setSortOrder] = useState('asc');

const sortByColumn = (column) => {
  if (sortColumn === column) {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  } else {
    setSortColumn(column);
    setSortOrder('asc');
  }
};

const sortByColumnValue = (a, b, column, order) => {
  if (!a.hasOwnProperty(column) || !b.hasOwnProperty(column)) {
    return 0;
  }

  const varA = typeof a[column] === 'string' ? a[column].toUpperCase() : a[column];
  const varB = typeof b[column] === 'string' ? b[column].toUpperCase() : b[column];

  let comparison = 0;
  if (varA > varB) {
    comparison = 1;
  } else if (varA < varB) {
    comparison = -1;
  }

  return order === 'desc' ? comparison * -1 : comparison;
};


  return (
    <div className="container">
      <Link to="/create" className="btn btn-primary my-3">
        Create Task
      </Link>
      
      {task.length !== 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col" onClick={() => sortByColumn('title')}>Task</th>
              <th scope="col" onClick={() => sortByColumn('description')}>Description</th>
              <th scope="col" onClick={() => sortByColumn('duedate')}>Due Date</th>
              {/* <th scope="col">Task</th>
              <th scope="col">Description</th>
              <th scope="col">Due Date</th> */}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(task) ? (
              //task.map((aTask) => (
                task.sort((a, b) => sortByColumnValue(a, b, sortColumn, sortOrder)).map((aTask) => (
                <tr key={aTask.id}>
                  {/* case matters for the database columns */}
                  <td>{aTask.title}</td>
                  <td>{aTask.description}</td>
                  <td>{new Date(aTask.duedate).toLocaleDateString()}</td>
                  <td><button className="btn btn-primary border=1" onClick={() => handleDelete(aTask.id)}>Delete Task</button></td>
                  <td><Link to={`/update/${aTask.id}`} className="btn btn-primary border=1">Update Task</Link></td>
                </tr>
              ))
            ) : (
              <p>Error: results were not an array.</p>
            )}
          </tbody>
        </table>
      ) : (
        <h1>No Tasks Found</h1>
      )}
    </div>
  );
};

export default Tasks;
