//Imports the functions getCommentsFromPost, deleteComment, toggleLike, and createComment from the commentController module. These functions handle the logic for retrieving, deleting, liking/unliking, and creating comments, respectively.
//Imports the verifyToken middleware function, which will be used to authenticate requests.
const { getCommentsFromPost, deleteComment, toggleLike, createComment } = require('../controllers/commentController')
const verifyToken = require('../middlewares/auth')

//Creates an Express router instance using express.Router(). This router will manage routes related to comments.
const commentRouter = require('express').Router()

commentRouter.get('/:postId', getCommentsFromPost)

commentRouter.post('/', verifyToken, createComment)

commentRouter.delete('/:commentId', verifyToken, deleteComment)

commentRouter.put('/toggleLike/:commentId', verifyToken, toggleLike)

module.exports = commentRouter