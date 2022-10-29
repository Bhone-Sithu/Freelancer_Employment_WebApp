const express = require('express');
const router = express.Router(); 
const {get_projects,get_project,post_project,apply_project,accept_freelancer,invite_freelancer,delete_project,update_project,employer_get_project} = require('../Controllers/project_controller')
router.get('/get',get_projects);
router.get('/get/:id',get_project);
router.post('/post',post_project);
router.put('/update/:id',update_project);
router.delete('/delete/:id',delete_project);
router.put('/apply/:id',apply_project);
router.put('/accept/:id',accept_freelancer);
router.put('/invite/:id',invite_freelancer);
router.get('/employer_get_project/:id',employer_get_project);
module.exports = router;