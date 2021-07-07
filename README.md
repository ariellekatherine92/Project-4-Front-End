# Project-4 The Unplanned Place: A Lifestyle Blog

# The Initial Brainstorm

For this project-4 our group decided to make a lifestyle blog that encompasses health, beauty, fitness as well as luxury products. We named our blog The Unplanned Place because I think a lot us can relate to ending up in places in life that our often times not on the road map we self curate for ourselves.

Our brand statement for this project is: Simple and Clean. As each of us navigate through our daily lives we are bombarded by advertisement after advertisement with so called "influencers" claiming that their products and lifestyles really work. The goal of this blog is provide helpful articles, reviews on products the authors use, and brands that the average person can relate to. In simple terms we want this blog to be a raw account of two average people looking to help others find relatable health, beauty, and fitness content. We also want our Brand to have inclusivity from all different backgrounds and types of people. Eventually as a long term goal we would like to contact others who may want to contribute content to our site.

For our initial brainstorming we looked at lifestyle sites and content that is already popular amongst online users. Some of those blogs included PaleoOmg
and Poosh. We wanted something that encompasses lifestyle content as well as some sort of ecommerce which in the future would be a stretch goal.

In this project we plan to include a login for users so they can have access to save or pin content they would like to review later. We are also including a
comment section for people to be able to engage in discussion about posts and articles they find interesting.

We would also like to include a local business aspect of local businesses we frequent and use. As one of us lives near NYC, and the other lives in Seattle we both had plenty of experiences to collaborate on to make this project happen.

# BackEnd with Express

We sarted off by building our model for our blog posts. We gave our `Post` entity attributes of `title`, `body` and an `author`. Only Ariel, Cody or Janeth can create a post. Posts are associated with the User.

```javascript
const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
```

We then created a `comment` entity with `post`, `name`, `title`, `body` and `date` entities.
We associate our comments with a `post`.

```Javascript
const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    name: {
        type: String,
        required: true,
        },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
```

Inside of our `/api/posts.js` file we have a `create` function whenever a `Post` request is made to `api/posts/` our create function trigggers. It expects a `title`, `body`, and it will set the `author` attribute to the `user.id`.

```javascript
const create = async (req, res) => {
  const { title, body } = req.body;
  const author = req.user.id;

  try {
    const newPost = await Post.create({ title, body, author });
    console.log("new post created", newPost);
    res.json({ post: newPost });
  } catch (error) {
    console.log("Error inside of POST of /api/posts");
    console.log(error);
    return res
      .status(400)
      .json({ message: "Post was not created. Please try again..." });
  }
};
```

The `index` function finds all of our `Posts` using the `.find()` method. 

```javascript
const index = async (req, res) => {
    console.log('inside of /api/posts');
    try {
        const allPosts = await Post.find({});

        res.json({ posts: allPosts });
    } catch (error) {
        console.log('Error inside of /api/posts');
        console.log(error);
        return res.status(400).json({ message: 'Posts not found. Please try again.' });
    }
```

The `show` function will find a post by id and display the respective comments. 

```javascript
const show = async (req, res) => {
    const { id } = req.params;
    try {
        // look for posts based on id
        const post = await Post.findById(id);
        const comments = await Comment.find({post:post._id})
        res.json({ post, comments});
    } catch (error) {
        console.log('Error inside of /api/posts/:id');
        console.log(error);
        return res.status(400).json({ message: 'Post not found. Try again...' });
    }
}
```

Our `author` function returns all the post by author. 

```javascript
const author = async (req, res) => {
    const { id } = req.params;
    try {
        // look for book based on id
        const post = await Post.find({author:id});
        console.log(post)
        res.json({ post });
    } catch (error) {
        console.log('Error inside of /api/posts/:author');
        console.log(error);
        return res.status(400).json({ message: 'Post not found. Try again...' });
    }
}
```

Our `update` function: 

```javascript 
const update = async (req, res) => {
    console.log(req.body);
    try {

        const updatedPost = await Post.update({ title: req.body.title }, req.body); // updating the Post 
        const post = await Post.findOne({ title: req.body.title });

        console.log(updatedPost); // { n: 1, nModified: 0, ok: 1 }
        console.log(post); // a book object 

        res.redirect(`/api/posts/${post.id}`);

    } catch (error) {
        console.log('Error inside of UPDATE route');
        console.log(error);
        return res.status(400).json({ message: 'Post could not be updated. Please try again...' });
    }
```
Our `Delete` function: 

```javascript 

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
        const result = await Post.findByIdAndRemove(id);
        console.log(result);
        res.redirect('/api/posts');
    } catch (error) {
        console.log('inside of DELETE route');
        console.log(error);
        return res.status(400).json({ message: 'Post was not deleted. Please try again...' });
    }
}

```