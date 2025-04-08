import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Newsfeed from './components/Newsfeed'
import Sidebar from './components/Sidebar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <Newsfeed/>
     <Newsfeed/>
     <Newsfeed/>
     <Sidebar/>
    </>
  )
}

export default App
