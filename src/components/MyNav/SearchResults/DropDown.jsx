import "./search.css";
// import {Container} from "react-bootstrap"
import {Search} from "react-bootstrap-icons";
import React from "react"
import {Link} from "react-router-dom"

class SearchDropDown extends React.Component {
    state = {  }
    render() { 
        return (
            <div className="dropdown-search ml-2" >
            <div id="myDropdown" className="dropdown-content " >
              {this.props.profiles.map((profile) => 
              <Link className="pe-3" to={()=> `/profile/${profile.name}/${profile._id}`}  id="userProfileLink"  key={profile.id}>
                  <Search /><span className="ml-3" style={{fontFamily:"arial",color:"rgb(5,5,5)"}}>
                            {profile.name} <span style={{fontWeight:"500"}}>{profile.surname}
                                </span>
                            <span className="px-2">&#8226;</span>
                            <small style={{color:"rgba(0,0,0,.6)"}}>
                           {profile.experiences[0].role} at {profile.experiences[0].company}</small>
                           </span>
               </Link>
                )}
            </div>
          </div>
        

         );
    }
}
 
export default SearchDropDown;