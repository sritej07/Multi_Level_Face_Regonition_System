import React from "react"
import Navbar from "./Components/dahsboard/Navbar"
import { BrowserRouter,Router,Route,Routes } from "react-router-dom"
import Homepage from "./Components/dahsboard/home_container"
import About from "./Components/dahsboard/About"
import Register from "./Components/single/register"
import CaptureFace from "./Components/single/capture"
import Marking from "./Components/single/mark"
import RecordsTable from "./Components/Records/records"
import Crowd from "./Components/crowd/crowd"

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/capture" element={<CaptureFace/>}/>
          <Route path="/mark" element={<Marking/>}/>
          <Route path="/records" element={<RecordsTable/>}/>
          <Route path="/crowd" element={<Crowd/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
