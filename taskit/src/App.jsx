import {  Routes, Route } from 'react-router-dom';
import CreateTask from './CreateTask';
import UpdateTask from './UpdateTask';
import Tasks from './tasks';
import Login from './login';


const App = () => {
  //const [ isLoggedIn ]  = useGlobalState(false);
  
  return (
    
      
      <Routes>

        <Route path='/' element={<Login />} />  
        <Route path='/tasks' element={<Tasks />} />  
        <Route path='/create' element={<CreateTask />} />
        <Route path='/update/:id' element={<UpdateTask />} />
      </Routes>
    
  )
}

export default App;