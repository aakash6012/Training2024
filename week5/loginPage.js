import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  onValue,
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

function fbIcon(){
    window.location.href = "http://127.0.0.1:5502/week5/admin.html";
    console.log("dfdfS")
}
const app = initializeApp(firebaseConfig);
document
  .getElementById("registrationform")
  .addEventListener("submit", formSubmit);
var duplicate;
function formSubmit(e) {
  e.preventDefault();

  let nameInput = document.querySelector("#userName");
  let emailInput = document.querySelector("#userEmail");
  let passwordInput = document.querySelector("#phone");
  let phoneInput = document.querySelector("#password");

  let name = nameInput.value;
  let email = emailInput.value;
  let password = passwordInput.value;
  let phone = phoneInput.value;

  if (
    !name.trim() ||
    !email.trim() ||
    !password.trim() ||
    !phone.trim()
  ) {
    alert("Please fill in all the fields");
    return;
  }

  sendMessage(name, email, password, phone);

  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  phoneInput.value = "";
}
function sendMessage(name, email, password, phone) {
  const database = getDatabase();

  set(ref(database, "users/" + Math.floor(Math.random() * 10000000)), {
    name: name,
    email: email,
    password: password,
    phone: phone,
  })
    .then(() => {
      console.log(
        "User registered and additional information added to Firestore."
      );
    })
    .catch((error) => {
      console.error("Registration failed: ", error);
    });
}

const db = getDatabase();
console.log(db, "db");
var duplicate = [];
const starCountRef = ref(db, "users/");
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data, "data");

  let users = [];
  for (let key in data) {
    users.push({ email: data[key].email, password: data[key].password });
  }
  console.log(users, "gh");
  duplicate = users;
});

var loginSection = document.getElementById("login-section");
var signupSection = document.getElementById("signup-section");

var button = document
  .getElementById("button1")
  .addEventListener("click", toggleForm);
var button = document
  .getElementById("button2")
  .addEventListener("click", toggleForm);
function toggleForm() {
  if (loginSection.style.display === "none") {
    loginSection.style.display = "block";
    signupSection.style.display = "none";
  } else {
    loginSection.style.display = "none";
    signupSection.style.display = "block";
  }
}

function signup() {
  console.log("df");
}

// var btnSignup = document.getElementById("btnSignup").addEventListener("click", tForm)
// function tForm() {
//     let name = document.querySelector("#userName");
//     let email = document.querySelector("#userEmail");
//     let password = document.querySelector("#phone");
//     let phone = document.querySelector("#password");

//     name.value="";
//     email.value ="";
//     password.value ="";
//      phone.value="";

// }

document
  .getElementById("loginForm")
  .addEventListener("submit", loginSubmit);

function loginSubmit(e) {
  e.preventDefault();

  let email = document.querySelector("#Email").value;
  let password = document.querySelector("#userPass").value;

  console.log("Email:", email);
  console.log("Password:", password);

  var adminEmail = "aakashyadav112000@gmail.com";

  var adminPass = "123";

  var isValidUser = false;
  var isAdmin = false;
  for (var i = 0; i < duplicate.length; i++) {
    if (
      duplicate[i].email === email &&
      duplicate[i].password === password
    ) {
      isValidUser = true;
      isAdmin =
        duplicate[i].email === adminEmail &&
        duplicate[i].password === adminPass;
      break;
    }
  }

  console.log("isValidUser:", isValidUser);
  console.log("isAdmin:", isAdmin);

  if (isValidUser) {
    if (isAdmin) {
      console.log("Redirecting to admin page...");
      window.location.replace("http://127.0.0.1:5502/week5/cards.html");
    } else {
      console.log("Redirecting to user page...");
      window.location.replace(
        "http://127.0.0.1:5502/week5/taskManager.html"
      );
    }
  } else {
    alert("Invalid email or password. Please try again.");
  }
}
