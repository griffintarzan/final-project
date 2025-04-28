import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [spotifyEmbed, setSpotifyEmbed] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("Posts").insert({
      title,
      content,
      image_url: imageUrl,
      spotify_embed: spotifyEmbed,
      upvotes: 0,
    });

    if (!error) {
        navigate("/");
    }
    else {
        alert("Error creating post");
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit} className="form">
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
          placeholder="(Optional) Spotify embed link"
        />

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;