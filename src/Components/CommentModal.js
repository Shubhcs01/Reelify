import React from "react";

function CommentModal(props) {
  if (!props.modal) return;

  return (
    <div className="comment-modal">
      {/* Load all comments */}
      <p>commnet 1</p>
      <p>commnet 1</p>
      <p>commnet 1</p>
      <input type="text"/>
    </div>
  );
}

export default CommentModal;
