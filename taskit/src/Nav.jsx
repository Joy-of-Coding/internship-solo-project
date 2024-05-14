import react from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Nav = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  //let storedUserId = localStorage.getItem("userId");
  const [storedUserId, setId]= useState(localStorage.getItem("userId"));

  useEffect(() => {
    setId(localStorage.getItem("userId")); 
    //window.location.reload();
  }, [storedUserId])

  return (
    <div key={refreshKey} className="d-flex justify-content-center py-2 shadow-sm fs-2 fw-bold  ">
      <Link className="px-4" to="/">
        Home
      </Link>
      <Link to="/tasks">Task List</Link>
      {storedUserId ? (
        <Link
          className="px-4"
          to="/"
          onClick={() => {
            localStorage.removeItem("userId");
            setId(null);
            setRefreshKey(prevKey => prevKey + 1);
          }}
        >
          Log Out 
        </Link>
      ) : null}
    </div>
  );
};

export default Nav;

