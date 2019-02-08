import React, {Component, Fragment} from 'react';
import * as remoteActions from '../scripts/remoteActions';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import appStore from '../store/appstore';
import { observer } from 'mobx-react';
import M from 'materialize-css/dist/js/materialize.min';
import fire from '../scripts/fire';
import randomstring from 'randomstring';
var db =fire.firestore();

class createGroup extends Component {

  constructor(props){
    super(props)
    this.state={
      campName:null,
      budget: 0,
      info: null,
      location: null,
      date: null,
      fund:0,
      status: false
      //add users

    }
  }
  handleClick(){
    var campName= this.state.campName;
    var budget= this.state.budget;
    var info= this.state.info;
    var location= this.state.location;
    var date=this.state.date;
    var fund=this.state.fund;

    console.log("chutiya" + campName);
    var campId= randomstring.generate();


      db.collection("users").where("uid", "==", appStore.currentUser.uid)
    .get()
    .then(function(querySnapshot) {

        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var dId= doc.id
            var campDict=doc.data().camps
            campDict[campId]= campName


            var washingtonRef = db.collection("users").doc(dId);

            // Set the "capital" field of the city 'DC'
          washingtonRef.update({
                camps: campDict

              });
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });




       // doc.data() is never undefined for query doc snapshots


   db.collection("campaign").add({
     cid: campId,
     name: campName,
     users: {
       [appStore.currentUser.uid] : appStore.currentUser.displayName
     },
     info: info,
     location: location,
     date: date,
     fund: fund,
     status: true,
     budget:budget

 })
 .then(function(docRef) {
     console.log("Document written with ID: ", docRef.id);
 })
 .catch(function(error) {
     console.error("Error adding document: ", error);
 });

 this.setState({
   campName: "",
   budget: 0,
   info: "",
   location: "",
   date: "",
   status: false

 })

}

componentDidMount(){
       remoteActions.setListenerOnAuthChange()
  }
  componentDidUpdate(){
    M.AutoInit();
    M.updateTextFields();
  }
  render(){
    return(
      <Fragment>

        {

          appStore.auth.isLoggedIn ?
            (
              <Fragment>
              <Header/>


                  <span class="black-text name"><h1>Fundraising Campaign</h1></span>

                  <br/>
                  <br/>
                  <br/>
                          <div class="row">
                            <form class="col s12">
                              <div class="row">
                                <div class="input-field col s12">
                                  <input value={this.state.campName} id="email"  class="active" onChange={(e)=>{
                                    this.setState({
                                      campName: e.target.value
                                    })
                                  }}/>
                                  <label class="active"><font color="green">Be informative</font></label>
                                  <span class="helper-text " data-error="wrong" data-success="right"><font color="green">Campaign-Name</font></span>
                                </div>
                              </div>
                              <div class="row">
                                <div class="input-field col s12">
                                  <input value={this.state.budget} id="email"  class="active" onChange={(e)=>{
                                    this.setState({
                                      budget: e.target.value
                                    })
                                  }}/>

                                  <span class="helper-text " data-error="wrong" data-success="right"><font color="green">Campaign-Budget</font></span>
                                </div>

                              </div>
                              <div class="row">
                                <div class="input-field col s12">
                                  <input value={this.state.info} id="email"  class="active" onChange={(e)=>{
                                    this.setState({
                                      info: e.target.value
                                    })
                                  }}/>

                                  <span class="helper-text " data-error="wrong" data-success="right"><font color="green">Campaign-Info</font></span>
                                </div>

                              </div>
                              <div class="row">
                                <div class="input-field col s12">
                                  <input value={this.state.location} id="email"  class="active" onChange={(e)=>{
                                    this.setState({
                                      location: e.target.value
                                    })
                                  }}/>

                                  <span class="helper-text " data-error="wrong" data-success="right"><font color="green">Campaign-Location</font></span>
                                </div>

                              </div>
                              <div class="row">
                                <div class="input-field col s12">
                                  <input value={this.state.date} id="email"  class="active" onChange={(e)=>{
                                    this.setState({
                                      date: e.target.value
                                    })
                                  }}/>

                                  <span class="helper-text " data-error="wrong" data-success="right"><font color="green">Campaign-Dates</font></span>
                                </div>

                              </div>
                            </form>
                            <button class="btn waves-effect waves-light center-align" type="submit" name="action" onClick={()=>{this.handleClick()}}>Submit
                            <i class="material-icons right">send</i>
                          </button>
                          </div>


              </Fragment>
            )
          :
            (
                <Link to='/'><h1> Let's Sign-in First</h1></Link>
            )
        }
      </Fragment>

    )
  }

}
export default observer(createGroup);
