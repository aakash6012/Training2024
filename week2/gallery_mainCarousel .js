const response = await fetch("employee.json");

const json = await response.json();
let data = json;
console.log(typeof data);
console.log(data);
let size = Object.keys(data).length;
console.log(data[1]);

var counter = 0;
var Next = document.getElementById("value1");
var Go = document.getElementById("value2");

// function func0() {
//   document.getElementById("name").innerHTML = data[counter].name;
//   document.getElementById("Designation").innerHTML = data[counter].Designation;
//   document.getElementById("Domain").innerHTML = data[counter].Domain;
//   document.getElementById("image").src = data[counter].image;
//   document.getElementById("YearOfExperience").innerHTML = data[counter].YearOfExperience;
// }


function func0() {
  $("#name").text(data[counter].name);
  $("#Designation").text(data[counter].Designation);
  $("#Domain").text(data[counter].Domain);
  $("#image").attr("src", data[counter].image);
  $("#YearOfExperience").text(data[counter].YearOfExperience);
}

// function func0() {
//     document.getElementsByName("name").innerHTML = data[counter].name;
//     document.getElementsByName("Designation").innerHTML = data[counter].Designation;
//     document.getElementsByName("Domain").innerHTML = data[counter].Domain;
//     document.getElementsByName("image").src = data[counter].image;
//     document.getElementsByName("YearOfExperience").innerHTML = data[counter].YearOfExperience;
//   }


//   function func0() {
//     document.getElementsByClassName('.name').innerHTML = data[counter].name;
//     document.getElementsByClassName('.Designation').innerHTML = data[counter].Designation;
//     document.getElementsByClassName('.Domain').innerHTML = data[counter].Domain;
//     document.getElementsByClassName('.image').src = data[counter].image;
//     document.getElementsByClassName(".YearOfExperience").innerHTML = data[counter].YearOfExperience;
//   }


// using array indexing or other properties
// var myDivElement = document.body.children[1]; // Assuming the div is the second child of the body


func0();

Next.addEventListener("click", func1);

function func1() {
  counter++;

  for (let i = counter; i == 5; i++) {
    counter = 0;
  }

  func0();
}

Go.addEventListener("click", func2);

function func2() {
  for (let i = counter; i <= 0; i++) {
    counter = 5;
  }

  counter--;
  func0();
}
