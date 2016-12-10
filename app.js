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
// push data to firebase
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
        nextTrain: firebase.database.ServerValue.TIMESTAMP
    });

    $('#inputTrain').val('');
    $('#inputDest').val('');
    $('#inputFirst').val('');
    $('#inputFreq').val('');

    return false;
	});

});

  database.ref().on("child_added", function(childSnapshot) {
    var firstTrain = childSnapshot.val().firstTrain;
    var tableRow = $('<tr>');
    var trainCell = $('<td>').text(childSnapshot.val().train);
    var destinationCell = $('<td>').text(childSnapshot.val().destination);
    var frequencyCell = $('<td>').text(childSnapshot).val().frequency;
    var firstTrainCell = $('<td>').text(firstTrain);

    tableRow.append(trainCell).append(destinationCell).append(firstTrainCell)
            .append(firstTrainCell);
    $('tbody').append(tableRow);
  });

  database.ref().orderByChild("frequency").limitToLast(1).on("child_added", function(snapshot) {
    $('#mostRecenttrain').text('train: ' + snapshot.val().train);
    $('#mostRecentdestination').text('destination: ' + snapshot.val().destination);
    $('#mostRecentfirstTrain').text('First train: ' + snapshot.val().firstTrain);
  });

  database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    $('#mostRecentInputtrain').text('train: ' + snapshot.val().train);
    $('#mostRecentInputdestination').text('destination: ' + snapshot.val().destination);
    $('#mostRecentInputFrequency').text('frequency: ' + moment(snapshot.val().frequency).format("MMMM Do YYYY"));
    $('#mostRecentInputfirstTrain').text('first train: ' + snapshot.val().firstTrain);
  });
// clear data from form fields
// update DOM with user data
//only displays 10 trains

database.ref().orderByChild('timestamp').limitToLast(10).on('child_added', function(childSnapshot, prevChildKey) {
    
});

