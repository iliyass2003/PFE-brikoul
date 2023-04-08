import './App.css';
import Home from './pages/Home'
import {Routes, Route} from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AddEditProject from './pages/AddEditProject';
import NotFound from './pages/NotFound';
import Detail from './pages/Detail';
import Header from './components/Header';
import Auth from './pages/Auth';

function App() {
  return (
    <div className="App">
      <Header/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/create' element={<AddEditProject/>}/>
        <Route path='/update' element={<AddEditProject/>}/>
        <Route path='/*' element={<NotFound/>}/>
        <Route path='/auth' element={<Auth/>}/>
      </Routes>
    </div>
  );
}

export default App;
