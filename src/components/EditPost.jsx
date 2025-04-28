import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [spotifyEmbed, setSpotifyEmbed] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("Posts")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) {
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.image_url);
        setSpotifyEmbed(data.spotify_embed);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("Posts")
      .update({ title, content, image_url: imageUrl, spotify_embed: spotifyEmbed })
      .eq("id", id);

    if (!error) navigate(`/post/${id}`);
    else alert("Failed to update post.");
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from("Posts")
      .delete()
      .eq("id", id);

    if (!error) navigate("/");
    else alert("Failed to delete post.");
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleUpdate} className="form">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <label>Image URL:</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <label>Spotify Embed Link:</label>
        <input
          type="text"
          value={spotifyEmbed}
          onChange={(e) => setSpotifyEmbed(e.target.value)}
        />

        <button type="submit">Update Post</button>
      </form>

      <button onClick={handleDelete} className="delete-button">
        🗑️ Delete Post
      </button>
    </div>
  );
}

export default EditPost;
