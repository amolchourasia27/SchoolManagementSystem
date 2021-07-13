const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')


// create read update and delete

router.get('/', userController.view)
router.post('/', userController.find)
router.get('/addstudent',userController.form)
router.post('/addstudent',userController.create)
router.get('/editStudent/:id', userController.edit)
router.get('/viewStudents/:id',userController.viewAll)
router.get('/:id', userController.delete)
module.exports = router