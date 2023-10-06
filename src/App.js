import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Home from './pages/Home.js'
import Fruit from './pages/categories/Fruit';
import Login from './pages/Login'
import Signup from './pages/Signup'
import About from "./pages/About";
import Contact from "./pages/Contact";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fruits" element={<Fruit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
<Route path ='/about' element ={<About/>}/>
<Route path ='/contact' element ={<Contact/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;