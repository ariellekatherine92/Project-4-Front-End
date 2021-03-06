import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewBlogPostForm from '../NewBlogPostForm';
import BlogPost from '../BlogPost';
import '../Blog.css';

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8000';

const Blog = props => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    const updatePosts = () => {
        axios.get(`${REACT_APP_SERVER_URL}/api/posts`).then(({ data }) => {
            setPosts(data?.posts || []);
        }, error => {
            console.error(error);
        });
    };

    const updateComments = () => {
        axios.get(`${REACT_APP_SERVER_URL}/api/comments`).then(({ data }) => {
            setComments(data?.comments || []);
        }, error => {
            console.error(error);
        });
    };

    useEffect(() => {
        updatePosts();
        updateComments();
    }, []);

    const renderPosts = () => {
        return posts.map(post => (
            <BlogPost 
                key={`post-${post._id}`}
                updatePosts={updatePosts}
                allComments={comments}
                updateComments={updateComments}
                user={props.user}
                {...post}
            />
        ));
    };

    return (
        <>
            <video src="/videos/video-1.mp4" autoPlay loop muted />
            <div className="blog-container">
                <NewBlogPostForm {...props} updatePosts={updatePosts} />
                <ul>{renderPosts()}</ul>
            </div>
        </>
    );
};

export default Blog;
