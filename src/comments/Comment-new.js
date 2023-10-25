import CommentForm from "./CommentForm";
import ReactHtmlParser from 'html-react-parser';

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {

  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete = currentUserId === comment.userId && replies?replies.nodes.length === 0 : 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  //console.log("canReply 1", canReply);
  //console.log("currentUserId 1", currentUserId);
  //console.log("comment.userId", comment.userId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const replyId = parentId ? parentId : comment.id;
  //const createdAt = new Date(comment.date).toLocaleDateString();
  //const createdAt = new Date(comment.date).toLocaleString();
  //console.log('comment data',comment)
  const createdAt = comment.date;
  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <img src="/user-icon.png" />
        {/* <img src={comment.author.node.avatar.url} /> */}
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{ReactHtmlParser(comment.content)}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.content}
            //handleSubmit={(text) => updateComment(text, comment.id)}
            handleSubmit={(text) => updateComment(text, comment.databaseId)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className="comment-actions">
        {/* {canReply && ( */}
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          {/* )} */}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies ? (
          <div className="replies">
            {replies.nodes.map((reply, index) => (

              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={reply.id}
                currentUserId={currentUserId}
                replies={reply.replies}
              />
            ))}
          </div>
        ): null}
      </div>
      
    </div>
)};

export default Comment;
