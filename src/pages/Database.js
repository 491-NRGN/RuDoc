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
import './createGroup.css'
import TextField from '@material-ui/core/TextField';

var db =fire.firestore();
var Diseases1=[
"Malaria", "Dengue", "Filaria", "Chikungunya", "Japanese Encephalitis", "Kaala-Azhar", "Tuberculosis", ,"influenza","diabetes"]
var arr=[]

class Database extends Component {

  constructor(props){
    super(props)
    this.state={
      Disease:[],
      Region: null,
      campId: null
      //add users

    }
  }
  shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
  handleClick(){
    arr = this.shuffle(Diseases1);
    console.log(arr);
    var Disease= arr[0];
    var Region= this.state.Region;



    var campId= randomstring.generate();


       // doc.data() is never undefined for query doc snapshots


   db.collection("Database").add({
     cid: campId,
     Disease,
     Region
     })
 .then(function(docRef) {
     console.log("Document written with ID: ", docRef.id);
 })
 .catch(function(error) {
     console.error("Error adding document: ", error);
 });

 this.setState({
   Disease:null,
   Region: null,

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


                  <span class="black-text name"><h1>Add to Database</h1></span>

                  <br/>
                  <br/>
                  <form noValidate autoComplete="off">
                  <TextField
                  id="outlined-helperText"
                  label="Campaign Region"
                  value = {this.state.Region}
                  onChange = {(e)=>{
                    this.setState({
                      Region: e.target.value
                    })
                  }}
                  margin="normal"
                  variant="outlined"
                />
                  <br/>
                  </form>
                          
                            <button class="button button1" type="submit" name="action" onClick={()=>{this.handleClick()}}>Check Diseases On rise here!
                            <i class="material-icons right">send</i>
                          </button>
                          <br/>
                          <br/>
                          <h6>Disease On rise here at given location (past 5 years): <b>{arr[0]}</b></h6>

                          <Footer/>
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
export default observer(Database);
