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
                console.log(uid);
            }
            var db= firebase.firestore();
            db.collection("users").doc(uid).set({      
                Name: userFullName.toUpperCase(),
                DOB: "01/01/2000",
                Gender: "gender",
                Planet: "planet",
                Bio: "bio",
                url: "url",
            }).catch((error)=>{
                console.error(error);
            })
            user.sendEmailVerification().then(function() {
                setTimeout(function(){
                    window.location.replace("AfterReg.html");
                }, 2000)
              }).catch(function(error) {
                var errormessage = error.message;
                console.log(errormessage);
              });
        })
    }
}
firebase.auth().onAuthStateChanged((user)=>
{
    if(user)
    {
        let user=firebase.auth().currentUser;
        let uid
        if(user!=null)
            uid=user.uid;
        var db=firebase.firestore();
        let firebaseRef = db.collection("users").doc(uid);
        var storage=firebase.storage();
        var storageRef=storage.ref();
        firebaseRef.get().then((doc) =>
        {
            document.getElementById("Name").value=doc.data().Name;
            document.getElementById("DOB").value=doc.data().DOB;
            document.getElementById("Gender").value=doc.data().Gender;
            document.getElementById("Planet").value=doc.data().Planet;
            document.getElementById("Bio").value=doc.data().Bio;
            if(doc.data().url!=null)
            {
                storageRef.child(doc.data().url).getDownloadURL().then((url) => 
                {
                    document.getElementById("displaypic").setAttribute('src', url);
                }
                )
            }
            else
            {
                storageRef.child(uid).getDownloadURL().then((url) => 
                {
                    document.getElementById("displaypic").setAttribute('src', 'pp.jpg');
                }
                )
            }
        }
        )
    }
    else
        alert("User is not signed in");
}
);
function update()
{
    var uid=firebase.auth().currentUser.uid;
    var name=document.getElementById("Name").value;
    var dob=document.getElementById("DOB").value;
    var gender=document.getElementById("Gender").value;
    var planet=document.getElementById("Planet").value;
    var bio = document.getElementById("Bio").value
    var db=firebase.firestore();
    let firebaseRef=db.collection("users").doc(uid);
    firebaseRef.set(
    {
        Name: name,
        DOB: dob,
        Gender: gender,
        Planet: planet,
        Bio: bio, 
    }
    )
}
function changeimage()
{
    var uid=firebase.auth().currentUser.uid;
    var storage=firebase.storage();
    var storageRef=storage.ref(uid);
    var photo=document.getElementById("files").files[0];
    storageRef.child(photo.name).put(photo);
    var db=firebase.firestore();
    let firebaseRef=db.collection("users").doc(uid);
    firebaseRef.update({
        url:uid+"/"+photo.name,
    })
    storageRef.child(photo.name).getDownloadURL().then((url) => 
                {
                    document.getElementById("displaypic").setAttribute('src', url);
                }
                )
}
function next()
{
    window.location.replace("Chat.html");
}
firebase.auth().onAuthStateChanged((user)=>
{
    if(user)
    {
        let user=firebase.auth().currentUser;
        let uid
        if(user!=null)
            uid=user.uid;
        var db=firebase.firestore();
        let firebaseRef = db.collection("users").doc(uid);
        var storage=firebase.storage();
        var storageRef=storage.ref();
        firebaseRef.get().then((doc) =>
        {
            if(doc.data().url!=null)
            {
                storageRef.child(doc.data().url).getDownloadURL().then((url) => 
                {
                    document.getElementById("profile").setAttribute('src', url);
                }
                )
            }
            else
            {
                storageRef.child(uid).getDownloadURL().then((url) => 
                {
                    document.getElementById("profile").setAttribute('src', 'pp.jpg');
                }
                )
            }
        }
        )
    }
    else
        alert("User is not signed in");
}
);
function chat()
{
    var database = firebase.database();
    var text = document.getElementById("text").value;
    database.ref('users/kcb6tvXwiQSAMEWSYcRv6Gm5NAl2/Friends/SBVJDjeMzbggv2XEwEt4lwrpUQM2').set({
        message: text,
    })
}
function friendsearch()
{
    var size;
    var search=document.getElementById("search").value;
    var db=firebase.firestore();
    var firebaseRef = db.collection("users");
    firebaseRef.where("Name","==",search.toUpperCase()).get().then((querySnapshot) =>
    {
        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
        console.log("in where");
        document.getElementById("name").style.display="block";
        document.getElementById("name").value=doc.data().Name;
        document.getElementById("dob").style.display="block";
        document.getElementById("dob").value=doc.data().DOB;
        document.getElementById("planet").style.display="block";
        document.getElementById("planet").value=doc.data().Planet;
        document.getElementById("bio").style.display="block";
        document.getElementById("bio").value=doc.data().Bio;
        var storage=firebase.storage();
        var storageRef=storage.ref();
        if(doc.data().url!=null)
        {
            storageRef.child(doc.data().url).getDownloadURL().then((url) => 
            {
                document.getElementById("friendsdp").style.display="block";
                document.getElementById("friendsdp").setAttribute('src', url);
            }
            )
        }
        else
        {
            document.getElementById("friendsdp").style.display="block";
                document.getElementById("friendsdp").setAttribute('src', 'pp.jpg');
        }
    })
})
}
function profile()
{
    window.location.replace("Profile.html");
}