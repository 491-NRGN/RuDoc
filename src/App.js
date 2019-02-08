import React, { Component } from 'react';
import Home from './pages/Home';
import createGroup from './pages/createGroup';
import existingGroups from './pages/existingGroups';
import MsgPage from './pages/MsgPage';
import AddPar from './pages/AddPar';
import UserAdd from './pages/UserAdd'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import './index.css';
class App extends Component {
  render() {
    return (
      <div>
      <Router>
        <div>
          <Route exact path='/' component={Home}/>
          <Route exact path='/createGroup' component={createGroup}/>
          <Route exact path='/existingGroups' component={existingGroups}/>
          <Route exact path='/MsgPage' component={MsgPage}/>
          <Route exact path='/MsgPage/:cid' component={UserAdd}/>
          
        </div>
      </Router>
      </div>

    );
  }
}

export default App;
