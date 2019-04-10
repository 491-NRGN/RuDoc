import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import appStore from '../store/appstore';
import { observer } from 'mobx-react';
import M from 'materialize-css/dist/js/materialize.min.js';
import * as remoteActions from '../scripts/remoteActions';
const styles={
  profile:{
    width:40,
    height:40,
    margin:10

  }
}
 class Header extends Component {



  state={
    user:null
  }


  componentDidMount(){
    remoteActions.setListenerOnAuthChange();
    M.AutoInit();
  }
  componentDidUpdate(){
    M.AutoInit()

  }
cool(){
  M.AutoInit();
}

  render(){
    return(
        <div>
        <ul id="dropdown1" class="dropdown-content">
          <li><Link to='/createGroup'> Start a campaign</Link></li>
          <li><Link to='/about'>About Us</Link></li>
          <li><Link to='/'>Verify Yourself</Link></li>
          <li><Link to='/Blogs'>Blogs</Link></li>
          </ul>
          <ul id="dropdown2" class="dropdown-content">
            <li><Link to='/existingGroups'>Write Testimony</Link></li>
            <li><Link to='/Database'>Diseases</Link></li></ul>
          <nav>
              <div class="nav-wrapper blue-grey darken-3">
                <a class="brand-logo cyan-text text-lighten-4"><Link to='/'><font color = "cyan">RuDoc</font></Link></a>
                <a href="#" data-target="mobile-demo" className="right sidenav-trigger cyan-text text-lighten-4" ><i className="material-icons">menu</i></a>


                  {
                    appStore.auth.isLoggedIn?
                    (
                      <Fragment>
                      {
                        this.cool()
                      }
                                  <ul className="right hide-on-med-and-down">

                        <li><a class="dropdown-trigger cyan-text text-lighten-4" href="#!" data-target="dropdown1">MENU<i class="material-icons right">arrow_drop_down</i></a></li>
                         &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                        <li>
                          <a  className='cyan-text text-lighten-4' onClick={remoteActions.signOut}> Sign Out</a>
                        </li>

                        &nbsp;&nbsp;&nbsp;
                        <li><a  className='dropdown-trigger cyan-text text-lighten-4' href="#!" data-target="dropdown2">{appStore.currentUser.displayName}<i class="material-icons right">arrow_drop_down</i></a></li>

                        </ul>
                         <ul className = "sidenav" id="mobile-demo">
                         <li>
                          <Link to  className='white btn green-text' onClick={remoteActions.signOut}> Sign Out</Link>
                        </li>

        <li><Link to='/createGroup'> Start a campaign</Link></li>


          <li><Link to='/'>Verify yourself</Link></li>
          <li><Link to='/existingGroups'>Write Testimony</Link></li>
          <li><Link to='/Database'>Diseases</Link></li>
          <li><Link to='/Blogs'>Blogs</Link></li>
          <li><Link to='/about'>About Us</Link></li>
  </ul>
                      </Fragment>
                    ) :
                    (
                      <Fragment>
                       <ul className="right hide-on-med-and-down">
                        <li>
                          <a className=' cyan-text text-lighten-4' onClick={remoteActions.signIn}>Sign In</a>
                        </li>
                        <li><Link className="cyan-text text-lighten-4" to = "/Blogs">Blogs</Link></li>
                        <li><Link className="cyan-text text-lighten-4" to = "/about">About Us</Link></li>
                        </ul>
                                  <ul className = "sidenav" id="mobile-demo">
                                  <li>
                          <Link to className='white btn green-text' onClick={remoteActions.signIn}> Sign In</Link>
                        </li>
            <li><Link to='/Blogs'>Blogs</Link></li>
          <li><Link to='/about'>About Us</Link></li>


  </ul>

                          </Fragment>
                    )
                  }

              </div>
            </nav>
        </div>


    );
  }
}
export default observer(Header);