import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HomePage } from './views/home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <HomePage></HomePage>
    <div className='text-3xl'>
    Hello World
    </div>
    </>
  )
}

export default App
