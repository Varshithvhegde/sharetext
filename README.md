<h1 align="center" style="font-size:50px;"><a href="https://sharetext.vercel.app">Share Text</a></h1>

A simple text sharing service. It is a simple web application that allows you to share text snippets with other people. It is written in JavaScript and uses Firebase as a backend.

## Features

* Share text snippets with other people
* Share text snippets with a password
* Get unique URLs for each text snippet
* Protect text snippets with a password
* Also uses unique URLs for each text snippet

## Working and How to use

### Save the text snippet
* Open the website [sharetext](https://sharetext.vercel.app/)
* Enter the password in the password field
* Enter the text in the text field that you want to share and protect it with a password
* Click on the save button 
* You will get a unique URL for your text snippet 
* If you want to share the text snippet with other people without a password, then you can leave the password field empty.
* If you want to share the text snippet with other people with a password, then you can enter the password in the password field.
* You can get just below the text field a unique URL for your text snippet.
### Viewing protected text snippet

* Open the unique URL that you got
* If you have entered a password, then you will have to enter the password in the password field
* It will take a second to load the text snippet
* You will get the text snippet in the text field
* You can copy the text snippet from the text field
* You can also edit the text snippet in the text field
* And you can also save the text snippet in the text field
* You will also get a share button below the text field

![frame_generic_dark (15)](https://user-images.githubusercontent.com/80502833/208247825-b9e6d917-ab73-4238-853f-9b4540088d3c.png)


## Code Review

* Code to save the text snippet
```js
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
    // Show the link to the share the message
    // Get link from the url
    var url_string = window.location.href;
    var url = new URL(url_string);
     link = url.origin + url.pathname + "?unique=" + unique;
    // Make the link clickable and also add share button
    document.getElementById("link").innerHTML = "<a href='" + link + "'>" + link + "</a>";
    document.getElementById("link").innerHTML += "<br><br><button onclick='share()'>Share</button>";

   
}
```

* Code to get the text snippet
```js
ref.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        
        if(childData.number == unique){
            if (childData.number == unique){
                if(childData.password == password){
                    // Display the message
                    document.getElementById("create").style.display = "block";
                    document.getElementById("message").innerHTML = childData.text;
                }
                else{
                    // Display error message
                   document.getElementById("message").innerHTML = "Wrong password";
                }
            }
        }
       
            });

    }
);
```

* Code to Generated unique ID for each text snippet
```js
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
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.




