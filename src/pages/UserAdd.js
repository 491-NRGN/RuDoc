import React, {Component, Fragment} from 'react';
import appStore from '../store/appstore.js';
import { Link } from 'react-router-dom';
import * as remoteActions from '../scripts/remoteActions.js';
import { observer } from 'mobx-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fire from '../scripts/fire.js';
import firebase from 'firebase';
import TextField from '@material-ui/core/TextField';


var db =fire.firestore();

class UserAdd extends Component{

  constructor(props){
    super(props)
    this.state=({
      //add shit
      budget:0,
      name:null,
      cid:null,
      fund:0,
      fundx:0
    })
  }
handleClick(){

    var fund1=Number(this.state.fundx);
    var fundy=Number(this.state.fund) + fund1
    this.setState({
      fund: fundy,
      fundx:0
    })

    alert ("You donated"+fund1 +"Thank YOU!")



}
  grouping(){
    var cid= this.props.match.params.cid;




    db.collection("campaign").where("cid", "==", cid)
    .get()
    .then((querySnapshot)=> {
        querySnapshot.forEach((doc)=> {
            // doc.data() is never undefined for query doc snapshots
            this.setState({
              budget: doc.data().budget,
              name: doc.data().name,
              fund: doc.data().fund


            })
        });
    })

    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

  componentDidMount(){
         remoteActions.setListenerOnAuthChange();
         this.grouping();
    }

render(){
  return(

    <Fragment>

      {
          appStore.auth.isLoggedIn ?
          (

                  <Fragment>

                      <Header/>
                      <h1>Project: {this.state.name}</h1>
                      <h6>Collection Aim: {this.state.budget}</h6>
                      <h6>Collected Amount: {this.state.fund}</h6>
                      <br/><br/>
                      <TextField
          id="outlined-helperText"
          label="Donation Amount"
          value = {this.state.fundx}
          onChange = {(e)=>{
            this.setState({
              fundx: e.target.value
            })
          }}
          margin="normal"
          variant="outlined"
        />
        <br/>
                      <div class="row">
                            <form class="col s12">
                              <div class="row">
                                <div class="input-field col s12">
                                  <input value={this.state.fundx} id="email"  class="active" onChange={(e)=>{
                                    this.setState({
                                      fundx: e.target.value
                                    })
                                  }}/>
                                  <label class="active"><font color="green">Please donate generously</font></label>
                                  <span class="helper-text " data-error="wrong" data-success="right"><font color="green">Donation-amount</font></span>
                                </div>
                              </div>
                            </form>
                            <button class="btn waves-effect waves-light center-align" type="submit" name="action" onClick={()=>{this.handleClick()}}>Donate!
                            <i class="material-icons right">send</i>

                          </button>

                          </div>
                          <Footer/>
                  </Fragment>


          )
            :
          (
            <Fragment>

                <Header/>
                <h1>Project: {this.state.name}</h1>
                <h6>Collection Aim: {this.state.budget}</h6>
                <h6>Collected Amount: {this.state.fund}</h6>
                <br/><br/>
                <TextField
          id="outlined-helperText"
          label="Donation Amount"
          value = {this.state.fundx}
          onChange = {(e)=>{
            this.setState({
              fundx: e.target.value
            })
          }}
          margin="normal"
          variant="outlined"
        />
        <br/>
                <div class="row">
                      <form class="col s12">
                        <div class="row">
                          <div class="input-field col s12">
                            <input value={this.state.fundx} id="email"  class="active" onChange={(e)=>{
                              this.setState({
                                fundx: e.target.value
                              })
                            }}/>
                            <label class="active"><font color="green">Please donate generously</font></label>
                            <span class="helper-text " data-error="wrong" data-success="right"><font color="green">Donation-amount</font></span>
                          </div>
                        </div>
                      </form>
                      <button class="btn waves-effect waves-light center-align" type="submit" name="action" onClick={()=>{this.handleClick()}}>Donate!
                      <i class="material-icons right">send</i>

                    </button>

                    </div>
                    <Footer/>
            </Fragment>
          )


      }

    </Fragment>


  )
}

}
export default observer(UserAdd)
