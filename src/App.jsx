import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeFeed from './components/HomeFeed';
import CreatePost from './components/CreatePost';
import PostDetail from './components/PostDetail';
import EditPost from './components/EditPost';

import './App.css'

function App() {
  

  return (
    <Router>
      <div className="app-container">
        <Link to="/" className="logo">
          <h1>🎵 Audio Exchange 🎵</h1>
        </Link>
        <Routes>
          <Route path="/" element={<HomeFeed />} />
          <Route path="/new" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </div>
    </Router>
      
  )
}

export default App
