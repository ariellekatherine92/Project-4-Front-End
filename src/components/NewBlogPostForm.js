import React, { useState } from 'react';
import axios from 'axios';
import { isAdmin } from '../utils/admins';

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8000';

const NewBlogPostForm = props => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleTitleChange = e => {
        setTitle(e.target.value);
    };

    const handleBodyChange = e => {
        setBody(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        axios.post(`${REACT_APP_SERVER_URL}/api/posts`, {
            title,
            body,
        }).then(resp => {
            props.updatePosts();
            setTitle('');
            setBody('');
        }, error => {
            console.error(error);
        });
    };

    if (!isAdmin(props.user)) {
        return null;
    }

    return (
        <form className="blog-post-form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="title" 
                onChange={handleTitleChange}
                value={title}
            />
            <textarea 
                onChange={handleBodyChange}
                value={body}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default NewBlogPostForm;
