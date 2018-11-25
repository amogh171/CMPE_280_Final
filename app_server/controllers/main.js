var Overdose = require('../models/overdose');
var OverdoseNew = require('../models/overdoseNew');
var prescriberInfo = require('../models/prescriberinfo');

/*
 * GET home page.
 */
module.exports.home = function(request, result) 
{
    result.render('index');
};

/*
 * GET feedback.
 */
module.exports.get_feedback = function(request, result) 
{
    result.render('feedback');
};

/*
 * POST feedback.
 */
 
/*module.exports.post_feedback = function(request, result) 
{
     //result.send("Thank you for your feedback");
};*/

/*
 * GET StateVsDeath.
 */
module.exports.StateVsDeath = function(request, result) 
{
    result.render('StateVsDeath');
};

/*
 * GET StateVsPop.
 */
module.exports.StateVsPop = function(request, result) 
{
    result.render('StateVsPop');
};

/*
 * GET heatmap.
 */
module.exports.heatmap = function(request, result) 
{
    result.render('heatmap');
};


/*
 * GET drug names.
 */
module.exports.drugName = function(request, result) 
{
    result.render('drugName');
};


/*
 * GET drag and drop page
 */
module.exports.dragDrop = function(request, result)
{
    result.render('dragDrop');
}



/*
 * GET amogh details.
 */
module.exports.amogh = function(request, result) 
{
    result.sendFile('amogh.html',{ root: "./app_server/views/members" });
};



/*
 * GET amogh details.
 */
module.exports.divya = function(request, result) 
{
    result.sendFile('divya.html',{ root: "./app_server/views/members" });
};



/*
 * GET amogh details.
 */
module.exports.indira = function(request, result) 
{
    result.sendFile('indira.html',{ root: "./app_server/views/members" });
};



/*
 * GET amogh details.
 */
module.exports.vijay = function(request, result) 
{
    result.sendFile('vijay.html',{ root: "./app_server/views/members" });
};



/*
 * GET overdose.
 */
module.exports.overdoseGetAll = function(request, result) 
{
	/* code to save to the db.. use later
	var o = new Overdose();
    o.State = "ZZZZ";
    o.Population = 120;
    o.Deaths = 12;
    o.Abbrev = "ZZ";
    o.save();
    */
    // if u check the console.. u'll see the entire db printed.. we have to display this in tabular format
    
	Overdose.find({}, function(err, results){
    //var x= results;
    //console.log("hitting overdoseGet"+results);
    result.render('Overdoses', {data : results});
    
    });
    //result.sendFile('Overdoses.html',{ root: "./app_server/views" });
    

	// we'd want to pass this above "result" json to out html to display.. so sendFile wont wont work anymore,
    // we'd have to use something like render to pass arguments to front end
    // result.render('Overdoses.html');

};


/*
 * GET overdose for State.
 */
module.exports.overdoseGet = function(request, result) 
{
	Overdose.find({State: request.params.id}, function(err, results){

    result.render('Overdoses', {data : results});
    // result.send(results);
    });
   
};

/*
 * GET for to add new overdose
 */
module.exports.overdoseNewForm = function(request, result) 
{
    result.render('addForm');  
};

/*
 * GET form to edit overdose
 */
module.exports.overdoseEditForm = function(request, result) 
{
    result.render('editForm');  
};

/*
 * POST overdose.
 */
 module.exports.overdosePost = function(req, res) 
{
    let product = new Overdose(
        {
            State: req.body.State,
            Population: req.body.Population,
            Deaths: req.body.Deaths,
            Abbrev: req.body.Abbrev
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Entry Inserted successfully')
    })
};

module.exports.overdoseUpdate = function (req, res) 
{         	console.log(req.params.id+" req.params.id");
    //var update = JSON.parse(req.body);
    Overdose.findOneAndUpdate({"State" :req.params.id}, { $set: req.body}, function (err, Overdose) {
    	console.log(req.body+" req.body");
    	if (err) return next(err);
        res.send(req.body);
    });
};

module.exports.overdoseDelete = function(req, res) 
{   /*
    Overdose.findByIdAndRemove(req.params.id, function (err) {
    	console.log(req.params.id+" req.params.id");
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
    */
    Overdose.findOneAndDelete({"State" :req.params.id}, function (err) {
    	console.log(req.params.id+" req.params.id");
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

module.exports.overdoseSearch = function(req, res)
{
    Overdose.find({ State: req.params.state}, function(err, results){

        // result.render('Overdoses', {data : results});
        res.send(results);        
        
    });
}

/*
 * GET about us.
 */
module.exports.aboutUs = function(request, result) 
{
    Overdose.find({}, function(err, results){

        result.render('aboutUs', {data : "about Us test data" });
        });
         
};


/*
 * GET about us.
 */
module.exports.dashboard =  async function(req, res) {

    var state_dict = 
    {
        "AL": "Alabam",
        "AK": "Alaska",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "FL": "Florida",
        "GA": "Georgia",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "California",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PA": "Pennsylvania",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming",
        "AS" :  "American Samoa",
        "DC" :  "District of Columbia",
        "FM" :  "Federated States of Micronesia",
        "GU" :  "Guam",
        "MH" :  "Marshall Islands",
        "MP" :  "Northern Mariana Islands",
        "PW" :  "Palau",
        "PR" :  "Puerto Rico",
        "VI" :  "Virgin Islands"
    }


    var fCount = await prescriberInfo.aggregate([
        { $match: {"Gender": "F"}},
        { 
        $group: {
          _id: null, 
          count: {
            $sum: 1
          }
        }
      }]);

    var mCount = await prescriberInfo.aggregate([
        { $match: {"Gender": "M"}},
        { 
        $group: {
          _id: null, 
          count: {
            $sum: 1
          }
        }
      }]);

    var male = mCount[0].count;
    var female = fCount[0].count;


    var overdose_res = await OverdoseNew.find().sort({"Deaths" : -1}).limit(10);
    var columns =["State","Deaths"];
    var tableRow = [];
        
    overdose_res.forEach(function (row) {
      tableRow.push([row.State,row.Deaths]);
    });

    var statevspres = await prescriberInfo.aggregate([ { 
        $group: {
          _id: "$State", 
          count: { $sum: "$Prescriptions"}
        }
      }]).limit(10);

    statevspres.sort(function (a, b){
        return a.count - b.count;
    });

    // console.log(statevspres);

    statevspres_columns =["State", "PrescriptionsCount"]
    statevspres_rows = []
    
    statevspres.forEach(function (row) {
      
      if (state_dict[row._id] != undefined) {
        // console.log(state_dict[row._id]);
        statevspres_rows.push([state_dict[row._id],row.count]);
      }
      else {
          // console.log(row._id)
          statevspres_rows.push([row._id,row.count]);
      }
    });

    var specialityvspres = await prescriberInfo.aggregate([ { 
        $group: {
          _id: "$Specialty", 
          count: { $sum: "$Prescriptions"}
        }
    }]);

    specialityvspres.sort(function(a,b){
        return b.count - a.count;
    })

    // var specialityvspres = await prescriberInfo.find().sort({"Prescriptions" : -1}).limit(10);

    specvspres_columns =["Specialty", "PrescriptionsCount"]
    specvspres_rows = []
    var i = 0;
    specialityvspres.forEach(function (row) {
        if ( i < 10){
            specvspres_rows.push([row._id, row.count/10000]);
        }
        i = i + 1;
    });

    // console.log(specvspres_rows);

    var stateVsDeathRatio = await OverdoseNew.aggregate([
        { $project: {
            _id : "$State",
            ratio : { $divide :["$Deaths", "$Population"] } 
            }
        }
    ]).limit(10);

    stateVsDeathRatio.sort(function(a,b){
        return b.ratio - a.ratio;
    });

    // console.log(stateVsDeathRatio);
    
    statevsdeath_columns = ["State","DeathPopRatio"]
    statevsdeath_rows = []

    stateVsDeathRatio.forEach(function(row) {
        statevsdeath_rows.push([row._id, row.ratio*10000])
    })
    
    res.render('dashboard', {
            male, 
            female, 
            columns : JSON.stringify(columns),
            tableRow : JSON.stringify(tableRow),
            statevspres_col : JSON.stringify(statevspres_columns),
            statevspres_row : JSON.stringify(statevspres_rows),
            specvspres_col : JSON.stringify(specvspres_columns),
            specvspres_row : JSON.stringify(specvspres_rows),
            statevsdeath_columns : JSON.stringify(statevsdeath_columns),
            statevsdeath_rows : JSON.stringify(statevsdeath_rows)
        }
    );
};

