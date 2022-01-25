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

// Display DP

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

// Search for a friend

function friendsearch()
{
    document.getElementById("friendadded").style.display="none";
    document.getElementById("addfriend").style.display="none";
    var search=document.getElementById("search").value;
    var db=firebase.firestore();
    var firebaseRef = db.collection("users");
    firebaseRef.where("Name","==",search.toUpperCase()).get().then((querySnapshot) =>
    {
        querySnapshot.forEach((doc)=>{
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
            var friendsref=db.collection("friends");
            friendsref.doc(firebase.auth().currentUser.uid).collection(doc.id).doc("Date added").get().then((docSnapshot)=>{
            if(docSnapshot.exists)
            {
               document.getElementById("friendadded").style.display="block";
            }
            else
            {
                document.getElementById("addfriend").style.display="block";
            }
        })
            friendsref.doc(doc.id).collection(firebase.auth().currentUser.uid).doc("Date added").get().then((docSnapshot)=>
            {
                if(docSnapshot.exists)
                {
                    document.getElementById("friendadded").style.display="block";
                    document.getElementById("addfriend").style.display="none";
                    friendsref.doc(firebase.auth().currentUser.uid).collection(doc.id).doc("Date added").set({
                        Date:docSnapshot.data(),
                    })
                }
            })
        })
    })
}

// Open Profile

function profile()
{
    window.location.replace("Profile.html");
}

// Add friend

function addfriend()
{
    var search=document.getElementById("search").value;
    var db=firebase.firestore();
    var firebaseRef = db.collection("users");
    firebaseRef.where("Name","==",search.toUpperCase()).get().then((querySnapshot) =>
    {
        querySnapshot.forEach((doc)=>{
            var uid=firebase.auth().currentUser.uid;
            var friendsref=db.collection("friends");
            friendsref.doc(uid).collection(doc.id).doc("Date added").set({
                Date:new Date,
            })
            friendsref.doc(doc.id).collection(uid).doc("Date added").set({
                Date:new Date,
            })
            friendsref.doc(uid).get().then((dog)=>
            {
                if(dog.data().Friends!=null)
                {
                   friendsref.doc(uid).update({
                       Friends: firebase.firestore.FieldValue.arrayUnion(doc.id)
                   })
                }
                else
                {
                    friendsref.doc(uid).update({
                        Friends: [doc.id]
                    })
                }
            })
            friendsref.doc(doc.id).get().then((dog)=>
            {
                if(dog.data().Friends!=null)
                {
                   friendsref.doc(doc.id).update({
                       Friends: firebase.firestore.FieldValue.arrayUnion(uid)
                   })
                }
                else
                {
                    friendsref.doc(doc.id).update({
                        Friends: [uid]
                    })
                }
            })
            document.getElementById("addfriend").style.display="none";
            document.getElementById("friendadded").style.display="block";
        })
    })
}

// Send a message

function sendMessage(){
    var timestamp = Date.now();
    const messageInput=document.getElementById("text");
    const message=messageInput.value;

    messageInput.value="";

    let uid=firebase.auth().currentUser.uid;
    var db=firebase.firestore();
    var jay=db.collection("kcb6tvXwiQSAMEWSYcRv6Gm5NAl2");
    var stu=db.collection("SBVJDjeMzbggv2XEwEt4lwrpUQM2");
    if(uid=="kcb6tvXwiQSAMEWSYcRv6Gm5NAl2")
    {
        db.collection("kcb6tvXwiQSAMEWSYcRv6Gm5NAl2").doc("/"+timestamp).set({
            message : message,
            whose : 1
        },{merge:true});
        db.collection("SBVJDjeMzbggv2XEwEt4lwrpUQM2").doc("/"+timestamp).set({
            message : message,
            whose : 0
        },{merge:true});
    }
    if(uid=="SBVJDjeMzbggv2XEwEt4lwrpUQM2")
    {
        db.collection("kcb6tvXwiQSAMEWSYcRv6Gm5NAl2").doc("/"+timestamp).set({
            message : message,
            whose : 0
        },{merge:true});
        db.collection("SBVJDjeMzbggv2XEwEt4lwrpUQM2").doc("/"+timestamp).set({
            message : message,
            whose : 1
        },{merge:true});
    }  
}

// Load a message

function loadMessages(u)
{
    let uid=u;
    var db=firebase.firestore();
    console.log(uid);
    var currentUser=db.collection(uid);
    currentUser.get().then((querySnapshot)=>
    {
        querySnapshot.forEach((doc)=>
        {
            if(doc.data().whose=="1")
            {
                var message=document.createElement("input");
                message.type="text";
                message.disabled=true;
                message.id=doc.id;
                message.value=doc.data().message;
                message.className="right";
                document.getElementById("chatbox").appendChild(message);
                var div=document.getElementById("chatbox");
               // div.scrollTop=div.scrollHeight;

            }
            else    
            {
                var message=document.createElement("input");
                message.type="text";
                message.disabled=true;
                message.id=doc.id;
                message.value=doc.data().message;
                message.className="left";
                document.getElementById("chatbox").appendChild(message);                
               // div.scrollTop=div.scrollHeight;
            }
        })
    })
    currentUser.onSnapshot((snapshot)=>
    {
        snapshot.docChanges().forEach((change)=>{
        if(change.doc.data().whose=="1")
            {
                var message=document.createElement("input");
                message.type="text";
                message.disabled=true;
                message.id=change.doc.id;
                message.value=change.doc.data().message;
                message.className="right";
                document.getElementById("chatbox").appendChild(message);
               // div.scrollTop=div.scrollHeight;
            }
            else    
            {
                var message=document.createElement("input");
                message.type="text";
                message.disabled=true;
                message.id=change.doc.id;
                message.value=change.doc.data().message;
                message.className="left";
                document.getElementById("chatbox").appendChild(message);
                //div.scrollTop=div.scrollHeight;                
            }
        })
    })
}

// List of friends

firebase.auth().onAuthStateChanged((user)=>
{
    if(user)
    {
        let user=firebase.auth().currentUser;
        let uid
        if(user!=null)
            uid=user.uid;
        var db=firebase.firestore();
        let firebaseRef = db.collection("friends").doc(uid);
        var storage=firebase.storage();
        var storageRef=storage.ref();

        firebaseRef.get().then((doc) =>
        {
            var friends=[];
            friends=doc.data().Friends;
            for(let i=0;i<friends.length;i++)
            {
                db.collection("users").doc(friends[i]).get().then((doc)=>
                {
                    var image = document.createElement("img");
                    var name = document.createElement("input");
                    name.type = "text";
                    name.classList.add("chatName");
                    name.disabled = "true";
                    image.classList.add("chatdp");
                    name.value = doc.data().Name;
                    console.log(name.value)
                    if(doc.data().url!=null)
                    {
                        storageRef.child(doc.data().url).getDownloadURL().then((url) => 
                        {
                            image.src = url;
                        }
                        )
                    }
                    else
                    {
                        storageRef.child(uid).getDownloadURL().then((url) => 
                        {
                            image.src = "pp.jpg";    
                        }
                        )
                    }
                    document.getElementById("list").appendChild(image);
                    document.getElementById("list").appendChild(name);
                });
            }
        });
    }
});
