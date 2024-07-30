import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home';
import { About } from './Pages/About';
import { Contact } from './Pages/Contact';
import { Register } from './Pages/Register';
import { Login } from './Pages/Login';
import { Logout } from './Pages/Logout';
import { Error } from './Pages/Error';
import { Navbar } from './Componenets/Navbar';
import { Footer } from './Componenets/Footer'
import { UserPanel } from './Pages/UserPanel';
import { AdminLayout } from './Componenets/layouts/Admin-Layout'
import { AdminUsers } from './Pages/Admin-Users'
import { AdminContact } from './Pages/Admin-Contact'
import { AdminUpdate } from './Pages/Admin-Update'
import { AddData } from './Pages/add-Data';
import { UpdateData } from './Pages/UpdateData';
import { MyCart } from './Pages/MyCart'
import { AdminProductData } from './Pages/productData'
import { CartProvider } from './Pages/CartContext';
import {OrderRegister} from './Pages/OrderRegister';
import {AdminOrderData} from './Pages/Admin-Order-data';



const App = () => {
  return (
    <>
      <div className=" overflow-x-hidden">
      <CartProvider>
        <BrowserRouter>
       
          <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/Contact' element={<Contact />} />
              <Route path='/About' element={<About />} />
              <Route path='/UserPanel' element={<UserPanel />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/:id/MyCart' element={<MyCart />} />
              <Route path='/OrderRegister' element={<OrderRegister />} />
              <Route path='/updateData' element={<UpdateData />} />
              <Route path='*' element={<Error />} />
              <Route path='/admin' element={< AdminLayout />} >
                <Route path='users' element={< AdminUsers />} />
                <Route path='contacts' element={< AdminContact />} />
                <Route path='postdata' element={< AddData />} />
                <Route path='AdminProductData' element={< AdminProductData />} />
                <Route path='AdminOrderData' element={< AdminOrderData />} />
                <Route path='users/:id/edit' element={< AdminUpdate />} />
              </Route>
            </Routes>
          
          <Footer />
          
        </BrowserRouter>
        </CartProvider>
      </div>
    </>
  )
};
export default App;