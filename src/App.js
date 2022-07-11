import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './components/Home';
import NavBar from './components/NavBar';
import RegisterUser from './components/Register';
import LoginUser from './components/Login';
import AllActivities from './components/Activities'
import CreateActivityForm from './components/ActivityCreate';
import AllRoutines from './components/Routines';
import AllMyRoutines from './components/MyRoutines';
import CreateRoutineForm from './components/RoutinesCreate';
import EditRoutine from './components/RoutineEdit';
import AddActivityToRoutine from './components/AddActivityToRoutineForm';
import EditRoutineActivityForm from './components/RoutineActivityEdit';


function App() {
  const [token, setToken] = useState(localStorage.getItem('JWT'))
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);

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
    <div id='app'>
      <NavBar token={token} />

      <Routes>
        <Route exact path="/" element={<Home token={token}/>} />

        <Route path="/Register" element={<RegisterUser setToken={setToken}/>} />

        <Route path="/Login" element={<LoginUser setToken={setToken} />} />

        <Route path="/Activities" element={<AllActivities token={token} activities={activities} setActivities={setActivities} setRoutines={setRoutines}  />} />

        <Route path="/CreateActivity" element={<CreateActivityForm activities={activities} setActivities={setActivities} />} />

        <Route path="/Routines" element={<AllRoutines routines={routines} setRoutines={setRoutines} />} />

        <Route path="/MyRoutines" element={<AllMyRoutines setRoutines={setRoutines} setActivities={setActivities} />} />

        <Route path="/CreateRoutine" element={<CreateRoutineForm routines={routines} setRoutines={setRoutines} />} />

        <Route path="/EditRoutine/:routineId" element={<EditRoutine routines={routines}/>} />

        <Route path="/AddActivityToRoutine/:routineId" element={<AddActivityToRoutine activities={activities} setActivities={setActivities} />} />

        <Route path="/EditRoutineActivity/:routineId/:activityId" element={<EditRoutineActivityForm routines={routines} setActivities={setActivities} setRoutines={setRoutines} />} />

      </Routes>
    </div> 
  );
}

export default App;