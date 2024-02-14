const {Router}  = require('express');

const router = Router();
const auth_routes = require('../controllers/auth_controller');

router.get('/signup', auth_routes.signup_get);
router.post('/signup', auth_routes.signup_post);
router.get('/login', auth_routes.login_get);
router.post('/login', auth_routes.login_post);
router.get('/logout', auth_routes.logout_get);

module.exports = router;