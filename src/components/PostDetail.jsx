import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import CommentForm from "./CommentForm";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id, comments]);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from("Posts")
      .select("*")
      .eq("id", id)
      .single();
    if (!error) setPost(data);
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("Comments")
      .select("*")
      .eq("post_id", id)
      .order("created_at", { ascending: true });
    if (!error) setComments(data);
  };

  const handleUpvote = async () => {
    const { data, error } = await supabase
      .from("Posts")
      .update({ upvotes: post.upvotes + 1 })
      .eq("id", id)
      .single();
    if (!error) setPost(data);
  };

  const handleCommentAdded = () => {
    fetchComments();
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>

      {post.image_url && (
        <img src={post.image_url} alt="Post Visual" style={{ marginTop: '10px', borderRadius: '8px' }} />
      )}

      {post.spotify_embed && (
        <div style={{ marginTop: '20px' }}>
          <iframe
            src={post.spotify_embed}
            width="100%"
            height="80"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            title="Spotify Player"
          ></iframe>
        </div>
      )}

      {post.content && <p style={{ marginTop: '15px' }}>{post.content}</p>}

      <p><strong>Upvotes:</strong> {post.upvotes}</p>
      <button onClick={handleUpvote}>👍 Upvote</button>

      <br /><br />
      <Link to={`/edit/${post.id}`} className="button">✏️ Edit Post</Link>

      <h3 style={{ marginTop: '30px' }}>Comments</h3>
      <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} />

      <div className="comment-section">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} style={{ background: "#fff", marginBottom: "10px", padding: "10px", borderRadius: "5px" }}>
              <p>{comment.content}</p>
              <small>{new Date(comment.created_at).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}

export default PostDetail;