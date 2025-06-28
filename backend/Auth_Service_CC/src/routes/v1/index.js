const express = require('express');

const UserController = require('../../controllers/user-controller');
const RoleController = require('../../controllers/role-controller');
const {AuthRequestValidators} = require('../../middlewares/index');

const router = express.Router();

router.post(
    '/signup',
    AuthRequestValidators.validateUserAuth,
    UserController.create
);
router.post(
    '/signin',
    AuthRequestValidators.validateUserAuth,
    UserController.signIn
);
router.get(
    '/isAuthenticated',
    UserController.isAuthenticated
);
//router.get('/email',UserController.get);
router.post(
    '/role',
    RoleController.create
);
router.post(
    '/isTeacher',
    UserController.isTeacher
);
router.post(
    '/isConvenor',
    UserController.isConvenor
);
router.post(
    '/addUserRole',
    UserController.addUserRole
);

module.exports=router;