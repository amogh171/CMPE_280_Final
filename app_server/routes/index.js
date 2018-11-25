var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var ctrlMain = require("../controllers/main");

router.use("/", bodyParser.json());
router.use("/", bodyParser.urlencoded());

/*
 * GET home page.
 */
router.get('/', ctrlMain.dashboard);

/*
 * GET home page.
 */
router.get('/home', ctrlMain.home);

/*
 * GET dragDrop page.
 */
router.get('/dragDrop', ctrlMain.dragDrop);


/*
 * GET feedback page.
 */
router.get('/feedback', ctrlMain.get_feedback);


// router.get('/aboutUs', function(req, res){
//     res.render('aboutUs',{data : 'trrttggdfjsgfikjbh'})
// });

router.get('/aboutUs', ctrlMain.aboutUs);


/*
 * GET Amogh's page.
 */
router.get('/aboutUs/amogh', ctrlMain.amogh);

/*
 * GET Divya's page.
 */
router.get('/aboutUs/divya', ctrlMain.divya);

/*
 * GET Indira's page.
 */
router.get('/aboutUs/indira', ctrlMain.indira);

/*
 * GET Vijay's page.
 */
router.get('/aboutUs/vijay', ctrlMain.vijay);

/*
 * GET Overdose page.
 */
router.get('/overdose', ctrlMain.overdoseGetAll);

/*
 * GET Overdose page for one state
 */
router.get('/overdose/:id', ctrlMain.overdoseGet);


// get dashboard
router.get('/dashboard', ctrlMain.dashboard);

//export this router to use in our index.js
module.exports = router;