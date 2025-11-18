import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from "./components/sidebar"
import Body from "./pages/Body"

function App() {

  return (
    <>
    <div className="flex">
       <Sidebar/>
      <div className='flex-1 p-10'>
         <Body/>


      </div>


    </div>

    </>
  )
}

export default App
