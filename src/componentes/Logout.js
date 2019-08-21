import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {PostData} from '../api/PostData';

class Logout extends Component {
 

    constructor(props) {
      super(props);
  
      this.state = {
        data:[],
        redirectToReferrer: false
      };
      this.logout = this.logout.bind(this);
    }

     logout(){
       sessionStorage.setItem("userData",'');
       sessionStorage.clear();
       this.setState({redirectToReferrer: true});
     }
  
    render() {
      if (this.state.redirectToReferrer) {
        return (<Redirect to={'/'}/>)
      }
  
      return (
        <div className="row" id="Body">
          <div className="medium-12 columns">
              <button type="button" className='btn btn-danger' onClick={this.logout}> Logout </button>
          </div>      
        </div>
      );
    }
  }
  
  export default Logout;