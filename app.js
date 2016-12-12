 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDEoNjodl3tIfcO28LnPEWX-_Uw9zy7jtM",
    authDomain: "timetime-dd7d3.firebaseapp.com",
    databaseURL: "https://timetime-dd7d3.firebaseio.com",
    storageBucket: "timetime-dd7d3.appspot.com",
    messagingSenderId: "868177613270"
  };
  firebase.initializeApp(config);
// get reference to database
var database = firebase.database();
// initialize variables
var train = "";
var destination = "";
var frequency = 0;
var firstTrain = "";
var tMinutesTillTrain = "";
var nextTrain = "";


// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % frequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = frequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

// read data from firebase if it exists
// get values from inputs
$(document).on('ready', function() {
	$('#submit').on('click', function () {
		train = $('#inputTrain').val().trim();
		destination = $('#inputDest').val().trim();
		frequency = $('#inputFreq').val().trim();
		firstTrain = $('#inputFirst').val().trim();

    database.ref().push({
        train: train,
        destination : destination,
        frequency: frequency,
        firstTrain: firstTrain,
        nextTrain: firebase.database.ServerValue,
        tMinutesTillTrain: firebase.database.ServerValue

    });

    return false;
	});

});

  database.ref().orderByChild("timestamp").limitToLast(10).on("child_added", function(childSnapshot, prevChildKey) {
    var firstTrain = childSnapshot.val().firstTrain;
    var tableRow = $('<tr>');
    var trainCell = $('<td>').text(childSnapshot.val().train);
    var destinationCell = $('<td>').text(childSnapshot.val().destination);
    var frequencyCell = $('<td>').text(childSnapshot.val().frequency);
    var firstTrainCell = $('<td>').text(firstTrain);
    var nextTrainCell = $('<td>').text(childSnapshot.val().nextTrain);
    var tMinutesTillTrainCell = $('<td>').text(childSnapshot.val().tMinutesTillTrain);

    tableRow.append(trainCell).append(destinationCell).append(frequencyCell).append(nextTrainCell).append(tMinutesTillTrainCell);
    $('tbody').append(tableRow);
    });

  
