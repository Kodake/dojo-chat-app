import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

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
import OnlineUsers from './components/OnlineUsers';

const App = () => {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className='App'>
      {authIsReady && (
        <BrowserRouter>
          {user &&
            <Sidebar />
          }
          <div className='container'>
            <Navbar />

            <Switch>
              <Route exact path='/'>
                {!user && <Redirect to='/login' />}
                {user && <Dashboard />}
              </Route>

              <Route path='/create'>
                {!user && <Redirect to='/login' />}
                {user && <Create />}
              </Route>

              <Route path='/project/:id'>
                {!user && <Redirect to='/login' />}
                {user && <Project />}
              </Route>

              <Route path='/login'>
                {user && <Redirect to='/' />}
                {!user && <Login />}
              </Route>

              <Route path='/signup'>
                {user && <Redirect to='/' />}
                {!user && <Signup />}
              </Route>
            </Switch>
          </div>

          {user &&
            <OnlineUsers />
          }
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
