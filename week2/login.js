var btn = document.getElementById('btn-login');


// btn.addEventListener('click', function () {
//     console.log(122)
//     var email = document.getElementById("usname").value;
//     var password = document.getElementById("pass").value;

//     var user_record = new Array();
//     user_record = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : []
//     console.log((user_record))


//     if (user_record.some((v) => {

//         return v.email == email && v.password == password;

//     })) {

//         alert("Login  Successfull");
//          window.location.replace("http://127.0.0.1:5502/week2/gallery_main.html");
//         // location.replace("ps://www.w3schools.com")

//     }
//     else {
//         alert("Invalid information");
//     }

//     console.log((user_record))
// })


function onSubmitForn(){
    

    // window.location.replace("http://127.0.0.1:5502/week2/gallery_main.html");
    var email = document.getElementById("usname").value;
    var password = document.getElementById("pass").value;

    var user_record = new Array();
    user_record = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : []
    console.log((user_record))


    if (user_record.some((v) => {

        return v.email == email && v.password == password;

    })) 
    {

        alert("Login  Successfull");
         window.location.replace("http://127.0.0.1:5502/week2/gallery_main.html");
        // location.replace("ps://www.w3schools.com")

    }
    else {
        alert("Invalid information");
    }

    console.log((user_record))

}