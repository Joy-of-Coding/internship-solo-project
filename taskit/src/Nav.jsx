import react from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const Nav = () => {
  
  return (
    <div className='d-flex justify-content-center py-2 shadow-sm fs-2 fw-bold '>
        <Link to='/tasks'>Task List</Link>
        
    </div>
  )
}

export default Nav;