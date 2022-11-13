// import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  BrowserRouter as Router,
  
  Route,
  Routes
  
  } from "react-router-dom"
import Loginn from './components/login/Loginn';
import Savee from "./components/savings/Savee";
const App = () => (
  <Router>


      <Routes>
        <Route path="/" element={<Loginn/>} />
        <Route path="/save" element={<Savee />} />
      </Routes>

  </Router>
);

export default App;
