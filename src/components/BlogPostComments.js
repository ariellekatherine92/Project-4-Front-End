import React, { useEffect } from 'react';
import axios from 'axios';

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8000';

const BlogPostComments = ({ postId, allComments }) => {
    const comments = allComments.filter(({ title }) => title === postId);

    console.log(comments);

    return (
        <ul className="blog-post-comments-container">
            {comments.map(({ name, date, body }) => {
                const dtDate = new Date(date);
                return (
                    <li key={`comment-${date}`}>
                        <p>{body}</p>
                        <span>{name} - {dtDate.toLocaleDateString()}</span>
                    </li>
                );
            })}
        </ul>
    );
};

export default BlogPostComments;
