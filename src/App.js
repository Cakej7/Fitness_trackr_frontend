import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Activities,
  ActivityCreate,
  Home,
  AddActivityToRoutine,
  Login,
  MyRoutines,
  NavBar,
  Register,
  RoutineActivityEdit,
  RoutineEdit,
  Routines,
  RoutinesCreate,
  Footer
} from './components'


function App() {
  const [token, setToken] = useState(localStorage.getItem('JWT'))
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);

  async function checkAuth() {
    const token = localStorage.getItem('JWT')
    if(!token) {
      setToken(false)
    } else {
      setToken(true)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])


  return (
    <BrowserRouter>
      <div id='app'>
        <NavBar token={token} />

        <Routes>
          <Route exact path="/" element={<Home token={token}/>} />

          <Route path="/Register" element={<Register setToken={setToken}/>} />

          <Route path="/Login" element={<Login setToken={setToken} />} />

          <Route path="/Activities" element={<Activities token={token} activities={activities} setActivities={setActivities} setRoutines={setRoutines}  />} />

          <Route path="/CreateActivity" element={<ActivityCreate activities={activities} setActivities={setActivities} />} />

          <Route path="/Routines" element={<Routines routines={routines} setRoutines={setRoutines} />} />

          <Route path="/MyRoutines" element={<MyRoutines setRoutines={setRoutines} setActivities={setActivities} myRoutines={myRoutines} setMyRoutines={setMyRoutines} />} />

          <Route path="/CreateRoutine" element={<RoutinesCreate routines={routines} setRoutines={setRoutines} />} />

          <Route path="/EditRoutine/:routineId" element={<RoutineEdit routines={routines} myRoutines={myRoutines} setMyRoutines={setMyRoutines}/>} />

          <Route path="/AddActivityToRoutine/:routineId" element={<AddActivityToRoutine activities={activities} setActivities={setActivities} />} />

          <Route path="/EditRoutineActivity/:routineId/:activityId" element={<RoutineActivityEdit routines={routines} activities={activities} setActivities={setActivities} setRoutines={setRoutines} myRoutines={myRoutines} setMyRoutines={setMyRoutines} />} />

          <Route path="*" element={<Navigate to="/" replace={true}  />} />

        </Routes>

        <Footer />
      </div> 
    </BrowserRouter>
  );
}

export default App;