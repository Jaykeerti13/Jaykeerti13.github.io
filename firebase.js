var firebaseConfig = {
    apiKey: "AIzaSyCDXkryBpoDZ2DGSnrLxrsPPymY-84YGm4",
    authDomain: "republic-13.firebaseapp.com",
    databaseURL: "https://republic-13-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "republic-13",
    storageBucket: "republic-13.appspot.com",
    messagingSenderId: "387031321812",
    appId: "1:387031321812:web:d8ab351d650192c0c8bf41",
    measurementId: "G-XFFQFX50DN"
  };
  firebase.initializeApp(firebaseConfig);
  function checkUsername()
  {
    var userSIEmail = document.getElementById("email");
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(userSIEmail.value.match(userSIEmailFormate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
        document.getElementById("emailError").style.display = "block";
    }else{
        document.getElementById("emailError").style.display = "none";
    }
  }
 function checkPassword()
 {
    var userSIPassword = document.getElementById("password");
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag;
    if(userSIPassword.value.match(userSIPasswordFormate)){
        flag = false;
    }else{
        flag = true;
    }    
    if(flag){
        document.getElementById("passError").style.display = "block";
    }else{
        document.getElementById("passError").style.display = "none";
    }
}
function checkName()
{
    var userSIName = document.getElementById("Name").value;
    var flag = false;
    if(userSIName == "" || userSIName== null )
    {
        flag=true;
    }
    if(flag)
    {
        document.getElementById("nameError").style.display="block";
    }
    else
    {
        document.getElementById("nameError").style.display="none";
    }
}
function checkPasswordAgain()
{
    var pass=document.getElementById("password").value;
    var repass=document.getElementById("re-password").value;
    var flag = false;
    if(pass===repass)
        flag=true;
    if(flag)
        document.getElementById("repassError").style.display = "none";
    else
        document.getElementById("repassError").style.display = "block";
}
function signIn()
{
    var userSIEmail = document.getElementById("email").value;
    var userSIPassword = document.getElementById("password").value;
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
    var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);

    if(checkUserEmailValid == null){
        return checkUserSIEmail();
    }else if(checkUserPasswordValid == null){
        return checkUserSIPassword();
    }else{
        firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {
             {
                setTimeout(function(){
                    window.location.replace("Home.html");
                }, 1000)
            };
        }).catch((error) => 
        {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            })
        };
    }
function signup()
{
    var userFullName = document.getElementById("Name").value;
    var userEmail = document.getElementById("email").value;
    var userPassword = document.getElementById("password").value;
    var repass = document.getElementById("re-password").value;
    var userFullNameFormate = /^([A-Za-z.\s_-])/;    
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);

    if(checkUserFullNameValid == null)
    {
        return checkName();
    }
    else if(checkUserEmailValid == null)
    {
        return checkEmail();
    }
    else if(checkUserPasswordValid == null)
    {
        return checkPassword();
    }
    else if(userPassword!=repass)
    {
        return checkPasswordAgain();
    }
    else
    {
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            // var firebaseRef = firebase.database().ref();
            // var userData = {
            //     userFullName: userFullName,
            //     userSurname: userSurname,
            //     userEmail: userEmail,
            //     userPassword: userPassword,
            //     userFb: "https://www.facebook.com/",
            //     userTw: "https://twitter.com/",
            //     userGp: "https://plus.google.com/",
            //     userBio: "User biography",
            // }
            // firebaseRef.child(uid).set(userData);
            user.sendEmailVerification().then(function() {
                
              }).catch(function(error) {
                var errormessage = error.message;
                console.log(errormessage);
              });
        })
    }
}