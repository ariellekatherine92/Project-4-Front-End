import React from 'react';
import axios from 'axios';

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8000';

const BlogPost = ({ title, body, updatePosts, ...props }) => {
    const deletePost = () => {
        axios.delete(`${REACT_APP_SERVER_URL}/api/posts/${props._id}`).then(() => {
            updatePosts();
        }, error => {
            console.error(error);
            updatePosts();
        });
    };

    return (
        <li className="blog-post-item">
            <h3>{title}</h3>
            <p>{body}</p>
            <div className="btn-delete" onClick={deletePost}>[Delete]</div>
        </li>
    );
};

export default BlogPost;
