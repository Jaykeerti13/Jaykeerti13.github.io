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

// To Display (Runs permanently without calling)

firebase.auth().onAuthStateChanged((user)=>
{
    if(user)
    {
        let user=firebase.auth().currentUser;
        let uid;
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

// Update info

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
    firebaseRef.update(
    {
        Name: name,
        DOB: dob,
        Gender: gender,
        Planet: planet,
        Bio: bio, 
    }
    )
}

// Update DP

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

// Next Page

function next()
{
    window.location.replace("Chat.html");
}

