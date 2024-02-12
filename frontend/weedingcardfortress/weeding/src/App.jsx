
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "../pages/home/home"
import List from "../pages/list/list"
function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/image' element={<List/>}/>
      </Routes>
     </BrowserRouter>
     </>
    
  )
  }

export default App
