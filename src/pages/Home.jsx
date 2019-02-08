import React, {Component, Fragment} from 'react';
import appStore from '../store/appstore';
import { Link } from 'react-router-dom';
import * as remoteActions from '../scripts/remoteActions';
import { observer } from 'mobx-react';
import Header from '../components/Header';
import fire from '../scripts/fire';
import M from 'materialize-css/dist/js/materialize.min';
import logo from './img/logouse.png';


var dB =fire.firestore();
class Home extends Component{

  componentDidMount(){
      // remoteActions.setListenerOnAuthChange()
      document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.slider');
      var instances = M.Slider.init(elems,{'indicators' : true, 'interval': 1600, 'height':400});
    });
  }

  checkAndRetrive = () => {
    dB.collection("users").where("uid", "==", appStore.currentUser.uid)
    .get()
    .then(function(querySnapshot){
      console.log(querySnapshot);
      if(querySnapshot.empty){
        // doc.data() is never undefined for query doc snapshots

        dB.collection("users").add({
          name: appStore.currentUser.displayName,
          uid: appStore.currentUser.uid,
          email: appStore.currentUser.email,
          groups: [] // array of groups instead of object. this will then be an array of objects
        }).then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        }).catch(function(error) {
          console.error("Error adding document: ", error);
        });
      }
      else
        console.log("Document exists:");
    });
  }

  render(){
    return(
      <Fragment>
        <Header/>
        {
          appStore.auth.isLoggedIn ? (
              <Fragment>
                <img class="responsive-img" src={logo} alt="logo"/>
                <div className="actionElements">
                  <button>Create Group</button>
                  <button>Message</button>
                  <button>Add</button>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <img class="responsive-img" src={logo} alt="logo"/>
              </Fragment>
          )
        }
      </Fragment>
    )
  }
}


export default observer(Home);
