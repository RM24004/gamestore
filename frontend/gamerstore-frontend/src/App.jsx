import './App.css'
import {Routes, Route} from "react-router-dom";
import Login from './pages/Login';
import Products from './pages/Products';
import Entries from './pages/Entries';
import Exits from './pages/Exits';
function App() {
  return (
   <Routes>
    <Route path='/' element={<Login />} />
    <Route path='/products' element={<Products />} />
    <Route path='/entries' element={<Entries />} />
    <Route path='/exits' element={<Exits />} />
   </Routes>
  );
}

export default App
