import { useState } from 'react'
import { Logo } from './svgs/index';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
          <a href="https://vitejs.dev" target="_blank">
            <Logo className="w-[10px] h-[10px]" />
          </a>
          <h1 className='text-9xl'>test</h1>
      </div>
    </>
  )
}

export default App
