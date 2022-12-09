const firebaseConfig = {
    apiKey: "AIzaSyBLAdYLxRjCSoTmKN_gvC4-uIBKHLaupzw",
    authDomain: "striking-canyon-311413.firebaseapp.com",
    projectId: "striking-canyon-311413",
    storageBucket: "striking-canyon-311413.appspot.com",
    messagingSenderId: "871681750584",
    appId: "1:871681750584:web:9a3d3d75c9266c3df8d8cd",
    measurementId: "G-PXXD31X8NE"
  };

    // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var messagesRef = firebase.database().ref('messages');
 var unique;


 var url_string = window.location.href;
 var url = new URL(url_string);
 var unique = url.searchParams.get("unique");
 var ref = firebase.database().ref("messages");
 ref.on("value", function(snapshot) {
     snapshot.forEach(function(childSnapshot) {
     var childData = childSnapshot.val();
     if (childData.number == unique){
         document.getElementById("message").innerHTML = childData.text;
     }
     });
 });


function saveMessage(password, text){
    var newMessageRef = messagesRef.push();
    unique=createUniquenumber();
    newMessageRef.set({
        password: password,
        text: text,
        number: unique
    });
    // Show alert  mesasage with the unique number
    alert("Your unique number is: " + unique);
    // Clear form
    document.getElementById('password').value = '';
    document.getElementById('text').value = '';
    var email="varshithvh@gmail.com";
    // Send email to the user with the unique number using firebase functions
    var sendEmail = firebase.functions().httpsCallable('sendEmail');
    // Generate url for the user to access the message
    

   
}
function saveText(){
  var password = document.getElementById('password').value;
    var text = document.getElementById('text').value;
    saveMessage(password, text);
}

function createUniquenumber(){
    // Create a unique 5 digit number for each image which is not in the database field number yet
    var number = Math.floor(10000 + Math.random() * 90000);
    var ref = firebase.database().ref("messages");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        if (childData.number == number){
            createUniquenumber();
        }
        });
    });
    return number;
    

}
// Get the unique number from the url after the ? and display the message



