var url ="https://project6-firebase.firebaseio.com/";
var config = {
    apiKey: "AIzaSyC_oxueZEdkPNfaoBeUlAQr4z-3AgQTup0",
    authDomain: "project6-firebase.firebaseapp.com",
    databaseURL: "https://project6-firebase.firebaseio.com",
    projectId: "project6-firebase",
    storageBucket: "project6-firebase.appspot.com",
    messagingSenderId: "406377673052"
  };
  firebase.initializeApp(config);
var database = firebase.database();
var name ='';
var number ='';
var departing ='';
var destination = '';
var firstTrainTime = '';
var frequency = '';
var nextTrain = '';
var nextTrainFormatted = '';
var minutesAway = '';
var firstTimeConverted = '';
var currentTime = '';
var diffTime = '';
var tRemainder = '';
var minutesTillTrain = '';
var keyHolder = '';
var getKey = '';


$(document).ready(function() {
     //adds train to 
     $("#add-train").on("click", function() {
     	// YOUR TASK!!!
     	// Code in the logic for storing and retrieving the most recent user.
     	// Dont forget to provide initial data to your Firebase database.
     	name = $('#name-input').val().trim();
          number = $('#number-input').val().trim();
          departing = $('#departure-input').val().trim();
     	destination = $('#destination-input').val().trim();
     	firstTrainTime = $('#first-train-time-input').val().trim();
     	frequency = $('#frequency-input').val().trim();
          firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
          currentTime = moment();
          diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          tRemainder = diffTime % frequency;
          minutesTillTrain = frequency - tRemainder;
          nextTrain = moment().add(minutesTillTrain, "minutes");
          nextTrainFormatted = moment(nextTrain).format("hh:mm");

     	// Code for pushing into the database using keyHolder
     	keyHolder = database.ref().push({
     		name: name,
               number: number,
               departing: departing,
     		destination: destination,
     		firstTrainTime: firstTrainTime,  
     		frequency: frequency,
               nextTrainFormatted: nextTrainFormatted,
               minutesTillTrain: minutesTillTrain
     	});
          // The notes below are for finding the path to the key in the data being pushed, leaving as notes to save for later use.
          /*console.log(keyHolder.path.u[0]);
          var key = keyHolder.path.u[0];
          console.log(key);*/
     	// Don't refresh the page!

          $('#name-input').val('');
     	$('#destination-input').val('');
     	$('#first-train-time-input').val('');
     	$('#frequency-input').val('');

     	return false;
     });
          //adds train to train schedule
     database.ref().on("child_added", function(childSnapshot) {
	// full list of items to the well

		$('.train-schedule').append("<tr class='table-row' id=" + "'" + childSnapshot.val() + "'" + ">" +
               "<td class='col-xs-1'>" + childSnapshot.val().name +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().departing +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().destination +
               "</td>" +
               "<td class='col-xs-1'>" + childSnapshot.val().frequency +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().nextTrainFormatted + // Next Arrival Formula ()
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain + // Minutes Away Formula
               "</td>" +
               "<td class='col-xs-1'>" + childSnapshot.val().number +
               "</td>" +
               "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
          "</tr>");
// Handle the errors
}, function(errorObject){
     //error message
	console.log("Errors handled: " + errorObject.code)
});

//This function removes the button from the table
$("body").on("click", ".remove-train", function(){
     $(this).closest ('tr').remove();
     getKey = $(this).parent().parent().attr('id');
     dataRef.child(getKey).remove();
});

}); // Closes jQuery wrapper