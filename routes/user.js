const { Router } = require('express');
const { login, register, users } = require('../controllers/user');
const auth = require('../middlewear/auth');
const router = Router();

router.post('/login', login)
router.post('/register', register)
router.get('/users', auth , users)

module.exports = router;