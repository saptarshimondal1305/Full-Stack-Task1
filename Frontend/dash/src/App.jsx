import './App.css'
import Stations from './components/Stations'
import CheckValidity from './components/CheckValidity'
import CheckInOut from './components/CheckInOut'
function App() {
  

  return (
    <>      
      <Stations/>
      <CheckInOut/>
      {/* <ExitStation/> */}
      <CheckValidity/>
    </>
  )
}

export default App
