import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
 import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
 import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
 import {
     getDatabase, ref, set, get, child, onValue
 } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

 const firebaseConfig = {
apiKey: "AIzaSyBOWVTPiBjCN3DDsgs6l45rEa1PPP7FRIY",
authDomain: "first-project-c08db.firebaseapp.com",
databaseURL: "https://first-project-c08db-default-rtdb.firebaseio.com",
projectId: "first-project-c08db",
storageBucket: "first-project-c08db.appspot.com",
messagingSenderId: "614560517378",
appId: "1:614560517378:web:39887867468e218af2c61b"
};
 const app = initializeApp(firebaseConfig);

 const db = getDatabase();
 var duplicate = [];
 const starCountRef = ref(db, 'users/');

 onValue(starCountRef, (snapshot) => {
     const data = snapshot.val();
      console.log(data);
     let users = [];
     let sno = 1;
     for (let key in data) {
         users.push({sno: sno, Task: data[key].Task, name: data[key].UserName, startDate: data[key].startDate, endDate: data[key].endDate
});
         sno++;
     }
     duplicate = users;
     console.log(duplicate); 
     generateTable(duplicate);
 });

 function generateTable(data) {
     var table = '<table border="3">';
     table += '<tr><th>Sno</th><th>User Name</th><th>Task Name</th><th>Start Date</th><th>End Date</th></tr>';
     for (var i = 0; i < data.length; i++) {
         table += '<tr>';
         table += '<td>' + data[i].sno + '</td>';
         table += '<td>' + data[i].name + '</td>';
         table += '<td>' + data[i].Task + '</td>';
         table += '<td>' + data[i].startDate + '</td>';
         table += '<td>' + data[i].endDate+ '</td>';
         table += '</tr>';
     }
     table += '</table>';
     document.getElementById('table-container').innerHTML = table;
 }
