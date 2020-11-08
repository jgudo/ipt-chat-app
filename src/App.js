import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Home from 'components/Home';
import Chat from 'components/chat/Chat';
import PageNotFound from 'components/PageNotFound';
import PublicRoute from 'routers/PublicRoute';
import JoinRoom from 'components/JoinRoom';
import PrivateRoute from 'routers/PrivateRoute';
import { useContext } from 'react';
import { AppContext } from 'context/Provider';
import './App.css';
import CreateRoom from 'components/CreateRoom';
import BottomNavigation from 'components/BottomNavigation';


function App() {
  const { user, clearData } = useContext(AppContext);

  return (
    <>
      <BrowserRouter>
        <main>
          <Navbar user={user} clearData={clearData} />
          <Switch>
            <PublicRoute exact path="/" isAuth={user.isAuth} component={Home} />
            <PrivateRoute path="/join_room" isAuth={user.isAuth} component={JoinRoom} />
            <PrivateRoute path="/create_room" isAuth={user.isAuth} component={CreateRoom} />
            <PrivateRoute path="/chat/:roomid" isAuth={user.isAuth} component={Chat} />
            <Route component={PageNotFound} />
          </Switch>
          {window.screen.width <= 480 && <BottomNavigation user={user} />}
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
