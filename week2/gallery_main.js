const response = await fetch("employee.json");
const json = await response.json();
let data = json;
console.log(data[0]);

var counter = 0;
var Next = document.getElementById("btn1");
var Go = document.getElementById("btn2");

document.getElementById("name").innerHTML = data[counter].name;
document.getElementById("Designation").innerHTML = data[counter].Designation;
document.getElementById("Domain").innerHTML = data[counter].Domain;
document.getElementById("image").src = data[counter].image;
document.getElementById("YearOfExperience").innerHTML =
  data[counter].YearOfExperience;

Next.addEventListener("click", func1);

function func1() {
  console.log("ddff");

  counter++;
  if (counter === 6) {
    counter = 0;
  }

  console.log(counter);
  document.getElementById("name").innerHTML = data[counter].name;
  document.getElementById("Designation").innerHTML = data[counter].Designation;
  document.getElementById("Domain").innerHTML = data[counter].Domain;
  document.getElementById("image").src = data[counter].image;
  document.getElementById("YearOfExperience").innerHTML = data[counter].YearOfExperience;
}

Go.addEventListener("click", func2);

function func2() {
  if (counter < 0) {
    counter = 6;
  }

  counter--;
  console.log(counter);
  document.getElementById("name").innerHTML = data[counter].name;
  document.getElementById("Designation").innerHTML = data[counter].Designation;
  document.getElementById("Domain").innerHTML = data[counter].Domain;
  document.getElementById("image").src = data[counter].image;
  document.getElementById("YearOfExperience").innerHTML =
    data[counter].YearOfExperience;
}
