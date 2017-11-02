
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC_oxueZEdkPNfaoBeUlAQr4z-3AgQTup0",
    authDomain: "project6-firebase.firebaseapp.com",
    databaseURL: "https://project6-firebase.firebaseio.com",
    projectId: "project6-firebase",
    storageBucket: "project6-firebase.appspot.com",
    messagingSenderId: "406377673052"
  };
  firebase.initializeApp(config);

    /***  GLOBAL VARIABLES  ***/
    var trainDatabase = new Firebase("project6-firebase.firebaseio.com/");
    var capturedValues;

    /***  FUNCTIONS  ***/
    /*
    trainDatabase.on("value", function(snapshot){ 
      postToHTML();
    });
      postToHTML = function(){
        caputredValues;
      };
      */

    captureData = function() {
        //Capture imputs from 4 imput divs
        var a = $("#train-input").val().trim();
        var b = $("#arrival-input").val().trim();
        var c = $("#departure-input").val().trim();
        var d = $("#remaining-input").val().trim();
        var e = $("#current-input").val().trim();
        var f = $("#number-input").val().trim();

        //local vars to push as object to Firebase
        capturedValues = {
            name: a,
            arrival: b,
            departure: c,
            remaining: d,
            current: e,
            number: f
        }

        //push data to Firebase
        trainDatabase.push(capredValues);
        alert("Train added sucessfully");
        clearDataForms();
    };

    clearDataForms = function() {
        //set values to blank
        $("#train-input").val("");
        $("#arrival-input").val("");
        $("#departure-input").val("");
        $("#remaining-input").val("");
        $("#current-input").val("");
        $("#number-input").val("");
        capturedValues;
    };



    /***  EVENTS  ***/
    $("#addtrainbutton").on("click", function() {
        captureData();
        return false; // Or Prevent Default. No preference.
    });

    //firebase.js function of child added, run function with returned parameter
    trainDatabase.on("child_added", function(snapshot) {
        //variables 
        var na = snapshot.val().name;
        var arr = snapshot.val().arrival
        var depa = snapshot.val().departure;
        var rem = snapshot.val().remaining;
        var cur = snapshot.val().current;
        var num = snapshot.val().number;


        var trainFrequency = freq;
        var firstTrain = st;

        //subtract one year to ensure to time conflicts over calculated microseconds.
        var fixTime = moment(firstTrain, "hh:mm").subtract(1, "years");
        //call moments library
        var currentMinute = moment();
        //format currentMinute, post to html
        $("#currentTimeSpan").html(" Current Time : " + currentMinute.format("hh:mm"));

        var timeDifference = moment().diff(moment(fixTime), "minutes");

        var timeRemaining = timeDifference % trainFrequency;

        var minutesTillTrain = trainFrequency - timeRemaining;

        var nextTrain = moment().add(minutesTillTrain, "minutes")

        var arrivalTime = moment(nextTrain).format("hh:mm");

        //create new row for each train
        $("#trainScheduleBody").append("<tr><td>" + na + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + st + "</td><td>" + arrivalTime + "</td><td>" + minutesTillTrain + " Minutes" + "</td></tr>");

    });//end snapshot return function

}); // End document.ready