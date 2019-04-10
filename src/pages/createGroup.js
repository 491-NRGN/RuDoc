import React, {Component, Fragment} from 'react';
import * as remoteActions from '../scripts/remoteActions.js';
import Header from '../components/Header.js';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import appStore from '../store/appstore.js';
import { observer } from 'mobx-react';
import M from 'materialize-css/dist/js/materialize.min.js';
import fire from '../scripts/fire.js';
import randomstring from 'randomstring';
import TextField from '@material-ui/core/TextField';
import './createGroup.css'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

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
      status: false,
      testimonials: null,
      anyblog: false
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
    var testimonials= this.state.testimonials
    var anyblog= this.state.anyblog

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
     budget:budget,
     testimonials: testimonials,
     anyblog:anyblog


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
              <div>
                    <div>
              <Header/>


                  <span class="black-text name"><h1>Fundraising Campaign</h1></span>

                  <br/> 
                  <div className = "color">
                  <form noValidate autoComplete="off">
        <TextField
          id="outlined-helperText"
          label="Campaign Name"
          value = {this.state.campName}
          onChange = {(e)=>{
            this.setState({
              campName : e.target.value
            })
          }}
          margin="normal"
          variant="outlined"
        />
        <br/>
        <TextField
          id="outlined-helperText"
          label="Campaign Budget"
          value = {this.state.budget}
          onChange = {(e)=>{
            this.setState({
              budget: e.target.value
            })
          }}
          margin="normal"
          variant="outlined"
        />
        <br/>
          <TextField
          id="outlined-helperText"
          label="Campaign Info"
          value = {this.state.info}
          onChange = {(e)=>{
            this.setState({
              info: e.target.value
             })
          }}
          margin="normal"
          variant="outlined"
        />
        <br/>
        <TextField
          id="outlined-multiline-static"
          label="Campaing Info"
          multiline
          rows="4"
          value = {this.state.info}
          onChange = {(e)=>{
            this.setState({
              info: e.target.value
             })
          }}
          margin="normal"
          variant="outlined"
        />
        <br/>
                <TextField
          id="outlined-helperText"
          label="Campaign Location"
          value = {this.state.location}
          onChange = {(e)=>{
            this.setState({
              location: e.target.value
            })
          }}
          margin="normal"
          variant="outlined"
        />
        <br/>
        <TextField
          id="outlined-helperText"
          label="Campaign Date"
          value = {this.state.date}
          onChange = {(e)=>{
            this.setState({
              date: e.target.value
            })
          }}
          margin="normal"
          variant="outlined"
        />
        <br/>
        </form>
        </div>
                  <br/>
                  
                            <button class="button button1" type="submit" name="action" onClick={()=>{this.handleClick()}}>Submit
                            <i class="material-icons right">send</i>
                          </button>

                          <button class="button button1 disabled" type="submit" name="action" onClick={()=>{this.handleClick()}}>Submit
                            <i class="material-icons right">send</i>
                          </button>
                          </div>

                          <Footer/>
              </div>
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
