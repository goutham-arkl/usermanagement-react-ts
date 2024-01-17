import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home';
import AddUser from './Pages/AddUser';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='adduser' element={<AddUser/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
