import {useEffect, useState} from "react";
import MainFeed from "./MainFeed";
// import PostFeed from "../PostFeed/PostFeed";
import {DropdownButton, Dropdown, Modal} from "react-bootstrap";
import {Button} from "@material-ui/core";
import MyLoader from "../../Loaders/MyLoader";
import MainFeed2 from "./MainFeed2";

const {REACT_APP_BACKEND_URL} = process.env;
const GetPosts = (props) => {

  const [posts, setPosts] = useState([]);
  const [quickRead, setQuickRead] = useState(false);
  const [editPost, setEditPost] = useState("");
  const [editPostImg, setEditPostImg] = useState("");
  const [delPost, setDelPost] = useState("");

  //funtion to toggle quickread
  function showQuickRead() {
    setQuickRead(!quickRead);
  }
  function handleClose() {
    setQuickRead(!quickRead);
  }

  const postEdited =(data) => {
    setEditPost(data);
  }

  const postImg = (imgdata) => {
    setEditPostImg(imgdata)
  }

  const postDel = (delpost) => {
    setDelPost(delpost)
  }

  const getData = async () => {
    console.log("HI THERE");
    try {
      let response = await fetch(`${REACT_APP_BACKEND_URL}/posts`);

      console.log(response);

      let posts = await response.json();
      console.log(posts);

      setPosts(posts);
      console.log("Posts", posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  },[props.newPost, editPost, editPostImg, delPost])

  useEffect(() => {
    console.log("hello");

    getData();
  }, []);

  // usage

  return (
    <>
      <Button type="button" onClick={showQuickRead}>
        {" "}
        Quick Read{" "}
      </Button>
      {quickRead ? (
        <Modal show={quickRead} onHide={handleClose}>
          <Modal.Header
            closeButton
            className="d-flex justify-content-center"
            style={{backgroundColor: "black"}}
          >
            <Modal.Title className="ml-5 pl-5" style={{color: "grey"}}>
              Quick Read Mode
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{backgroundColor: "black"}}>
            <>
              <div>
                {false ? (
                  <div></div>
                ) : (
                  posts
                    .map((post) => {
                      return (
                        <div>
                          <MainFeed2 key={post._id} post={post} />
                        </div>
                      );
                    })
                    .reverse()
                )}
              </div>
            </>
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}

      <div>
        <div id="hr_divider">
          <hr class="horizontal" />
          <span className="text-muted align-baseline">Sort by:</span>
          <DropdownButton className="btn-sm">
            <Dropdown.Item eventKey="1">Top</Dropdown.Item>
            <Dropdown.Item eventKey="2">Recent</Dropdown.Item>
          </DropdownButton>
        </div>
        {props.isLoading === true ? (
          <MyLoader />
        ) : (
          posts
            .map((post) => {
              return (
                <div>
                  <MainFeed postDelete={postDel} editPostImg={postImg} editPost={postEdited} user={props.user} key={post._id} post={post} />
                </div>
              );
            })
            .reverse()
        )}
      </div>
    </>
  );
};

export default GetPosts;
