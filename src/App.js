import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { UserContext } from './context/userContext';

import Auth from './pages/Auth';
import Product from './pages/Product';
import DetailProduct from './pages/DetailProduct';
import Complain from './pages/Complain';
import Profile from './pages/Profile';
import ComplainAdmin from './pages/ComplainAdmin';
import CategoryAdmin from './pages/CategoryAdmin';
import ProductAdmin from './pages/ProductAdmin';
import UpdateCategoryAdmin from './pages/UpdateCategoryAdmin';
import AddCategoryAdmin from './pages/AddCategoryAdmin';
import AddProductAdmin from './pages/AddProductAdmin';
import UpdateProductAdmin from './pages/UpdateProductAdmin';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Fitur from "./pages/Fitur";

import { API, setAuthToken } from './config/api';
import AddProfileCustomer from './pages/AddProfileCustomer';
import UpdateProfileCustomer from './pages/UpdateProfileCustomer';

// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  console.clear();
  console.log(state);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/login');
    } else {
      if (state.user.status === 'admin') {
        navigate('/product-admin');
      } else if (state.user.status === 'customer') {
        navigate('/');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<Product />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/product/:id" element={<DetailProduct />} />
      <Route path="/complain" element={<Complain />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/complain-admin" element={<ComplainAdmin />} />
      <Route path="/category-admin" element={<CategoryAdmin />} />
      <Route path="/update-category/:id" element={<UpdateCategoryAdmin />} />
      <Route path="/add-category" element={<AddCategoryAdmin />} />
      <Route path="/product-admin" element={<ProductAdmin />} />
      <Route path="/add-product" element={<AddProductAdmin />} />
      <Route path="/update-product/:id" element={<UpdateProductAdmin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/fitur" element={<Fitur />} />
      <Route path="/add-profile" element={<AddProfileCustomer />} />
      <Route path="/update-profile" element={<UpdateProfileCustomer />} />

    </Routes>
  );
}

export default App;
