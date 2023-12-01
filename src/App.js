import './App.css';
import { useState  } from "react"
import {EventCalendar} from './components/EventCalendar'
import {Calendars} from './components/Calendars'
import Login from './components/Auth/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [token, setToken] = useState();
  const [user, setUser] = useState(localStorage.getItem("user") ?? null)

  if(!user) {
    return <Login userDataApp={user} />
  } 
  if(user){
      return <div>{user} is loggged in</div>;
  }
  
  return (
    <div className="App">
          <div className="wrapper">
            <h1>Application</h1>
            <Router>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/calendar" element={<Calendars />} />
                <Route path="/calendar/:calendarID" element={<EventCalendar />} />
              </Routes>
            </Router>
          </div>
    </div>
  );
}

export default App;
