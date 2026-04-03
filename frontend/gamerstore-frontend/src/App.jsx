import './App.css'
import {Routes, Route} from "react-router-dom";
import Login from './pages/Login';
import Products from './pages/Products';
import Entries from './pages/Entries';
import Exits from './pages/Exits';
import CreateProduct from './pages/CreateProduct';
import CreateEntry from './pages/CreateEntry';
import CreateExit from './pages/CreateExit';
function App() {
  return (
   <Routes>
    <Route path='/' element={<Login />} />
    <Route path='/products' element={<Products />} />
    <Route path='/entries' element={<Entries />} />
    <Route path='/exits' element={<Exits />} />
    <Route path='/create-product' element={<CreateProduct />} />
    <Route path='/create-entries' element={<CreateEntry />} />
    <Route path='/create-exits' element={<CreateExit />} />
   </Routes>
  );
}
export default App