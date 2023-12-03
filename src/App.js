import './App.css';
import { useState  } from "react"
import {EventCalendar} from './components/EventCalendar'
import {Calendars} from './components/Calendars'
import Login from './components/Auth/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [token, setToken] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) ?? null)

  if(!user) {
    return <Login userDataApp={user} />
  } 
  if(user){
      return <div>{user.username} is loggged in</div>;
  }
  
  return (
    <div className="App">
          <div className="wrapper">
            <h1>Application</h1>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/calendar" element={<Calendars />} />
                <Route path="/calendar/:calendarID" element={<EventCalendar />} />
              </Routes>

          </div>
    </div>
  );
}

export default App;
