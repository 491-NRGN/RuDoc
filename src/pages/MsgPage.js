import React, {Component, Fragment} from 'react';
import appStore from '../store/appstore.js';
import { Link } from 'react-router-dom';
import * as remoteActions from '../scripts/remoteActions.js';
import { observer } from 'mobx-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fire from '../scripts/fire.js';
import firebase from 'firebase';
var db =fire.firestore();

const imgs = {
  maxWidth : '100%',
  height : '260px'
}

class MsgPage extends Component{
  constructor(props){
    super(props)
    this.state={
      message:[],
      campID: null,
      campInfo: null,
      campBudget:0,
      campDate:null,
      location: null


    }
  }

//   grouping(){
//     var groupId= this.props.match.params.groupId;
//     console.log(groupId);
//
//     //IDHAR MID KA PRAYOG HUA
//     db.collection("groups").where("gid", "==", groupId)
//     .get()
//     .then((querySnapshot)=> {
//         querySnapshot.forEach((doc)=> {
//             // doc.data() is never undefined for query doc snapshots
//             this.setState({
//               groupId: doc.data().gid,
//               groupName: doc.data().name,
//               type:""
//             })
//         });
//     })
//     .catch(function(error) {
//         console.log("Error getting documents: ", error);
//     });
//   }
  componentDidUpdate() {
    console.log("Component Did Update!");
    }

   componentDidMount(){
     remoteActions.setListenerOnAuthChange();

       this.handleClick()

   }
//
 handleClick(){


//THE retrieving message GROUP SHIT
  db.collection("campaign").where("status", "==", true)
  .get()
  .then((querySnapshot)=> {
      var arrId = []
      var arrName=[]
      var finalArr=[]
      var lamba=0
      querySnapshot.forEach((doc)=> {
          // doc.data() is never undefined for query doc snapshots
          var campId= doc.data().cid
          var campName= doc.data().name
          var info= doc.data().info
          var bud=doc.data().budget
          var location= doc.data().location
          var date= doc.data().date
          var campInfo= "Project: "+campName+ "\n" +"Information: "+ info+"\n"+"Location: "+location+"\n"+"Budget: "+bud+ "\n" + "Date: "+ date;
          console.log(campInfo)
          arrId.push(campId) //id
          arrName.push(campInfo) //name
      });

      var result =  arrName.reduce((result, field, index)=> {
        lamba=lamba+1;
        result[arrId[index]] = field;
        var key=arrId[index]
        var value= field
        var dict={
          [arrId[index]]: value
        }
        console.log(key)
          finalArr.push(dict)
          // finalArr.push({result})


        return result;
      }, {})
      this.setState({
        message: finalArr
      });

      console.log(this.state.message)
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
}

render(){

  return(
      <Fragment>
        {
            appStore.auth.isLoggedIn ?
            (
              <Fragment>

                <Header/>

                  <ul>

                  <h1> List of active Fundraising campaigns</h1>

                  {

                    this.state.message.map((m, i)=>{
                      console.log("hello121")
                      for(var x in m){
                        var y= m[x]
                        console.log(x)
                      }

                      return(

                      <li>
                      <div>
                      <pre key={i}>
                      <div class="row">
                        <div class="col s12 m6">
                          <div class="card">
                               <div class="card-content white-text">
                              <p><b>{y}</b></p>
                            </div>
                            <div class="card-action">
                              <Link to={"/MsgPage/"+x}>Donate Us!</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      </pre></div></li>
                    )
                    })
              }






                </ul>
                <Footer/>
              </Fragment>

            )
             :
            (

              <Fragment>

                <Header/>

                  <ul>

                  <h1> List of active Fundraising campaigns</h1>

                  {

                    this.state.message.map((m, i)=>{
                      console.log("hello121")
                      for(var x in m){
                        var y= m[x]
                        console.log(x)
                      }

                      return(

                      <li>
                      <div>
                      <pre key={i}>
                      <div class="row">
                        <div class="col s12 m6">
                          <div class="card">
                               <div class="card-content black-text">
                              <p><b>{y}</b></p>
                            </div>
                            <div class="card-action">
                              <Link to={"/MsgPage/"+x}>Donate Us!</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      </pre></div></li>
                    )
                    })
              }






                </ul>
                <Footer/>
              </Fragment>
            )

        }

      </Fragment>
  )
}

}
export default observer(MsgPage);
