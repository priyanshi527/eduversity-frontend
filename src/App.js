import React from 'react';
import './App.css';
import Login from './Login/Login.js';
import { BrowserRouter as Router, useRoutes} from 'react-router-dom';
import StudentLoginPage from './Login/components/StudentLoginPage';
import FacultyLoginPage from './Login/components/FacultyLoginPage';
import StudentPage from './Home/StudentPage';
import FacultyPage from './Home/FacultyPage';
import FacultyNotes from './Notes/FacultyNotes';
import StudentNotes from './Notes/StudentNotes';


const Paths = () => {
  let routes = useRoutes([
    { path: "/student", element: <StudentLoginPage/> },
    { path: "/faculty", element: <FacultyLoginPage/> },
    { path: "/student/home", element: <StudentPage/> },
    { path: "/faculty/home", element: <FacultyPage/> },
    { path: "/notes", element: <FacultyNotes/>},
    { path: '/snotes', element: <StudentNotes/>},
    { path: "/", element: <Login/> },
  ]);
  return routes;
};

function App() {
  return (
    <div className="App">
    <Router>
      <Paths/>
    </Router>
    </div>
  );
}

export default App;
