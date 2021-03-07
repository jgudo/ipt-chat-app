import BottomNavigation from 'components/BottomNavigation';
import Navbar from 'components/Navbar';
import Chat from 'pages/Chat';
import CreateRoom from 'pages/CreateRoom';
import Home from 'pages/Home';
import JoinRoom from 'pages/JoinRoom';
import PageNotFound from 'pages/PageNotFound';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from 'routers/PrivateRoute';
import PublicRoute from 'routers/PublicRoute';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <main>
          <Navbar />
          <Switch>
            <PublicRoute exact path="/" component={Home} />
            <PrivateRoute path="/join_room" component={JoinRoom} />
            <PrivateRoute path="/create_room" component={CreateRoom} />
            <PrivateRoute path="/chat/:roomid" component={Chat} />
            <Route component={PageNotFound} />
          </Switch>
          {window.screen.width <= 480 && <BottomNavigation />}
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
