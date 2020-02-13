const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Principal page');
});

router.get('/posts', (req, res) => {
    res.send('Page posts');
});

router.get('/categories', (req, res) => {
    res.send('Page categories');
});

module.exports = router; 