let addBtn = document.getElementById('add_btn')
let addText = document.getElementById('add_text')

addBtn.addEventListener('click',addChapter)
let parent_List = document.getElementById('parentList');
function addChapter(e) {
    // console.log(addText.value)
if(parent_List.children[0].className == "emptyMsg"){
    parent_List.children[0].remove()
}

    let currentChapterName = addText.value;
    let newLi= document.createElement('li')
    // adding class name here

    //newLi.classList.add('list-group-item')

    newLi.className="list-group-item  d-flex justify-content-between";
    // changing the value of text content
    // newLi.textContent = addText.value
    //use bactics
    //template literals
    // / insert in dom
    newLi.innerHTML = `<h3 class="flex-grow-1">  ${currentChapterName} </h3>  
    <button class="btn btn-warning mx-3">Edit</button>  
    <button class="btn btn-danger"  onclick="removeChapter(this)" >Remove</button>`

    // append vale know using dom
   
    parent_List.appendChild(newLi)

   

    
}


function editChapter(currElement){
    // console.log(currElement.previousElementSibling)

    if(currElement.textContent == "Done"){
        currElement.textContent ="Edit"
        let currChapterName = currElement.previousElementSibling.value
        let currHeading = document.createElement('h3');
        currHeading.className ="flex-grow-1"
        currHeading.textContent = currChapterName
        currElement.parentElement.replaceChild(currHeading,currElement.previousElementSibling)

    }else{
        currElement.textContent ="Done"
        let currChapterName = currElement.previousElementSibling.textContent
        let currInput = document.createElement('input');
        currInput.type ="text"
        currInput.placeholder ="chapter Name"
        currInput.className ="form-control"
        currInput.value = currChapterName;
    
        currElement.parentElement.replaceChild(currInput,currElement.previousElementSibling)
    
        
    }
    // currElement.previousElementSibling.remove()


}

function removeChapter(currElement){

    // console.log(currElement.parentElement)
    currElement.parentElement.remove()
    let parent_List = document.getElementById('parentList');
    if(parent_List.children.length <= 0)
    {
        let newEmptyMsg = document.createElement("h3")
        newEmptyMsg.classList.add("emptyMsg")
        newEmptyMsg.textContent = "Nothing is here .Please Add a Chapter!!"
        parent_List.appendChild(newEmptyMsg)
    }
    // currElement.previousElementSibling.remove()

}





