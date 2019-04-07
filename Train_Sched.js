var config = {
  apiKey: "AIzaSyAMT7-gqwKSfZBb9TEgc5uHgrzO_KY9SNs",
  authDomain: "train-sched-29563.firebaseapp.com",
  databaseURL: "https://train-sched-29563.firebaseio.com",
  projectId: "train-sched-29563",
  storageBucket: "train-sched-29563.appspot.com",
  messagingSenderId: "421016097337"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-time").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#role-input").val().trim();
  var trainFrequency = moment().format().val().trim();
  var trainarrival = $("#arrival-input").val().trim();

  var newTrain = {
    name: trainName,
    Destination: trainDestination,
    Frequency: trainFrequency,
    nextArrival: trainarrival,
    MinAway: trainMinutes
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.arrival);
  console.log(newTrain.minutes)

  alert("Train Name added");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#arrival-input").val("");
  $("minutes-away-input").val("");
});


database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFrequency = childSnapshot.val().frequency;
  var trainArrival = childSnapshot.val().arrival;
  var trainMinutes = childSnapshot.val().minutes;

  
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFrequency);
  console.log(trainArrival);
  console.log(trainMinutes);

  
  var trainFrequencyPretty = moment.unix(trainfrequency).format("HHmm");

  
  var trainFrequency = moment().diff(moment(trainFrequency, "X"), "minutes");
  console.log(trainFrequency);

  
  var trainArrival = trainfrequency * trainArrival;
  console.log(trainArrival);

  
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequencyPretty),
    $("<td>").text(trainArrival),
    $("<td>").text(trainMinutes),
  );

  
  $("#train-table > tbody").append(newRow);
});