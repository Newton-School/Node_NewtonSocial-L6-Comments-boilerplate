const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'newtonSchool';

// Controller for liking a post
/*
Implement a controller function called likePost that handles the liking of a post in a social media application. The function takes in a request (req) and response (res) objects.

The likePost function extracts the postId and token from the request, verifies the token to obtain the userId, and finds the post. If the post is not found, it returns an error response. However, if the post is found, it checks if the post is already liked by the user. If it is already liked, it returns an error response. Otherwise, it adds the userId to the post's likes array, saves the updated post, and returns a success response indicating that the post has been liked.

Sample Input:

req.params.postId - The ID of the post to be liked.
req.headers.authorization - The authorization token of the user.
Possible Outputs:

If the post with the given ID is not found:

Status code: 404
Response body: { "error": "Post not found" }
If the post is already liked by the user:

Status code: 400
Response body: { "error": "Post already liked by the user" }
If the post is successfully liked:

Status code: 200
Response body: { "message": "Post liked successfully" }
If an error occurs during the liking process:

Status code: 500
Response body: { "error": "An error occurred while liking the post" }
*/
async function likePost(req, res) {
    const postId = req.params.postId;
    const token = req.headers.authorization;

    try {
        //Write your code here
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while liking the post' });
    }
}

// Controller for disliking a post
/*
Implement a controller function called dislikePost that handles the disliking of a post in a social media application. The function takes in a request (req) and response (res) objects.

The dislikePost function extracts the postId and token from the request, verifies the token to obtain the userId, and finds the post. If the post is not found or if the post is found but not liked by the user, it returns an error response. However, if the post is found and liked by the user, it removes the userId from the likes array, saves the updated post, and returns a success response indicating that the post has been disliked.

Sample Input:

req.params.postId - The ID of the post to be disliked.
req.headers.authorization - The authorization token of the user.
Possible Outputs:

If the post with the given ID is not found:

Status code: 404
Response body: { "error": "Post not found" }
If the post is not liked by the user:

Status code: 400
Response body: { "error": "Post not liked by the user" }
If the post is successfully disliked:

Status code: 200
Response body: { "message": "Post disliked successfully" }
If an error occurs during the disliking process:

Status code: 500
Response body: { "error": "An error occurred while disliking the post" }
*/
async function dislikePost(req, res) {
    const postId = req.params.postId;
    const token = req.headers.authorization;

    try {
       //Write your code here
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while disliking the post' });
    }
}

// Controller for commenting on a post
/*
Implement a controller function called commentOnPost that handles the commenting on a post in a social media application. The function takes in a request (req) and response (res) objects.

The commentOnPost function extracts the postId and token from the request, verifies the token to obtain the userId, and finds the post. If the post is not found, it returns an error response. However, if the post is found, it creates a comment object with the author set to the userId and the content from the request body. The comment is then added to the post's comments array, and the updated post is saved. Finally, it returns a success response indicating that the comment has been added.

Sample Input:

req.params.postId - The ID of the post to comment on.
req.headers.authorization - The authorization token of the user.
req.body.content - The content of the comment.
Possible Outputs:

If the post with the given ID is not found:

Status code: 404
Response body: { "error": "Post not found" }
If the comment is successfully added:

Status code: 200
Response body: { "message": "Comment added successfully", "comment": { "author": "<userId>", "content": "<commentContent>" } }
If an error occurs during the commenting process:

Status code: 500
Response body: { "error": "An error occurred while commenting on the post" }
*/
async function commentOnPost(req, res) {
    const postId = req.params.postId;
    const token = req.headers.authorization;
    const { content } = req.body;

    try {
       //Write your code here
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while commenting on the post' });
    }
}

/*
Implement a controller function called getPostMetrics that retrieves metrics for a post in a social media application. The function takes in a request (req) and response (res) objects.

The getPostMetrics function extracts the postId from the request parameters and finds the post with the given ID. If the post is not found, it returns an error response. However, if the post is found, it calculates and returns the metrics including the total number of likes and the total number of comments for the post.

Sample Input:

req.params.postId - The ID of the post to retrieve metrics for.

Possible Outputs:

If the post with the given ID is not found:

Status code: 404
Response body: { "error": "Post not found" }
If the post is found:

Status code: 200
Response body: { "likes": <totalLikes>, "comments": <totalComments> }
If an error occurs during the process:

Status code: 500
Response body: { "error": "An error occurred while retrieving post metrics" }
*/

async function getPostMetrics(req, res) {
    const postId = req.params.postId;
  
    try {
        //Write your code here
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while retrieving post metrics' });
    }
  }

// Create a new post
const createPost = async (req, res) => {
    try {
        const { author, content } = req.body;

        if (!author || !content) {
            return res.status(400).json({ message: 'Author and content are required fields' });
        }

        const post = new Post({
            author: author,
            content: content
        });

        await post.save();
        res.status(201).json({ message: 'Post created successfully', post: post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username')
            .populate('comments.author', 'username')
            .exec();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a post by ID
const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId)
            .populate('author', 'username')
            .populate('comments.author', 'username')
            .exec();
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a post by ID
const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { content } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { content: content },
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a post by ID
const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    dislikePost,
    commentOnPost,
    getPostMetrics
};
