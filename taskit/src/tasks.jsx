
import react, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
//import { useGlobalState } from 'state-pool';
import { useNavigate } from 'react-router-dom';
//import { store } from 'state-pool';
import { AuthContext } from './AuthContext';

const Tasks = () => {
  const { user } = useContext(AuthContext);
  const isLoggedIn = user && user.isLoggedIn;
  const myId = user ? user.userId : null;

  const [deletedTaskId, setDeletedTaskId] = useState(null);
  const [userId, setUserId] = useState(null);

  const navigateTo = useNavigate();

  {!userId ? navigateTo('/') : null}

  console.log("User id stored in session:" + userId);

  useEffect(() => {
    if (deletedTaskId) {
      console.log("In deleted task " + userId);
      navigateTo('/tasks');
    }
  }, [deletedTaskId, navigateTo]);
  
  useEffect(() => {
    // Check if userId exists in localStorage
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      // If userId exists, set it in the component state
      setUserId(storedUserId);
    } else {
      // If userId doesn't exist, handle the scenario accordingly
      // For example, redirect to the login page
      // history.push('/login'); // If using React Router, navigate to the login page
    }
  }, []);

  const [task, setTasks] = useState([]);
  console.log("User id stored in session:" + userId);
   
  const handleDelete = (taskId) => {
    const result = window.confirm("Are you sure you want to proceed?");
    
    if (result) {
      axios
      .delete(`http://localhost:3000/delete/${taskId}`)
      .then((response) => {
        console.log("item deleted");
        //navigateTo(/tasks); // Reload the page
        setDeletedTaskId(taskId);
        //navigateTo('/tasks');
        // Handle the response data here
        //alert("res " + response.data);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error here
        alert("er " + error);
      });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/tasks/${userId}`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  }, [userId , deletedTaskId]);
  

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
        <h1>No Tasks</h1>
      )}
    </div>
  );
};

export default Tasks;
