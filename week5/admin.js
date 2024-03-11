import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import {
    getDatabase, ref, set, get, child, onValue
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyATeWGSWKQxe5615G2mNZY9jvEzzKL0Ofw",
    authDomain: "login-fire-base-75fec.firebaseapp.com",
    databaseURL:
        "https://login-fire-base-75fec-default-rtdb.firebaseio.com",
    projectId: "login-fire-base-75fec",
    storageBucket: "login-fire-base-75fec.appspot.com",
    messagingSenderId: "611273500278",
    appId: "1:611273500278:web:fbeee4936b986a785c2157",
};
const app = initializeApp(firebaseConfig);

const db = getDatabase();
var duplicate = [];
const starCountRef = ref(db, 'users/');

onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    let users = [];
    let sno = 1;
    for (let key in data) {
        users.push({ sno: sno, email: data[key].email, name: data[key].name, phone: data[key].phone, password: data[key].password, admin: data[key].isAdmin });
        sno++;
    }
    duplicate = users;
    generateTable(duplicate);
});

function generateTable(data) {
    var table = '<table border="3">';
    table += '<tr><th>Sno</th><th>Name</th><th>Email</th><th>Phone</th><th>Password</th><th>Admin</th></tr>';
    for (var i = 0; i < data.length; i++) {
        table += '<tr>';
        table += '<td>' + data[i].sno + '</td>';
        table += '<td>' + data[i].name + '</td>';
        table += '<td>' + data[i].email + '</td>';
        table += '<td>' + data[i].phone + '</td>';
        table += '<td>' + data[i].password + '</td>';
        table += '<td>' + data[i].admin + '</td>';
        table += '</tr>';
    }
    table += '</table>';
    document.getElementById('table-container').innerHTML = table;
}
