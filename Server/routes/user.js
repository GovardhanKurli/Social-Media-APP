const { getUser, getAll, updateUser, deleteUser, getUserFriends, followUser, unfollowUser, searchUsers } = require('../controllers/userController');
const verifyToken = require('../middlewares/auth');
const userRouter = require('express').Router();

userRouter.get('/findAll', getAll);
userRouter.get('/find/:id', getUser);
userRouter.get('/find/userfriends/:id', getUserFriends);

userRouter.put('/update/:id', verifyToken, updateUser);
userRouter.put('/follow/:id', verifyToken, followUser);
userRouter.put('/unfollow/:id', verifyToken, unfollowUser);

userRouter.delete('/delete/:id', verifyToken, deleteUser);
userRouter.get('/search', searchUsers);

module.exports = userRouter;
