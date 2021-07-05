import React from 'react';
import axios from 'axios';
import { isAdmin } from '../utils/admins';
import BlogPostComments from './BlogPostComments';

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8000';

const BlogPost = props => {
    const {
        title,
        body,
        user,
        updatePosts,
        allComments,
        updateComments,
    } = props;

    const postId = props._id;

    const commentPost = () => {
        const comment = prompt('Comment on this post');

        axios.post(`${REACT_APP_SERVER_URL}/api/comments`, {
            title: postId,
            body: comment,
            date: new Date(),
            name: user?.name,
        }).then(() => {
            updateComments();
        }, error => {
            console.error(error);
        });
    };

    const deletePost = () => {
        axios.delete(`${REACT_APP_SERVER_URL}/api/posts/${postId}`).then(() => {
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
            {isAdmin(user) ? (
                <div className="btn-delete" onClick={deletePost}>[Delete]</div>
            ) : null}
            <div className="btn-comment" onClick={commentPost}>[Comment]</div>
            <BlogPostComments postId={postId} allComments={allComments}/>
        </li>
    );
};

export default BlogPost;
