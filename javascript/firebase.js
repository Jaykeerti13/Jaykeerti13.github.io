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
  export {firebaseConfig};
//   firebase.initializeApp(firebaseConfig);
//   function checkUsername()
//   {
//     var userSIEmail = document.getElementById("email");
//     var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     var flag;
//     if(userSIEmail.value.match(userSIEmailFormate)){
//         flag = false;
//     }else{
//         flag = true;
//     }
//     if(flag){
//         document.getElementById("emailError").style.display = "block";
//     }else{
//         document.getElementById("emailError").style.display = "none";
//     }
//   }
//  function checkPassword()
//  {
//     var userSIPassword = document.getElementById("password");
//     var userSIPasswordFormate = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;    
//     var flag;
//     if(userSIPassword.value.match(userSIPasswordFormate)){
//         flag = false;
//     }else{
//         flag = true;
//     }    
//     if(flag){
//         document.getElementById("passError").style.display = "block";
//     }else{
//         document.getElementById("passError").style.display = "none";
//     }
// }
// function checkName()
// {
//     var userSIName = document.getElementById("Name").value;
//     var flag = false;
//     if(userSIName == "" || userSIName== null )
//     {
//         flag=true;
//     }
//     if(flag)
//     {
//         document.getElementById("nameError").style.display="block";
//     }
//     else
//     {
//         document.getElementById("nameError").style.display="none";
//     }
// }
// function checkPasswordAgain()
// {
//     var pass=document.getElementById("password").value;
//     var repass=document.getElementById("re-password").value;
//     var flag = false;
//     if(pass===repass)
//         flag=true;
//     if(flag)
//         document.getElementById("repassError").style.display = "none";
//     else
//         document.getElementById("repassError").style.display = "block";
// }
// function signIn()
// {
//     var userSIEmail = document.getElementById("email").value;
//     var userSIPassword = document.getElementById("password").value;
//     var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     var userSIPasswordFormate =/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

//     var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
//     var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);

//     if(checkUserEmailValid == null){
//         return checkUserSIEmail();
//     }else if(checkUserPasswordValid == null){
//         return checkUserSIPassword();
//     }else{
//         firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {
//              {
//                 setTimeout(function(){
//                     window.location.replace("Profile.html");
//                 }, 1000)
//             };
//         }).catch((error) => 
//         {
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             alert(errorMessage);
//             })
//         };
//     }
// function signup()
// {
//     var userFullName = document.getElementById("Name").value;
//     var userEmail = document.getElementById("email").value;
//     var userPassword = document.getElementById("password").value;
//     var repass = document.getElementById("re-password").value;
//     var userFullNameFormate = /^([A-Za-z.\s_-])/;    
//     var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

//     var checkUserFullNameValid = userFullName.match(userFullNameFormate);
//     var checkUserEmailValid = userEmail.match(userEmailFormate);
//     var checkUserPasswordValid = userPassword.match(userPasswordFormate);

//     if(checkUserFullNameValid == null)
//     {
//         return checkName();
//     }
//     else if(checkUserEmailValid == null)
//     {
//         return checkEmail();
//     }
//     else if(checkUserPasswordValid == null)
//     {
//         return checkPassword();
//     }
//     else if(userPassword!=repass)
//     {
//         return checkPasswordAgain();
//     }
//     else
//     {
//         firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
//             var user = firebase.auth().currentUser;
//             var uid;
//             if (user != null) {
//                 uid = user.uid;
//                 console.log(uid);
//             }
//             var db= firebase.firestore();
//             db.collection("users").doc(uid).set({      
//                 Name: userFullName.toUpperCase(),
//                 DOB: "01/01/2000",
//                 Gender: "gender",
//                 Planet: "planet",
//                 Bio: "bio",
//                 url: "url",
//             }).catch((error)=>{
//                 console.error(error);
//             })
//             db.collection("friends").doc(uid).set({
//                 Username: userFullName,
//             })
//             user.sendEmailVerification().then(function() {
//                 setTimeout(function(){
//                     window.location.replace("AfterReg.html");
//                 }, 2000)
//               }).catch(function(error) {
//                 var errormessage = error.message;
//                 console.log(errormessage);
//               });
//         })
//     }
// }
// firebase.auth().onAuthStateChanged((user)=>
// {
//     if(user)
//     {
//         let user=firebase.auth().currentUser;
//         let uid;
//         if(user!=null)
//             uid=user.uid;
//         var db=firebase.firestore();
//         let firebaseRef = db.collection("users").doc(uid);
//         var storage=firebase.storage();
//         var storageRef=storage.ref();
//         firebaseRef.get().then((doc) =>
//         {
//             document.getElementById("Name").value=doc.data().Name;
//             document.getElementById("DOB").value=doc.data().DOB;
//             document.getElementById("Gender").value=doc.data().Gender;
//             document.getElementById("Planet").value=doc.data().Planet;
//             document.getElementById("Bio").value=doc.data().Bio;
//             if(doc.data().url!=null)
//             {
//                 storageRef.child(doc.data().url).getDownloadURL().then((url) => 
//                 {
//                     document.getElementById("displaypic").setAttribute('src', url);
//                 }
//                 )
//             }
//             else
//             {
//                 storageRef.child(uid).getDownloadURL().then((url) => 
//                 {
//                     document.getElementById("displaypic").setAttribute('src', 'pp.jpg');
//                 }
//                 )
//             }
//         }
//         )
//     }
//     else
//         alert("User is not signed in");
// }
// );
// function update()
// {
//     var uid=firebase.auth().currentUser.uid;
//     var name=document.getElementById("Name").value;
//     var dob=document.getElementById("DOB").value;
//     var gender=document.getElementById("Gender").value;
//     var planet=document.getElementById("Planet").value;
//     var bio = document.getElementById("Bio").value
//     var db=firebase.firestore();
//     let firebaseRef=db.collection("users").doc(uid);
//     firebaseRef.update(
//     {
//         Name: name,
//         DOB: dob,
//         Gender: gender,
//         Planet: planet,
//         Bio: bio, 
//     }
//     )
// }
// function changeimage()
// {
//     var uid=firebase.auth().currentUser.uid;
//     var storage=firebase.storage();
//     var storageRef=storage.ref(uid);
//     var photo=document.getElementById("files").files[0];
//     storageRef.child(photo.name).put(photo);
//     var db=firebase.firestore();
//     let firebaseRef=db.collection("users").doc(uid);
//     firebaseRef.update({
//         url:uid+"/"+photo.name,
//     })
//     storageRef.child(photo.name).getDownloadURL().then((url) => 
//                 {
//                     document.getElementById("displaypic").setAttribute('src', url);
//                 }
//                 )
// }
// function next()
// {
//     window.location.replace("Chat.html");
// }
// firebase.auth().onAuthStateChanged((user)=>
// {
//     if(user)
//     {
//         let user=firebase.auth().currentUser;
//         let uid
//         if(user!=null)
//             uid=user.uid;
//         var db=firebase.firestore();
//         let firebaseRef = db.collection("users").doc(uid);
//         var storage=firebase.storage();
//         var storageRef=storage.ref();
//         firebaseRef.get().then((doc) =>
//         {
//             if(doc.data().url!=null)
//             {
//                 storageRef.child(doc.data().url).getDownloadURL().then((url) => 
//                 {
//                     document.getElementById("profile").setAttribute('src', url);
//                 }
//                 )
//             }
//             else
//             {
//                 storageRef.child(uid).getDownloadURL().then((url) => 
//                 {
//                     document.getElementById("profile").setAttribute('src', 'pp.jpg');
//                 }
//                 )
//             }
//         }
//         )
//     }
//     else
//         alert("User is not signed in");
// }
// );

// function friendsearch()
// {
//     document.getElementById("friendadded").style.display="none";
//     document.getElementById("addfriend").style.display="none";
//     var search=document.getElementById("search").value;
//     var db=firebase.firestore();
//     var firebaseRef = db.collection("users");
//     firebaseRef.where("Name","==",search.toUpperCase()).get().then((querySnapshot) =>
//     {
//         querySnapshot.forEach((doc)=>{
//             document.getElementById("name").style.display="block";
//             document.getElementById("name").value=doc.data().Name;
//             document.getElementById("dob").style.display="block";
//             document.getElementById("dob").value=doc.data().DOB;
//             document.getElementById("planet").style.display="block";
//             document.getElementById("planet").value=doc.data().Planet;
//             document.getElementById("bio").style.display="block";
//             document.getElementById("bio").value=doc.data().Bio;
//             var storage=firebase.storage();
//             var storageRef=storage.ref();
//             if(doc.data().url!=null)
//             {
//                 storageRef.child(doc.data().url).getDownloadURL().then((url) => 
//                 {
//                     document.getElementById("friendsdp").style.display="block";
//                     document.getElementById("friendsdp").setAttribute('src', url);
//                 }
//                 )
//             }
//             else
//             {
//                 document.getElementById("friendsdp").style.display="block";
//                 document.getElementById("friendsdp").setAttribute('src', 'pp.jpg');
//             }
//             var friendsref=db.collection("friends");
//             friendsref.doc(firebase.auth().currentUser.uid).collection(doc.id).doc("Date added").get().then((docSnapshot)=>{
//             if(docSnapshot.exists)
//             {
//                document.getElementById("friendadded").style.display="block";
//             }
//             else
//             {
//                 document.getElementById("addfriend").style.display="block";
//             }
//         })
//             friendsref.doc(doc.id).collection(firebase.auth().currentUser.uid).doc("Date added").get().then((docSnapshot)=>
//             {
//                 if(docSnapshot.exists)
//                 {
//                     document.getElementById("friendadded").style.display="block";
//                     document.getElementById("addfriend").style.display="none";
//                     friendsref.doc(firebase.auth().currentUser.uid).collection(doc.id).doc("Date added").set({
//                         Date:docSnapshot.data(),
//                     })
//                 }
//             })
//         })
//     })
// }
// function profile()
// {
//     window.location.replace("Profile.html");
// }
// function addfriend()
// {
//     var search=document.getElementById("search").value;
//     var db=firebase.firestore();
//     var firebaseRef = db.collection("users");
//     firebaseRef.where("Name","==",search.toUpperCase()).get().then((querySnapshot) =>
//     {
//         querySnapshot.forEach((doc)=>{
//             console.log(doc.id);
//             var uid=firebase.auth().currentUser.uid;
//             console.log(uid);
//             var friendsref=db.collection("friends");
//             friendsref.doc(uid).collection(doc.id).doc("Date added").set({
//                 Date:new Date,
//             })
//             document.getElementById("addfriend").style.display="none";
//             document.getElementById("friendadded").style.display="block";
//         })
//     })
// }
// firebase.auth().onAuthStateChanged((user)=>
// {
//     if(user)
//     {
//         let user=firebase.auth().currentUser;
//         let uid;
//         if(user!=null)
//             uid=user.uid;
//         var db=firebase.firestore();
//         let firebaseRef = db.collection("users").doc(uid);
//         var storage=firebase.storage();
//         var storageRef=storage.ref();
//         if(uid=="SBVJDjeMzbggv2XEwEt4lwrpUQM2")
//         {
//             var name=document.getElementById("chatname");
//             name.value="Jaykeerti";
//             var dp=document.getElementById("chatdp");
//             dp.src="https://firebasestorage.googleapis.com/v0/b/republic-13.appspot.com/o/kcb6tvXwiQSAMEWSYcRv6Gm5NAl2%2F65f7f99a-5c93-4af4-8486-a74ab2ea9155.jpg?alt=media&token=a7b40719-3d9a-4c51-a0cf-fac89991bb5e";
//         }
//         if(uid=="kcb6tvXwiQSAMEWSYcRv6Gm5NAl2")
//         {
//             var name=document.getElementById("chatname");
//             name.value="Stuti Sharma";
//             var dp=document.getElementById("chatdp");
//             dp.src="https://firebasestorage.googleapis.com/v0/b/republic-13.appspot.com/o/SBVJDjeMzbggv2XEwEt4lwrpUQM2%2F1fb4751d-1ec0-4af6-8fa3-0e0f02a0dd9f.jpg?alt=media&token=4bfa60ef-7640-4a90-951d-d5768f8e078f";
//         }
//         // loadMessages(uid);
//     }
// });
// function sendMessage(){
//     var timestamp = Date.now();
//     const messageInput=document.getElementById("text");
//     const message=messageInput.value;

//     messageInput.value="";

//     let uid=firebase.auth().currentUser.uid;
//     var db=firebase.firestore();
//     var jay=db.collection("kcb6tvXwiQSAMEWSYcRv6Gm5NAl2");
//     var stu=db.collection("SBVJDjeMzbggv2XEwEt4lwrpUQM2");
//     if(uid=="kcb6tvXwiQSAMEWSYcRv6Gm5NAl2")
//     {
//         db.collection("kcb6tvXwiQSAMEWSYcRv6Gm5NAl2").doc("/"+timestamp).set({
//             message : message,
//             whose : 1
//         },{merge:true});
//         db.collection("SBVJDjeMzbggv2XEwEt4lwrpUQM2").doc("/"+timestamp).set({
//             message : message,
//             whose : 0
//         },{merge:true});
//     }
//     if(uid=="SBVJDjeMzbggv2XEwEt4lwrpUQM2")
//     {
//         db.collection("kcb6tvXwiQSAMEWSYcRv6Gm5NAl2").doc("/"+timestamp).set({
//             message : message,
//             whose : 0
//         },{merge:true});
//         db.collection("SBVJDjeMzbggv2XEwEt4lwrpUQM2").doc("/"+timestamp).set({
//             message : message,
//             whose : 1
//         },{merge:true});
//     }  
// }
// function loadMessages(u)
// {
//     let uid=u;
//     var db=firebase.firestore();
//     console.log(uid);
//     var currentUser=db.collection(uid);
//     currentUser.get().then((querySnapshot)=>
//     {
//         querySnapshot.forEach((doc)=>
//         {
//             if(doc.data().whose=="1")
//             {
//                 var message=document.createElement("input");
//                 message.type="text";
//                 message.disabled=true;
//                 message.id=doc.id;
//                 message.value=doc.data().message;
//                 message.className="right";
//                 document.getElementById("chatbox").appendChild(message);
//                 var div=document.getElementById("chatbox");
//                // div.scrollTop=div.scrollHeight;

//             }
//             else    
//             {
//                 var message=document.createElement("input");
//                 message.type="text";
//                 message.disabled=true;
//                 message.id=doc.id;
//                 message.value=doc.data().message;
//                 message.className="left";
//                 document.getElementById("chatbox").appendChild(message);                
//                // div.scrollTop=div.scrollHeight;
//             }
//         })
//     })
//     currentUser.onSnapshot((snapshot)=>
//     {
//         snapshot.docChanges().forEach((change)=>{
//         if(change.doc.data().whose=="1")
//             {
//                 var message=document.createElement("input");
//                 message.type="text";
//                 message.disabled=true;
//                 message.id=change.doc.id;
//                 message.value=change.doc.data().message;
//                 message.className="right";
//                 document.getElementById("chatbox").appendChild(message);
//                // div.scrollTop=div.scrollHeight;
//             }
//             else    
//             {
//                 var message=document.createElement("input");
//                 message.type="text";
//                 message.disabled=true;
//                 message.id=change.doc.id;
//                 message.value=change.doc.data().message;
//                 message.className="left";
//                 document.getElementById("chatbox").appendChild(message);
//                 //div.scrollTop=div.scrollHeight;                
//             }
//         })
//     })
// }


