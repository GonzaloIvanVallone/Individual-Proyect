const { Router } = require('express');
const { getAllDiets } = require('../controlers/DietController.js');

const router = Router();

router.get('/', getAllDiets)
//localhost:3001/diet

module.exports = router;