var config = {
    apiKey: "AIzaSyCr8Aekj1YZxFWaK5DnW6L01YxdKDjHMt8",
    authDomain: "trai-firebasehw.firebaseapp.com",
    databaseURL: "https://trai-firebasehw.firebaseio.com",
    projectId: "trai-firebasehw",
    storageBucket: "",
    messagingSenderId: "323858154678"
};
firebase.initializeApp(config);



var database = firebase.database();

// 2. Populate Firebase Database with initial data (in this case, I did this via Firebase GUI)
// 3. Button for adding trains
$("#train-btn").on("click", function (event) {
    event.preventDefault();
    // Grabs user input
    var name = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var time = $("#time").val().trim();
    var frequency = $("#frequency").val().trim();
    // Log to check

    console.log(name);
    console.log(destination);
    console.log(time);
    console.log(frequency);

    // Creates local "temporary" object for holding train data
    var arriveTrain = {

        name: name,
        destination: destination,
        time: time,
        frequency: frequency
    };

    // Uploads train data to the database
    database.ref().push(arriveTrain);

    // Logs everything to console
    console.log(arriveTrain.name);
    console.log(arriveTrain.destination);
    console.log(arriveTrain.time);
    console.log(arriveTrain.frequency);

    // Alert
    alert("It Works bazinga!!");

    // Clears all of the text-boxes
    $("#name").val("");
    $("#destination").val("");
    $("#time").val("");
    $("#frequency").val("");

    // Determine when the next train arrives.
    return false;
});
database.ref().on("child_added", function (snapshot) {

    console.log(snapshot.val());

    var tname = snapshot.val().name;
    var tdestination = snapshot.val().destination;
    //redefining firstTime in snapshot
    var tTime = snapshot.val().time;
    //redefining frequency in snapshot
    var tfrequency = snapshot.val().frequency;
    var currentTime =  moment();
    console.log(currentTime);

    var firstTimeConverted = moment(tTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    //difference in time between current time and converted time
    var aTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("difference in time " + aTime);

    //determining remainder
    var tRemainder = aTime % tfrequency;
    console.log(tRemainder);
    //from remainder determining the time away it is based on frequency
    var minutesAway = tfrequency - tRemainder;
    console.log("minutes until train: " + minutesAway);
    //calculating the next time based on the current time and minutesAway
    var nextTime = moment().add(minutesAway, "minutes");
    console.log("arrival time: " + moment(nextTime).format("hh:mm"));
    //made new variable for format
    var nextTrainTime = moment(nextTime).format("hh:mm a");

    //creating table containing information in database and appending when new data created
    $("#train-table").append("<tr><td>" + tname + "</td><td>" + tdestination+ "</td><td>" + tfrequency + "</td><td>" + nextTrainTime + "</td><td>" + minutesAway + "</td></tr>");

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});


