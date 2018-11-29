var Overdose = require('../models/overdose');
var OverdoseNew = require('../models/overdoseNew');
var prescriberInfo = require('../models/prescriberinfo');
var stateInfo = require('../models/stateinfo')

/*
 * GET home page.
 */
module.exports.home = async function(request, result) 
{
    var stateVsDeathRatio = await OverdoseNew.aggregate([
        { $project: {
            _id : "$Abbrev",
            ratio : { $divide :["$Deaths", "$Population"] } 
            }
        }
    ]).limit(50);

   
    
    var statevsdeath_columns = ["State","DeathPopRatio"];
   var  statevsdeath_rows = [];

    stateVsDeathRatio.forEach(function(row) {
        statevsdeath_rows.push([row._id, row.ratio*10000])
    });
    console.log(statevsdeath_rows);
    result.render('index', {statevsdeath_columns : JSON.stringify(statevsdeath_columns),
            statevsdeath_rows : JSON.stringify(statevsdeath_rows)});
};

/*
 * GET feedback.
 */
module.exports.get_feedback = function(request, result) 
{
    result.render('feedback');
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
   
	Overdose.find({}, function(err, results){
    //var x= results;
    //console.log("hitting overdoseGet"+results);
    result.render('Overdoses', {data : results});
    
    });
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
        });
};


module.exports.state = function(request, result) 
{
    // chart 1

    columns = ["Deaths by Drug", "Drug Name"];
    tableRow = [];

    tableRow.push(["heroin", 2300]);
    tableRow.push(["fentanyl", 2000]);
    tableRow.push(["cocaine", 1700]);
    tableRow.push(["benzodiazpine", 1500]);
    tableRow.push(["etoh", 1000]);

    //chart 2
    male = 70;
    female = 30;

    //chart 3
    deathByRaceColumn = ["Race", "Death"];
    deathByRaceRow  = [];

    deathByRaceRow.push(["White", 3500]);
    deathByRaceRow.push(["Hispanic", 700]);
    deathByRaceRow.push(["Black", 200]);
    deathByRaceRow.push(["Asian Other", 100]);
    deathByRaceRow.push(["Asian Indian", 10]);

    //chart 4
    deathbyrace = [];

    deathbyrace.push([0.0, 0.0, 0.0]);
    deathbyrace.push([0.1, 0.2, 0.1]);
    deathbyrace.push([0.2, 0.2, 0.1]);
    deathbyrace.push([0.3, 0.3, 0.2]);
    deathbyrace.push([0.4, 0.3, 0.2]);
    deathbyrace.push([0.5, 0.4, 0.5]);
    deathbyrace.push([0.4, 0.4, 0.5]);
    deathbyrace.push([0.3, 0.3, 0.4]);
    deathbyrace.push([0.2, 0.2, 0.3]);
    deathbyrace.push([0.0, 0.0, 0.0]);


    //chart 5
    location = [];

    location.push(["Residence", 2700]);
    location.push(["Other", 1300]);
    location.push(["Residential Building", 700]);
    location.push(["Hotel", 300]);
    location.push(["Unknown", 200]);


    result.render('state', {
        male, 
        female,
        columns : JSON.stringify(columns),
        tableRow    : JSON.stringify(tableRow),
        deathByRaceColumn : JSON.stringify(deathByRaceColumn),
        deathByRaceRow : JSON.stringify(deathByRaceRow),
        deathbyrace : JSON.stringify(deathbyrace),
        location : JSON.stringify(location),
    });
};

module.exports.stateInfo = function(request, result) 
{
    stateInfo.find({abbrev: request.params.id}, function(err, results){


        // console.log("Test Value")
        // console.log(results)
        // console.log(results[0].Chinese)

        // chart 1

        columns = ["Deaths by Drug", "Drug Name"];
        tableRow = [];

        tableRow.push(["heroin", results[0].heroin]);
        tableRow.push(["fentanyl", results[0].fentanyl]);
        tableRow.push(["cocaine", results[0].cocaine]);
        tableRow.push(["benzodiazepine", results[0].benzodiazepine]);
        tableRow.push(["etoh", results[0].etoh]);
        tableRow.push(["etoh", results[0].etoh]);
    

        //chart 2
        male = results[0].Male;
        female = results[0].Female;

        //chart 3
        deathByRaceColumn = ["Race", "Death"];
        deathByRaceRow  = [];

        deathByRaceRow.push(["White", results[0].White]);
        deathByRaceRow.push(["Hispanic", results[0].Hispanic]);
        deathByRaceRow.push(["Black", results[0].Black]);
        deathByRaceRow.push(["Asian", results[0].Asian]);
        deathByRaceRow.push(["Chinese", results[0].Chinese]);

        // var a = results[0].White
        // console.log(a)
        // deathByRaceRow.push(["White", a]);
        // deathByRaceRow.push(["Hispanic", 245]);
        // deathByRaceRow.push(["Black", 183]);
        // deathByRaceRow.push(["Asian", 252]);
        // deathByRaceRow.push(["Chinese", 236]);

        // console.log(deathByRaveRow)

        //chart 4
        deathbyrace = [];

        deathbyrace.push([0.0, 0.0, 0.0]);
        deathbyrace.push([0.1, 0.2, 0.1]);
        deathbyrace.push([0.2, 0.2, 0.1]);
        deathbyrace.push([0.3, 0.3, 0.2]);
        deathbyrace.push([0.4, 0.3, 0.2]);
        deathbyrace.push([0.5, 0.4, 0.5]);
        deathbyrace.push([0.4, 0.4, 0.5]);
        deathbyrace.push([0.3, 0.3, 0.4]);
        deathbyrace.push([0.2, 0.2, 0.3]);
        deathbyrace.push([0.0, 0.0, 0.0]);


        //chart 5
        location = [];

        location.push(["Residence", results[0].Residance]);
        location.push(["Hotel", results[0].Hotel]);
        location.push(["Hospital", results[0].Hospital]);
        location.push(["In Vehicle", results[0].In_Vehicle]);
        location.push(["Street", results[0].Street]);


        result.render('state', {
            male, 
            female,
            columns : JSON.stringify(columns),
            tableRow    : JSON.stringify(tableRow),
            deathByRaceColumn : JSON.stringify(deathByRaceColumn),
            deathByRaceRow : JSON.stringify(deathByRaceRow),
            deathbyrace : JSON.stringify(deathbyrace),
            location : JSON.stringify(location),
        });

            
            
        });   

    
};

