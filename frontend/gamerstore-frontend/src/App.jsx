import './App.css'
import {Routes, Route} from "react-router-dom";
import Login from './pages/Login';
import Products from './pages/Products';
import Entries from './pages/Entries';
import Exits from './pages/Exits';
import CreateProduct from './pages/CreateProduct';
import CreateEntry from './pages/CreateEntry';
import CreateExit from './pages/CreateExit';
import EditProduct from './pages/EditProduct';
import Brands from './pages/Brands';
import CreateBrand from './pages/CreateBrand';
import EditBrand from './pages/EditBrand';
import CreateCategory from './pages/CreateCategory';
import Categories from './pages/Categories';
import EditCategory from './pages/EditCategory';
import Platforms from './pages/Platforms';
import CreatePlatform from './pages/CreatePlatform';
import Suppliers from './pages/Suppliers';
import CreateSupplier from './pages/CreateSupplier';
import EditSupplier from './pages/EditSupplier';
import Users from './pages/Users';
import Register from './pages/Register';
function App() {
  return (
   <Routes>
    
    <Route path='/' element={<Login />} />

    <Route path='/products' element={<Products />} />
    <Route path='/entries' element={<Entries />} />
    <Route path='/exits' element={<Exits />} />
    <Route path='/brands' element={<Brands />} />
    <Route path='/platforms' element={<Platforms />} />
    <Route path='/categories' element={<Categories />} />
    <Route path='/suppliers' element={<Suppliers />} />
    <Route path='/users' element={<Users />} />
    <Route path='/register' element={<Register />} />
    <Route path='/login' element={<Login />} />

    <Route path='/create-product' element={<CreateProduct />} />
    <Route path='/create-entries' element={<CreateEntry />} />
    <Route path='/create-exits' element={<CreateExit />} />
    <Route path='/create-brand' element={<CreateBrand />} />
    <Route path='/create-category' element={<CreateCategory />} />
    <Route path='/create-platform' element={<CreatePlatform />} />
    <Route path='/create-supplier' element={<CreateSupplier />} />

    <Route path='/products/edit/:id' element={<EditProduct />} />
    <Route path='/brands/edit/:id' element={<EditBrand />} />
    <Route path='/categories/edit/:id' element={<EditCategory />} />
    <Route path='/suppliers/edit/:id' element={<EditSupplier/>} />
   </Routes>
  );
}
export default App