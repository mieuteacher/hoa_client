import { Route } from "react-router-dom";
import AuthRoute from "@pages/auths/Route";
import Home from './Home'
import LazyLoad from "../../lazy_loadings/lazyLoading";
import Bodyhome from "./Bodyhome";
import ListProduct from "./Product/Listproduct";
import ProductItem from "./Product/ProductItem";
import Pay from "./Product/Pay";
import AdminRoute from '../Admin/Route'
import Aboutgodiva from "./About/Aboutgodiva";
import Grocery from "./About/Grocery";

export default (
  <Route path="/" element={<Home />}>
    {AuthRoute}
    <Route path="/" element={<Bodyhome />} />
    <Route path="/:type" element={<ListProduct />} />
    <Route path="/products/:id" element={<ProductItem/>} />
    <Route path="/pay" element={<Pay/>} />
    <Route path="/about" element={<Aboutgodiva/>} />
    <Route path="/grocery" element={<Grocery/>} /> 


    {AdminRoute}
  </Route>
);
