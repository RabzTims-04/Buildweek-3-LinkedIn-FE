import {Component, createRef} from "react";
import {
  CardImage,
  Youtube,
  CalendarDate,
  Newspaper,
} from "react-bootstrap-icons";
import {
  Container,
  Image,
  FormControl,
  Form,
  Button,
  Modal,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PostFeed.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import FeedPostImage from "./FeedPostImage";
const {REACT_APP_BACKEND_URL} = process.env
class PostFeed extends Component {

  ref = createRef()

  state = {
    feed: {
      text: '',
      user:"60f67bd86bce175ba8dec1d7"
    },
    upload: false,
    close: true,
    post_id: "60cb3cd5956ccd00158537bb", // subsitute post_id; null text input case;
  };
  

    _addPOST = async (e)=>{
      console.log(e.key);
        if(e.key ==='Enter'){
            let formData = new FormData()   
            formData.append('post', this.state.feed.image) 
            e.preventDefault()      
        const url =`${REACT_APP_BACKEND_URL}/posts/`
        try{
            const response = await fetch(url,{
                method:'POST',
                body: JSON.stringify({
                    text:this.state.feed.text,
                    user:this.state.feed.user,
                }),
                headers:{
                    'Content-Type':'application/json'
                }                
            })
            const post = await response.json()
            const postid= await post._id
            console.log(postid);                                
            console.log(this.state.feed); 
            console.log(formData);  
            console.log(formData.get('post')); 
            if(response.ok){
                if(this.state.feed.image){
                    try {
                        const imgresp = await fetch(`${url}${postid}/image`,{
                            method:'POST',
                            body:formData,
                        })
                        console.log(imgresp);
                    } catch (error) {
                        console.log(error);
                        
                    }
                }            

                alert('posted')
                console.log('post',post);
                /* this.props.newPost(post) */
                this.setState({
                  ...this.state,
                  feed: {
                    text: '',
                    user:"60f67bd86bce175ba8dec1d7"
                  },
                })
              }
           else{
                console.log('error')
            }    
        }catch(error){
            console.log(error);
        }
    }
    }

  render() {
    return (
      <>
        <Card className="pb-0" id="post_card">
          <Card.Body id="post_card_body">
            <Form
              
            >
              <div id="testest" className="pb-0">
                <Image
                  className="border-white"
                  id="post_img"
                  src={this.props.user.image}
                  alt="Linkdin Member"
                  roundedCircle
                />

                <FormControl
                  id="post_inputfield"
                  placeholder="Start a Post"
                  value={this.state.feed.text}
                  onChange={(e) => {
                    console.log(e.target.value);
                    return this.setState({
                      ...this.state,
                      feed: {
                        ...this.state.feed,
                        text: e.target.value
                      },
                    });
                  }}
                  onKeyDown={(e)=>this._addPOST(e)}
                />
              </div>
            </Form>

            {/*  */}

            <div id="buttonContainer">
            <label className="p-0 d-flex m-0" for="postimg">
                                
                               
                                <input 
                                    onClick={(e)=> {e.stopPropagation()
                                    return true}}
                                   hidden
                                    type="file"
                                    title="choose"
                                    id="postimg"
                                    ref={this.ref}
                                /* id="image" */
                                    onChange={(e) => {this.setState({
                                      ...this.state,
                                        feed:{
                                          ...this.state.feed, 
                                            image: e.target.files[0]}
                                })
                                console.log(e.target.files[0])}}
                                
                                />
                                 </label>
              <Button onClick={()=> this.ref.current.click()}>
                <CardImage className="post_icon" id="photo" style={{color: "#70b5f9"}} />
                Photos
              </Button>

              <Button onClick={this.checkStateUpload}>
                <Youtube className="post_icon" id="video" style={{color: "#7fc15e"}} />
                Videos
              </Button>

              <Button onClick={this.checkStateUpload}>
                <CalendarDate className="post_icon" id="event" style={{color: "#e7a33e"}} />
                Events
              </Button>
              <Button onClick={this.checkStateUpload}>
                <Newspaper className="post_icon" id="article" style={{color: "#f5987e"}} />
                Write Article
              </Button>
            </div>
          </Card.Body>
        </Card>

      </>
    );
  }
}

export default PostFeed;
