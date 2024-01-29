
function saveData() {
    var Username = document.getElementById("usname").value;
    var Email_ = document.getElementById("email").value;
    var phone_ = document.getElementById("phone").value;
    var Password = document.getElementById("pass").value;
    let user_records = new Array();
    
    user_records = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : []
    if (user_records.some((v) => {
        return v.email == Email_
    })) {
        alert("Duplicate Data");
    }
    else {
        user_records.push({
            "Username": Username,
            "email": Email_,
            "phone": phone_,
            "password": Password
        })

        alert("You have register successfully");
        localStorage.setItem("users", JSON.stringify(user_records));
    }
}
