/**
 * Created by li.jiang on 2017/3/15.
 */

const Router = require('koa-router');
const router = new Router();

const LoginController = require('../controller/LoginController');

router.get('login', LoginController.login);

router.get('loginCallback',LoginController.loginCallback);


module.exports = router;