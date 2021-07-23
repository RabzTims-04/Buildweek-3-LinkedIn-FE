import {Avatar} from "@material-ui/core";
import * as Icons from "react-bootstrap-icons";
import { CardImage } from "react-bootstrap-icons";
import React, {createRef} from "react";
import {Link } from "react-router-dom";
import "../MainFeed/MainFeed.css";
import InputOptions from "../MainFeed/InputOptions";
import MyLoader from "../../Loaders/MyLoader";
import {
  Image,
  Card,
  Accordion,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
  Modal,
  Container,
  Form,
  Dropdown
} from "react-bootstrap";
import {useState, useEffect} from "react";

const {REACT_APP_BACKEND_URL} = process.env;
const MainFeed = ({post, user, editPost, editPostImg, postDelete}) => {
  const ref = createRef();
  const [edited, setEdited] = useState(false);
  const [commentEdit, setCommentEdit] = useState(false);
  const [postText, setPostText] = useState(post.text);
  const obj = {text: postText};
  let imgObj = {image:post.image}
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState({"text":"", "user":`${user._id}`});
  const [editComments, setEditComments] = useState();
  const objComm = {text: editComments}
  const [commentId, setCommentId] = useState();
  const [likes, setLikes] = useState(false);
  const [likeData, setLikeData] = useState();
  // function to edit post

  function EditPost() {
    if (post.user._id === "60f67bd86bce175ba8dec1d7") {
      setEdited(!edited);
    } else {
      alert("You can't Edit someone's post!!!");
    }
  }

  function EditCommentModel() {
    if (user._id === "60f67bd86bce175ba8dec1d7") {
      setCommentEdit(!commentEdit);
    } else {
      alert("You can't Edit someone's comment!!!");
    }
  }

  async function postComment(e){
    console.log("E",e.key);
    if(e.key ==='Enter'){
      e.preventDefault()
    try {      
      const response = await fetch (`${REACT_APP_BACKEND_URL}/comments/${post._id}`, {
        method: "POST",
        body: JSON.stringify(commentText),
        headers:{
          "Content-type":"application/json"
        }
      })   
      if(response.ok){
        setCommentText({"text":"", "user":`${user._id}`})
        getComments()
      }else{
        console.log("error posting comment")
      }

    } catch (error) {
      console.log(error);
    }
  }
  }

  async function editComment(e){

      e.preventDefault()
    try {      
      const response = await fetch (`${REACT_APP_BACKEND_URL}/comments/${e.currentTarget.id}`, {
        method: "PUT",
        body: JSON.stringify(objComm),
        headers:{
          "Content-type":"application/json"
        }
      })
   
      if(response.ok){
       alert("comment edited successfully")
        setEditComments()
        getComments()
      }else{
        console.log("error posting comment")
      }

    } catch (error) {
      console.log(error);
    }
  }

  async function deleteComment(e) {
    try {
      const response = await fetch (`${REACT_APP_BACKEND_URL}/comments/${e.currentTarget.id}`, {
        method: "DELETE",
      })
      if(response.ok){
        alert("comment deleted successfully")
        getComments()
      }
    } catch (error) {
      console.log(error);
    }
  	}

  const getComments = async() => {
    try {
      const response = await fetch(`${REACT_APP_BACKEND_URL}/comments/${post._id}`)
      const comments = await response.json()
      const data = await comments.reverse()
      console.log(data);
      if(response.ok){
        setComments(data);
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    console.log("hello");
    getComments();
  }, [commentText]);

  async function SubmitEdit() {
    console.log("Editing Final", post._id);

    try {
      console.log(
        `${REACT_APP_BACKEND_URL}/posts/${post._id}`
      );
      let response = await fetch(
        `${REACT_APP_BACKEND_URL}/posts/${post._id}`,
        {
          method: "PUT",
          body: JSON.stringify(obj),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      editPost(data)
      if(response.ok){
      alert("The post has been EDITED! ");
      EditPost();
    }
    } catch (error) {
      console.log(error);
      console.log("There is some error");
    }
  }

  //edit post image

  async function editPostImage(){
    console.log("hello edit image");
    try {
      let formData = new FormData()   
      formData.set('post', imgObj.image)
      if(imgObj.image){
        try {
            const imgresp = await fetch(`${REACT_APP_BACKEND_URL}/posts/${post._id}/image`,{
                method:'POST',
                body:formData,
            })
            console.log(imgresp);
            const data = await imgresp.json();
            editPostImg(data)
            if(imgresp.ok){
              alert("image edited successfully")
            }else{
              console.log("error posting image");
            }
        } catch (error) {
            console.log(error);            
        }
    }  
    } catch (error) {
      console.log(error);
    }
  }

  // function to delete the post;

  async function DeletePost() {
    console.log("Delete the post", post._id);
    if (post.user._id === "60f67bd86bce175ba8dec1d7") {
      try {
        console.log(
          `${REACT_APP_BACKEND_URL}/posts/${post._id}`
        );
        let response = await fetch(
          `${REACT_APP_BACKEND_URL}/posts/${post._id}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        postDelete(data)
        alert("The post has been deleted! ");
      } catch (error) {
        console.log(error);
        console.log("There is some error");
      }
    } else {
      alert("You can only delete your Posts!!");
    }
  }

  async function postLikes() {
    try {
      const response = await fetch(`${REACT_APP_BACKEND_URL}/posts/${user._id}/likes/${post._id}`, {
        method:"POST",
        headers:{
          "content-type":"application/json"
        }
      })
      const data = await response.json();
      console.log(data);
      if(response.ok){
        setLikes(!likes)
        setLikeData(data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const dateFunction = (dateVal) => {
    const today = new Date()
    if(dateVal.getDate() === today.getDate()){
      return "Today"
    }else if(dateVal.getDate() === today.getDate() - 1){
      return "Yesterday"
    }else{
      return dateVal.toDateString()
    }
  }

  console.log(dateFunction(new Date(post.createdAt)));

  return (
    <Accordion defaultActiveKey="0">
      <Card className="MainFeed p-0">
        <div className="MainFeedHeader px-3 pt-3 m-0  d-flex justify-content-between">
          <div className="d-flex">
          <Avatar src={post.user.image} />
          <div className="MainHeaderInfo">
            <h2>{post.user.name + " " + post.user.surname || ""}</h2>
            <p>{post.user.title || ""}</p>
          </div>
          </div>
          <div classname="">
            <p style={{fontSize:"x-small"}} className="text-muted ml-auto p-0 m-0">{dateFunction(new Date(post.createdAt))}</p>
            
            <p style={{fontSize:"x-small"}} className="text-muted ml-auto p-0 mt-1">{new Date(post.createdAt).toLocaleTimeString()}</p>
          </div>
        </div>
        <p className="px-3">{post.text}</p>
        {post.image ?
        <Image src={post.image} className="img-fluid" />
        : <div></div>}
        <hr className="p-0 m-0"></hr>
        <Container>
        <div className="d-flex flex-row comments-btn py-2">
                        <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="like"></img>

                        <img src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" alt="clap"/>  

                        <img src="https://static-exp1.licdn.com/sc/h/54ivsuv8nxk12frsw45evxn3r" alt="APPRECIATION"/> 

                       
                        <span style={{fontSize:'0.7em'}} className="text-muted ml-2 number-span"> <Link style={{fontSize:'1em', fontWeight:'450'}} className="text-muted" to="">{likeData && likeData.likes.length}</Link> </span>
                        

                        <span style={{fontSize:'0.7em'}} className="text-muted ml-2"> <Link style={{fontSize:'1em', fontWeight:'450'}} className="text-muted" to="">{comments && comments.length} {comments && comments.length === 1? "comment":"comments"}</Link> </span>                    
                    </div>
        {post.user._id === "60f67bd86bce175ba8dec1d7" ? (
         
            <div className="MainFeedBodyButtons text-muted ">
              <div id= {likes ? "likeone" : ""}  onClick={postLikes}>
              <InputOptions SVGs={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match m-0" width="24" height="24" focusable="false">
                                <path d="M19.46 11l-3.91-3.91a7 7 0 01-1.69-2.74l-.49-1.47A2.76 2.76 0 0010.76 1 2.75 2.75 0 008 3.74v1.12a9.19 9.19 0 00.46 2.85L8.89 9H4.12A2.12 2.12 0 002 11.12a2.16 2.16 0 00.92 1.76A2.11 2.11 0 002 14.62a2.14 2.14 0 001.28 2 2 2 0 00-.28 1 2.12 2.12 0 002 2.12v.14A2.12 2.12 0 007.12 22h7.49a8.08 8.08 0 003.58-.84l.31-.16H21V11zM19 19h-1l-.73.37a6.14 6.14 0 01-2.69.63H7.72a1 1 0 01-1-.72l-.25-.87-.85-.41A1 1 0 015 17l.17-1-.76-.74A1 1 0 014.27 14l.66-1.09-.73-1.1a.49.49 0 01.08-.7.48.48 0 01.34-.11h7.05l-1.31-3.92A7 7 0 0110 4.86V3.75a.77.77 0 01.75-.75.75.75 0 01.71.51L12 5a9 9 0 002.13 3.5l4.5 4.5H19z"></path>
                                </svg>} title={likes ? "Liked" : "Like"} />
              </div>
          <Accordion.Toggle
            id="accordion_toggle_button"
            as={Button}
            eventKey="1"
            className="d-flex justify-content-between"
          >
              <InputOptions color="grey" SVGs={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                                <path d="M7 9h10v1H7zm0 4h7v-1H7zm16-2a6.78 6.78 0 01-2.84 5.61L12 22v-4H8A7 7 0 018 4h8a7 7 0 017 7zm-2 0a5 5 0 00-5-5H8a5 5 0 000 10h6v2.28L19 15a4.79 4.79 0 002-4z"></path>
                                </svg>} title="Comments" />
          </Accordion.Toggle>
              <InputOptions SVGs={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                                <path d="M23 12l-4.61 7H16l4-6H8a3.92 3.92 0 00-4 3.84V17a4 4 0 00.19 1.24L5.12 21H3l-.73-2.22A6.4 6.4 0 012 16.94 6 6 0 018 11h12l-4-6h2.39z"></path>
                                </svg>} title="Share" />
              {/* <InputOptions SVGs={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                                <path d="M21 3L0 10l7.66 4.26L16 8l-6.26 8.34L14 24l7-21z"></path>
                                </svg>} title="Send" /> */}
              <div onClick={DeletePost} >
                   <InputOptions Icon={Icons.TrashFill} title="Delete"/> 
              </div>
              
              <div onClick={EditPost}>
                <InputOptions Icon={Icons.PencilFill} title="Edit" />
              </div> 
            </div>
         
        ) : (
          <div className="MainFeedBodyButtons text-muted ">
            <div id= {likes ? "like" : ""} onClick={postLikes}>
              <InputOptions SVGs={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match m-0" width="24" height="24" focusable="false">
                                <path d="M19.46 11l-3.91-3.91a7 7 0 01-1.69-2.74l-.49-1.47A2.76 2.76 0 0010.76 1 2.75 2.75 0 008 3.74v1.12a9.19 9.19 0 00.46 2.85L8.89 9H4.12A2.12 2.12 0 002 11.12a2.16 2.16 0 00.92 1.76A2.11 2.11 0 002 14.62a2.14 2.14 0 001.28 2 2 2 0 00-.28 1 2.12 2.12 0 002 2.12v.14A2.12 2.12 0 007.12 22h7.49a8.08 8.08 0 003.58-.84l.31-.16H21V11zM19 19h-1l-.73.37a6.14 6.14 0 01-2.69.63H7.72a1 1 0 01-1-.72l-.25-.87-.85-.41A1 1 0 015 17l.17-1-.76-.74A1 1 0 014.27 14l.66-1.09-.73-1.1a.49.49 0 01.08-.7.48.48 0 01.34-.11h7.05l-1.31-3.92A7 7 0 0110 4.86V3.75a.77.77 0 01.75-.75.75.75 0 01.71.51L12 5a9 9 0 002.13 3.5l4.5 4.5H19z"></path>
                                </svg>} title={likes ? "Liked" : "Like"} />
                </div>
          <Accordion.Toggle
            id="accordion_toggle_button"
            as={Button}
            eventKey="1"
            className="d-flex justify-content-between"
          >
              <InputOptions color="grey" SVGs={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                                <path d="M7 9h10v1H7zm0 4h7v-1H7zm16-2a6.78 6.78 0 01-2.84 5.61L12 22v-4H8A7 7 0 018 4h8a7 7 0 017 7zm-2 0a5 5 0 00-5-5H8a5 5 0 000 10h6v2.28L19 15a4.79 4.79 0 002-4z"></path>
                                </svg>} title="Comments" />
          </Accordion.Toggle>
              <InputOptions SVGs={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                                <path d="M23 12l-4.61 7H16l4-6H8a3.92 3.92 0 00-4 3.84V17a4 4 0 00.19 1.24L5.12 21H3l-.73-2.22A6.4 6.4 0 012 16.94 6 6 0 018 11h12l-4-6h2.39z"></path>
                                </svg>} title="Share" />
               <InputOptions SVGs={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                                <path d="M21 3L0 10l7.66 4.26L16 8l-6.26 8.34L14 24l7-21z"></path>
                                </svg>} title="Send" />              

            </div>
        )}

</Container>
        <Accordion.Collapse eventKey="1">
         <Container> <Row>
            <Col>
            <Form            
            >
              
              <div id="testest" className="pb-0">
                <Image
                  className="border-white mt-2 ml-2"
                  id="post_img"
                  src={user.image}
                  alt="user profilepic"
                  roundedCircle
                />

                <FormControl
                  id="input_accordion_update"
                  placeholder="Add a Comment..."
                  value={commentText.text}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setCommentText({text:e.target.value, user:`${user._id}`})
                  }}
                  onKeyDown={(e)=>postComment(e)} 
                />
              </div>
              
            </Form>
            </Col>
          </Row>
          {comments && comments.map(comment => 
          <Row>
            <Col>
            <Form            
            >
              
              <div id="testest" className="pb-0 my-3">
                <Image
                  className="border-white mt-2 ml-2"
                  id="post_img"
                  src={comment.user.image}
                  alt="user profilepic"
                  roundedCircle
                />

                <div className="d-flex flex-column px-3 pt-2 pb-3 ml-3 comment-section">
                  <div className="d-flex justify-content-between">
                  <div>
                    <a className="d-flex flex-column" href ="">
                      <span className="user-name">{comment.user.name} {comment.user.surname}</span>
                      <span className="text-muted">{comment.user.title}</span>                                   
                    </a> 
                  </div>
                    <div classname="">
                   
                               {comment && comment.user._id === user._id 
                               ?  <svg onClick={() => {
                                  console.log(comment.text);
                                  EditCommentModel() 
                                  setEditComments(comment.text)
                                  setCommentId(comment._id)
                                }}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className=" mercado-match" width="24" height="24" focusable="false">
                                <path d="M14 12a2 2 0 11-2-2 2 2 0 012 2zM4 10a2 2 0 102 2 2 2 0 00-2-2zm16 0a2 2 0 102 2 2 2 0 00-2-2z"></path>                                
                                </svg> : <></>}

                                {commentEdit ? (
                                    <Modal show={commentEdit} onHide={!commentEdit}>
                                      <Modal.Header closeButton>
                                        <Modal.Title>EDIT your Comment ✍🏻</Modal.Title>
                                      </Modal.Header>
                                      <Modal.Body>
                                        <FormControl
                                          id="post_inputfield"
                                          placeholder="Edit the text"
                                          value={editComments}
                                          onChange={(e) => {
                                            console.log(e.target.value, "Modal edit comment");
                                            setEditComments(e.target.value);
                                          }}
                                        />
                                      </Modal.Body>
                                      <Modal.Footer className="d-flex justify-content-around">
                                        <Button variant="light" onClick={EditCommentModel}>
                                          Close
                                        </Button>
                                        <Button variant="light" id={commentId} onClick={(e)=> deleteComment(e)}>
                                          Delete
                                        </Button>
                                        <Button variant="success" id={commentId} onClick={(e)=> editComment(e)}>
                                          Change
                                        </Button>
                                      </Modal.Footer>
                                    </Modal>
                                  ) : (
                                    <></>
                                  )}
                        
                    </div>
                  </div>
              
                <span className="pt-2">{comment.text}</span>
                </div>
              </div>

              <hr></hr>
              
            </Form>
            </Col>
          </Row>
          
          )}
          </Container>
        </Accordion.Collapse>
      </Card>
      {edited ? (
        <Modal show={edited} onHide={!edited}>
          <Modal.Header closeButton>
            <Modal.Title>EDIT your post ✍🏻</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              id="post_inputfield"
              placeholder="Edit the text"
              value={postText}
              onChange={(e) => {
                console.log(e.target.value, "Modal typing");
                return setPostText(e.target.value);
              }}
            />

            <div className="text-center">
            <label className="p-0 d-flex m-0" for="postimg">                               
                               
                                <input 
                                    onClick={(e)=> {e.stopPropagation()
                                    return true}}
                                   hidden
                                    type="file"
                                    title="choose"
                                    id="postimg"
                                    ref={ref}
                                /* id="image" */
                                    onChange={(e) => {
                                     (imgObj = { image :e.target.files[0]})
                                      /* setPostImg({image:e.target.files[0]}) */
                               
                                console.log(e.target.files[0])}}
                                
                                />
                                 </label>
              <div className="d-flex justify-content-between mt-4">
                  <Button variant="outline-primary" onClick={()=> ref.current.click()}>
                    <CardImage className="post_icon" id="photo" style={{color: "#70b5f9"}} />
                    Upload Image
                  </Button>
                  <Button variant="outline-secondary" onClick={()=>editPostImage()}>
                    Save Image
                  </Button>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-around">
            <Button variant="warning" onClick={EditPost}>
              Discard
            </Button>
            <Button variant="danger" onClick={EditPost}>
              Close
            </Button>
            <Button variant="success" onClick={SubmitEdit}>
              Change
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <></>
      )}
    </Accordion>
  );
};

export default MainFeed;
