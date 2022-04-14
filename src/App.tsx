import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Styles
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages & Components
import Create from './pages/create/Create';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Project from './pages/project/Project';
import Signup from './pages/signup/Signup';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Sidebar />
        <div className='container'>
          <Navbar />

          <Switch>
            <Route exact path='/'>
              <Dashboard />
            </Route>

            <Route path='/create'>
              <Create />
            </Route>

            <Route path='/project/:id'>
              <Project />
            </Route>

            <Route path='/login'>
              <Login />
            </Route>

            <Route path='/signup'>
              <Signup />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
