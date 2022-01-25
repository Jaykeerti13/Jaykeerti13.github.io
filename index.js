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

  //check for valid username
  
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

  //check for valid password

 function checkPassword()
 {
    var userSIPassword = document.getElementById("password");
    var userSIPasswordFormate = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;    
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

// signin function

function signIn()
{
    var userSIEmail = document.getElementById("email").value;
    var userSIPassword = document.getElementById("password").value;
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userSIPasswordFormate =/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

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
                    window.location.replace("Profile.html");
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
