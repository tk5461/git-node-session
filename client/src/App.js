import {BrowserRouter as Router,Routes ,Route} from "react-router-dom"
import Layout from "./components/share/Layout"
import ProducteList from "./components/product/producteList"
import Enter from "./components/App/Enter";
import Footer  from "./components/share/Footer";
import Login from "./components/user/Login";
import Register from "./components/user/Register"
import SinglProdacte from "./components/product/SinglProdacte";
import CreatProduct from "./components/product/creatProduct"
import Cart  from "./components/ShoppingCart/cart";
import Curd from "./components/product/Crud"
import About from "./components/App/About"
import UpdateProducte from "./components/product/UpdateProducte"

function App() {
  return ( 
    <div className="App">
    <Router>
      <Routes>  
        <Route path="/" element={<Layout/>}>
        <Route index element={<Enter/>}/>  
        <Route index element={<Footer/>}/> 
        <Route path="user/login" element={<Login/>}/>
        <Route path="user/register" element={<Register/>}/>
        <Route path="products/:category?" element={<ProducteList/>}/> 
        <Route path="product/:id" element={<SinglProdacte/>}/>
        <Route path="product/creatProduct" element={<CreatProduct/>}/>
        <Route path="product/Crud" element={<Curd/>}/>
        <Route path="UpdateProducte/:id" element={<UpdateProducte/>}/>
        <Route path="ShoppingCart/cart" element={<Cart/>}/> 
        <Route path="about" element={<About/>}/> 
        </Route>
      </Routes> 
    </Router>
    </div> 
  ); 
}

export default App;

