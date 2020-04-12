const router = require('express').Router();

const videoController = require('../controllers/videoController');

router.get('/', videoController.list);
router.get('/category/:category', videoController.listbycategory); //la ruta  recibe category
router.post('/add', videoController.save);
router.get('/update/:id', videoController.edit);
router.post('/update/:id', videoController.update);
router.get('/delete/:id', videoController.delete);

router.get('/contact', (req, res) => {
    res.render('contact');
});

module.exports = router;