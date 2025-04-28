import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from "../supabaseClient";

const HomeFeed = () => {
        const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState("created_at");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchPosts();
    }, [sortBy]);

    const fetchPosts = async () => {
        let query = supabase.from("Posts").select("*");

        if (sortBy === "created_at") {
        query = query.order("created_at", { ascending: false });
        } else if (sortBy === "upvotes") {
        query = query.order("upvotes", { ascending: false });
        }

        const { data, error } = await query;
        if (!error) setPosts(data);
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
        <div className="controls">
            <Link to="/new" className="button">➕ New Post</Link>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="created_at">Sort by Newest</option>
            <option value="upvotes">Sort by Upvotes</option>
            </select>
            <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        <div className="post-list">
            {filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
                <h3><Link to={`/post/${post.id}`}>{post.title}</Link></h3>
                <p>Created: {new Date(post.created_at).toLocaleString()}</p>
                <p>Upvotes: {post.upvotes}</p>
            </div>
            ))}
        </div>
        </div>
    );
}

export default HomeFeed;