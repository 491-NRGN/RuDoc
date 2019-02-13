import React, {Component, Fragment} from 'react';
import appStore from '../store/appstore.js';
import { Link } from 'react-router-dom';
import * as remoteActions from '../scripts/remoteActions.js';
import { observer } from 'mobx-react';
import Header from '../components/Header';
import fire from '../scripts/fire.js';
import firebase from 'firebase';
var db =fire.firestore();

class AddPar extends Component{          

  constructor(props){
    super(props)
    this.state=({
      testimonials:null,
      testimonials1:null,
      name: null,
      dId:null
    })
  }

  componentDidMount(){
         remoteActions.setListenerOnAuthChange();
         this.grouping();
    }

    handleClick(){

        var fund1=this.state.testimonials1;
        var cid= this.props.match.params.cid;
        db.collection("campaign").where("cid", "==", cid)
        .get()
        .then((querySnapshot)=> {
            querySnapshot.forEach((doc)=> {
                // doc.data() is never undefined for query doc snapshots
                var dId=doc.id
                var washingtonRef = db.collection("campaign").doc(dId);

              // Set the "capital" field of the city 'DC'
            washingtonRef.update({
                  testimonials: fund1,
                  anyblog: true

                });
        this.setState({

          testimonials1: null
        })


})
})
}


    grouping(){
      var cid= this.props.match.params.cid;
      db.collection("campaign").where("cid", "==", cid)
      .get()
      .then((querySnapshot)=> {
          querySnapshot.forEach((doc)=> {
              // doc.data() is never undefined for query doc snapshots
              this.setState({
                name: doc.data().name,


              })
          });
      })

      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
    }


render(){
var gid=this.props.match.params.groupId;
  return(

          <Fragment>

            {
                appStore.auth.isLoggedIn ?
                (
                  <Fragment>
                  <Header/>
                  <h1>Project: {this.state.name}</h1>

                  <br/><br/>
                  <div class="row">
                        <form class="col s12">
                          <div class="row">
                            <div class="input-field col s12">
                              <input value={this.state.testimonials1} id="email"  class="active" onChange={(e)=>{
                                this.setState({
                                  testimonials1: e.target.value
                                })
                              }}/>
                              <label class="active"><font color="green">Please be informative</font></label>
                              <span class="helper-text " data-error="wrong" data-success="right"><font color="green">Blog-test</font></span>
                            </div>
                          </div>
                        </form>
                        <button class="btn waves-effect waves-light center-align" type="submit" name="action" onClick={()=>{this.handleClick()}}>Submit!
                        <i class="material-icons right">send</i>

                      </button>

                      </div>
                  </Fragment>

                )
                  :
                (
                    <button class="btn waves-effect waves-light center-align"><Link to='/'><h1> Let's Sign-in First</h1></Link></button>
                )


            }

          </Fragment>

  )
}

}
export default observer(AddPar);
