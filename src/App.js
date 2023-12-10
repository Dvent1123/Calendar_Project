import './App.css';
import { useState, useEffect  } from "react"
import {EventCalendar} from './components/EventCalendar'
import {Calendars} from './components/Calendars'
import Login from './components/Auth/Login'
import { Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) ?? null)

  const navigate = useNavigate();


  const navigateToCalendar = (id) => {
    navigate(`/calendar/${id}`);
  };

  const navigateToLogin = () => {
    navigate('/');
  };

  useEffect(() => {
    if(!user) {
      navigateToLogin()    
    } 
    if(user){
      navigateToCalendar(user.userID)
    }
  }, [])


  
  return (
    <div className="App">
          <div className="wrapper">
            <h1>Application</h1>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/calendar/:userID" element={<Calendars />} />
                <Route path="/calendar/user/:calendarID" element={<EventCalendar />} />
              </Routes>

          </div>
    </div>
  );
}

export default App;
