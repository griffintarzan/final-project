import React, { useState } from "react";
import supabase from "../supabaseClient";

const CommentForm = ({ postId, onCommentAdded }) =>{
  const [commentText, setCommentText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("Comments").insert({
      post_id: postId,
      content: commentText,
    });

    if (!error) {
      setCommentText("");
      onCommentAdded();
    } else {
      alert("Failed to add comment.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <textarea
        placeholder="Leave a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        required
      ></textarea>
      <button type="submit">Post Comment</button>
    </form>
  );
}

export default CommentForm;
