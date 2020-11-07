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


function App() {
  const { user, clearData } = useContext(AppContext);

  return (
    <>
      <Navbar user={user} clearData={clearData} />
      <BrowserRouter>
        <main>
          <Switch>
            <PublicRoute exact path="/" isAuth={user.isAuth} component={Home} />
            <PrivateRoute path="/join_room" isAuth={user.isAuth} component={JoinRoom} />
            <PrivateRoute path="/create_room" isAuth={user.isAuth} component={CreateRoom} />
            <PrivateRoute path="/chat/:roomid" isAuth={user.isAuth} component={Chat} />
            <Route component={PageNotFound} />
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
