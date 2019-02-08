import React, {Component, Fragment} from 'react';
import appStore from '../store/appstore.js';
import { Link } from 'react-router-dom';
import * as remoteActions from '../scripts/remoteActions.js';
import { observer } from 'mobx-react';
import Header from '../components/Header';
import fire from '../scripts/fire.js';
import M from 'materialize-css/dist/js/materialize.min.js';
import logo from './logouse.png';
import gareeb1 from './gareeb1.jpg';
import gareeb2 from './gareeb2.png';
import gareeb3 from './gareeb3.jpeg';
import gareeb4 from './gareeb4.jpg';
import gareeb5 from './gareeb5.jpg';
import gareeb6 from './gareeb6.jpg';

const h2s = {

  textAlign : 'center',
  fontFamily : 'Railway',
  fontWeight : 'bold',

}

const imgs = {
  maxWidth : '100%',
  height : '300px'
}

var dB =fire.firestore();
class Home extends Component{

componentDidMount(){
    // remoteActions.setListenerOnAuthChange()
    document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.slider');
    var instances = M.Slider.init(elems,{'indicators' : true, 'interval': 1600, 'height':400});
  });

}
checkAndRetrive(){
   dB.collection("users").where("uid", "==", appStore.currentUser.uid)
  .get()
  .then(function(querySnapshot){
    console.log(querySnapshot);
    if(querySnapshot.empty){
      // doc.data() is never undefined for query doc snapshots


dB.collection("users").add({
    name: appStore.currentUser.displayName,
    uid: appStore.currentUser.uid,
    camps: {}
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

    }
    else{

  console.log("Document exists:");

    }


  })

}

    render(){
      return(
        <Fragment>
        <Header/>

            {
              appStore.auth.isLoggedIn ?

                (
                  <Fragment>
                {

                                this.checkAndRetrive()


                              }



        <img class="responsive-img" src={logo}/>

        <div className = "container">

        <h2 className = "center-align" style = {h2s}> Our Vision </h2>

        <h5 style = {h2s} className = "cyan-text darken-2"> "To improve health and foster other human rights with those most in need by accompanying communities, while educating and inspiring others to action." </h5>

        <p className > We are a private, not-for-profit organization promoting health and other human rights throughout the world. Our principles of action outline the basics of our organization's values. DGH is comprised of hundreds of health professionals, students, educators, artists, attorneys, engineers, retirees and others. Together we build long-term relationships between people and communities around the world to find effective solutions to social justice issues.



Though many of us are health professionals, our solutions extend far beyond the medical. We volunteer our time and expertise in communities that invite us to join them. We fund and support local projects that build on the energy, creativity and passion of local leaders. We educate and advocate for domestic and foreign policies that promote justice and peace. We accompany communities in fulfilling health and other human rights.

</p>
 <br/>

        <h2 style = {h2s}> Fund Raising </h2>

        <p> Though many of us are health professionals, our solutions extend far beyond the medical. We volunteer our time and expertise in communities that invite us to join them. </p>
        <a className='white btn'><font color="green"><Link to="/MsgPage">Donate Now!</Link></font></a>
        </div>
        <br/>


<h2 style = {h2s}> Our Past Experiences </h2>

<div class="row">
    <div class="col s12 m6 l6">
      <div class="card grey lighten-3">
        <div class="card-image">
          <img src={gareeb1} style = {imgs}/>
          <span class="card-title">Card Title</span>
        </div>
        <div class="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
        </div>
      </div>
    </div>
    <div class="col s12 m6 l6">
      <div class="card grey lighten-3">
        <div class="card-image">
          <img src={gareeb2} style = {imgs}/>
          <span class="card-title">Card Title</span>
        </div>
        <div class="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
        </div>
      </div>
    </div>
  </div>
<div class="row">
    <div class="col s12 m6 l6">
      <div class="card grey lighten-3">
        <div class="card-image">
          <img src={gareeb3} style = {imgs}/>
          <span class="card-title">Card Title</span>
        </div>
        <div class="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
        </div>
      </div>
    </div>
    <div class="col s12 m6 l6">
      <div class="card grey lighten-3">
        <div class="card-image">
          <img src={gareeb4} style = {imgs}/>
          <span class="card-title">Card Title</span>
        </div>
        <div class="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
        </div>
      </div>
    </div>
  </div>
<div class="row">
    <div class="col s12 m6 l6">
      <div class="card grey lighten-3">
        <div class="card-image">
          <img src={gareeb5} style = {imgs}/>
          <span class="card-title">Card Title</span>
        </div>
        <div class="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
        </div>
      </div>
    </div>
    <div class="col s12 m6 l6">
      <div class="card grey lighten-3">
        <div class="card-image">
          <img src={gareeb6} style = {imgs}/>
          <span class="card-title">Card Title</span>
        </div>
        <div class="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
        </div>
      </div>
    </div>
  </div>



  </Fragment>
                )
              :
                (
                  <div>

        <img class="responsive-img" src={logo}/>

        <div className = "container">

        <h2 className = "center-align" style = {h2s}> Our Vision </h2>

        <h5 style = {h2s} className = "cyan-text darken-2"> "To improve health and foster other human rights with those most in need by accompanying communities, while educating and inspiring others to action." </h5>

        <p className > We are a private, not-for-profit organization promoting health and other human rights throughout the world. Our principles of action outline the basics of our organization's values. DGH is comprised of hundreds of health professionals, students, educators, artists, attorneys, engineers, retirees and others. Together we build long-term relationships between people and communities around the world to find effective solutions to social justice issues.



Though many of us are health professionals, our solutions extend far beyond the medical. We volunteer our time and expertise in communities that invite us to join them. We fund and support local projects that build on the energy, creativity and passion of local leaders. We educate and advocate for domestic and foreign policies that promote justice and peace. We accompany communities in fulfilling health and other human rights.

</p>


        <h2 style = {h2s}> Fund Raising </h2>

        <p> Though many of us are health professionals, our solutions extend far beyond the medical. We volunteer our time and expertise in communities that invite us to join them. </p>

        </div>


<div class="row">
    <div class="col s12 m6 l6">
      <div class="card grey lighten-3">
        <div class="card-image">
          <img src={gareeb1} style = {imgs}/>
          <span class="card-title">Card Title</span>
        </div>
        <div class="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
        </div>
      </div>
    </div>
    <div class="col s12 m6 l6">
      <div class="card grey lighten-3">
        <div class="card-image">
          <img src={gareeb2} style = {imgs}/>
          <span class="card-title">Card Title</span>
        </div>
        <div class="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
        </div>
      </div>
    </div>
  </div>
<div class="row">
    <div class="col s12 m6 l6">
      <div class="card grey lighten-3">
        <div class="card-image">
          <img src={gareeb3} style = {imgs}/>
          <span class="card-title">Card Title</span>
        </div>
        <div class="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
        </div>
      </div>
    </div>
    <div class="col s12 m6 l6">
      <div class="card grey lighten-3">
        <div class="card-image">
          <img src={gareeb4} style = {imgs}/>
          <span class="card-title">Card Title</span>
        </div>
        <div class="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
        </div>
      </div>
    </div>
  </div>
<div class="row">
    <div class="col s12 m6 l6">
      <div class="card grey lighten-3">
        <div class="card-image">
          <img src={gareeb5} style = {imgs}/>
          <span class="card-title">Card Title</span>
        </div>
        <div class="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
        </div>
      </div>
    </div>
    <div class="col s12 m6 l6">
      <div class="card grey lighten-3">
        <div class="card-image">
          <img src={gareeb6} style = {imgs}/>
          <span class="card-title">Card Title</span>
        </div>
        <div class="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
        </div>
      </div>
    </div>
  </div>



        </div>

                )




            }

        </Fragment>
      )
    }
}


export default observer(Home);
