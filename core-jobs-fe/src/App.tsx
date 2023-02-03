import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>CORE :: Jobs</h1>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Link some resources here. This is a test harness for the CORE / Jobs
        Components:
      </p>
      <ul>
        <li>React-Admin Jobs Table Resource</li>
        <li>Jobs by Type Summary</li>
        <li>Workers List</li>
        <li>Job Stats List</li>
        <li>Jobs RPM Chart</li>
      </ul>
    </div>
  )
}

export default App
