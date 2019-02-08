import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import appStore from '../store/appstore';
import { observer } from 'mobx-react';
import M from 'materialize-css/dist/js/materialize.min';
import * as remoteActions from '../scripts/remoteActions';

const styles={
  profile: {
    width:40,
    height:40,
    margin:10
  }
}
 
class Header extends Component {
  
  constructor() {
    super();
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    remoteActions.setListenerOnAuthChange();
    M.AutoInit();
  }

  componentDidUpdate() {
    M.AutoInit()
  }
  
  cool = () => {
    M.AutoInit();
  }

  render(){
    return(
      <div>
      <ul id="dropdown1" class="dropdown-content">
        <li><Link to='/'>Start a campaign</Link></li>
        <li><Link to='/'>View previous campaigns</Link></li>
        <li><Link to='/'>Add testimony</Link></li>
        <li class="divider"></li>
        </ul>
        <nav>
          <div class="nav-wrapper grey lighten-5">
            <Link to='/' className="brand-logo"><font color="green">RuDoc</font></Link>
            <ul class="right">
            {
              appStore.auth.isLoggedIn ? (
                <Fragment>
                  {
                    this.cool()
                  }
                  <li><a class="dropdown-trigger white btn" href="#!" data-target="dropdown1"><font color="green">MENU</font><i class="material-icons right"><font color="green">arrow_drop_down</font></i></a></li>
                    &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                  <li>
                    <button  className='white btn' onClick={remoteActions.signOut}><font color="green"> Sign Out</font></button>
                  </li>

                  &nbsp;&nbsp;&nbsp;
                  <li><button  className='white btn'><font color="green">{appStore.currentUser.displayName}</font></button></li>
                </Fragment>
              ) : (
                <ul>
                  <li><button className='btn white' onClick={remoteActions.signIn}><font color="green">Sign In</font></button></li>
                  <li><Link className="btn white" to = "/about"><font color="green">About Us</font></Link></li>
                </ul>
              )
            }
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default observer(Header);
