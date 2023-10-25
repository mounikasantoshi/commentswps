import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment-new";
import { useParams } from 'react-router-dom';
import Login from '../authentication/Login';

import {
  //getComments as getCommentsApi,
  getDevBlogsComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../api";

const Comments = ({ commentsUrl, currentUserId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const params = useParams();
  const [error, setError] = useState(false);
  const [state, setState] = useState('');
  const [index , setIndex] = useState (10);
  const [isCompleted, setIsCompleted] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  const [isShownEditor, setIsShownEditor] = useState(false);
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(false);

  // console.log('activeComment',activeComment);
  // console.log("params", params);
  // console.log("isShown", isShownEditor);
  //const [devblogsComment, setDevBlogsComment] = useState(null);
  // const rootComments = backendComments.filter(
  //   (backendComment) => backendComment.parentId === null
  // );
  //console.log(devblogsComment);
  // const getReplies = (commentId) =>
  //   backendComments
  //     .filter((backendComment) => backendComment.parentId === commentId)
  //     .sort(
  //       (a, b) =>
  //         new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  //     );

  
  const addComment = (text, parentId) => {
    createCommentApi(text, parentId, params).then((comment) => {
        apiFun();
        setActiveComment(null);
    });
  };

  console.log('activeComment',activeComment);

  const updateComment = (text, commentId) => {
    console.log("text", text);
    console.log("commentId", commentId);
    updateCommentApi(text, commentId, params).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, content: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  const apiFun = () => {
    getCommentsApi(params, index).then((response) => {
      //console.log("data", response);
      if(response.post) {
       setBackendComments(response.post.comments.nodes);
       console.log('Commetns response', response.post.comments.nodes)
       // Check next page comments
        setCommentsCount(response.post.commentCount);  
        console.log("nextPage", response.post.comments.pageInfo.hasNextPage)
        if (!response.post.comments.pageInfo.hasNextPage) {
            setIsCompleted(true)
        } else {
            setIsCompleted(false)
        }
        // Close editor if open
        setIsShownEditor(false);

      } else {
        //console.error('Error:', "Comments not found");
        setState('error');
        setError("Comments not found");
      }
    }).catch((err) => {
      //console.error('Error:', err);
      setState('error');
      setError(err);
    });
  } 

  useEffect(() => {
    apiFun();
  },[params, index]);

  useEffect(() => {
    if (state === 'error') {
      return (
          <h1>
              {error.toString()}
          </h1>
      );
    }
  },[state, error])
  
  //console.log("backendComments",backendComments); 
  useEffect(() => {
    //console.log("backendComments",backendComments);
  }, [backendComments])

  // Load more
  const loadMore = () => {
    setIndex(index + 10)
    console.log("index", index);    
  }

  const handleWriteClick = event => {
    // 👇️ toggle shown state
    setIsShownEditor(current => !current);
    //setIsShownEditor(true);
  };

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("user_details");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log("foundUser", foundUser);
      setUser(foundUser);  
    }
  }, [isShownEditor]);

  const loginCallback = (loginData)=>{
    console.log('login user data', loginData);
    setIsLogin(loginData)
  }

  useEffect(() => {
    console.log('Is login status', isLogin);
  }, [isLogin])

  //console.log('Is login status', isLogin);

  return (
    <div className="comments">
      <Login handleCallback={loginCallback}/>
      <h3 className="comments-title">{commentsCount} Comments</h3>
      {/* <div className="comment-form-title" onCick={handleWriteClick}>Leave a comment</div> */}
      { isLogin && (
        <>
          <button className="button btnLarge" onClick={handleWriteClick}>Leave a comment</button>

          {isShownEditor && (
            <CommentForm submitLabel="Write" handleSubmit={addComment} />
          )}
        </>
      )}
      <div className="comments-container">
        {backendComments?.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={rootComment.replies}
            //replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
      {backendComments.length > 0 && (
        <>
        {isCompleted ? (
            <button
              onClick={loadMore}
              type="button"
              className="btn-loadmore button btnSmall" disabled
            >
              That's It
            </button>
          ) : (
            <button onClick={loadMore} type="button" className="btn-loadmore button btnSmall">
              Load More..
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Comments;
