import { useState } from 'react'
import HomeScreen from './Screen/HomeScreen/HomeScreen'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HomeScreen />
    </>
  )
}

export default App
