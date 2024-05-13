import react, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const UpdateTask = () => {
  //isLoggedIn ? 
  let { id } = useParams();

  const [values, setValues] = useState({
    title: "",
    description: "",
    duedate: "",
    userid: 1,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/getTask/${id}`)
      .then((res) => setValues(res.data[0]))
      .catch((err) => console.log(err));
  }, [id]);

  const [responseMessage, setResponseMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.title || !values.description || !values.duedate) {
      setResponseMessage("Please fill in all the fields.");
      return; // Exit early if any field is empty
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/update/${id}`,
        values
      );
      setResponseMessage(response.data.message); // Assuming the response contains a "message" field
      //window.location.reload(); // Reload the page
    } catch (error) {
      console.log(error);
      setResponseMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex align-items-center flex-column mt-3">
      <h1>Edit Task</h1>
      <h3>{responseMessage}</h3>
      <form className=" w-50" onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label className="form-label">Task Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Task Name"
            name="title"
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Task Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Task Description"
            name="description"
            value={values.description}
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
            value={values.duedate}
            onChange={(e) => setValues({ ...values, duedate: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          update
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
