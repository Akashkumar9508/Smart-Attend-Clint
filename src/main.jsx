import { createRoot  } from 'react-dom/client'
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Signup from "./components/Signup";
import Login from "./components/Login";
import Teacherdash from "./components/Teacherdash";
import Studentdash from "./components/Studentdash";
import Protected from './components/Protected';
import About from './components/About';
import App from './App.jsx'
import './app.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/teacherdash" element={<Protected Component = {Teacherdash} />} />
            <Route path="/studentdash" element={<Protected Component = {Studentdash} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />  
            <Route path="/about" element={<Protected Component = {About} />} />  
        </Routes>
        <ToastContainer />
    </BrowserRouter>
)
