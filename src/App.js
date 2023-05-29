
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import EditOrder from "./components/OrderForm/EditOrder";
import NewOrder from "./components/OrderForm/NewOrder";
import Customers from "./components/Customers/Customers";
import NewCustomer from "./components/CustomerForm/NewCustomer";
import EditCustomer from "./components/CustomerForm/EditCustomer";
import Orders from "./components/Orders/Orders";
import Products from "./components/Products/Products";
import NewProduct from "./components/ProductForm/NewProduct";
import EditProduct from "./components/ProductForm/EditProduct";
import Workings from "./components/Workings/Workings";
import NewWorking from "./components/WorkingForm/NewWorking";
import EditWorking from "./components/WorkingForm/EditWorking";
import NewProductByOrder from "./components/OrderForm/NewProductByOrder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="orders" element={<Orders />} >
            <Route path="edit/:id" element={<EditOrder />}></Route>
            <Route path="new" element={<NewOrder />} />
            <Route path="new/products" element={<NewProductByOrder />} />
          </Route>
          <Route path="customers" element={<Customers />} />
          <Route path="customers/new" element={<NewCustomer></NewCustomer>} />
          <Route path="customers/edit/:id" element={<EditCustomer />} />
          <Route path="products" element={<Products />}></Route>
          <Route path="products/new" element={<NewProduct></NewProduct>} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="workings" element={<Workings />}></Route>
          <Route path="workings/new" element={<NewWorking />} />
          <Route path="workings/edit/:id" element={<EditWorking />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
