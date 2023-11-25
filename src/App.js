import './App.css';
import {EventCalendar} from './components/EventCalendar'
import {Calendars} from './components/Calendars'
import Login from './components/Auth/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
          <div className="wrapper">
            <h1>Application</h1>
            <Router>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/calendar" element={<Calendars />} />
                <Route path="/calendar/calendar1" element={<EventCalendar />} />
              </Routes>
            </Router>
          </div>
    </div>
  );
}

export default App;
