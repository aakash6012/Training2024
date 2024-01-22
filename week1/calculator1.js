
let display1=document.getElementById('display')
let funOne = document.getElementById('fun1')

// its is event function which is writte below we can use multiple property of this
funOne.addEventListener('click',(e)=>{
    display1.value +='1'
}
)


let funTwo = document.getElementById('fun2')

funTwo.addEventListener('click',()=>{
    display1.value +='2'
})

let funThree = document.getElementById('fun3')

funThree.addEventListener('click',()=>{
    display1.value +='3'
})

let funAdd = document.getElementById('add')

funAdd.addEventListener('click' ,()=>{
    display1.value += '+'
})





let funFour = document.getElementById('fun4')

// its is event function which is writte below we can use multiple property of this
funFour.addEventListener('click',(e)=>{
    display1.value +='4'
}
)


let funFive = document.getElementById('fun5')

funFive.addEventListener('click',()=>{
    display1.value +='5'
})

let funSix = document.getElementById('fun6')

funSix.addEventListener('click',()=>{
    display1.value +='6'
})

let funSub = document.getElementById('sub')

funSub.addEventListener('click' ,()=>{
    display1.value += '-'
})


let funSeven = document.getElementById('fun7')

// its is event function which is writte below we can use multiple property of this
funSeven.addEventListener('click',(e)=>{
    display1.value +='7'
}
)


let funEight = document.getElementById('fun8')

funEight.addEventListener('click',()=>{
    display1.value +='8'
})

let funNine = document.getElementById('fun9')

funNine.addEventListener('click',()=>{
    display1.value +='9'
})

let funMul = document.getElementById('mul')

funMul.addEventListener('click' ,()=>{
    display1.value += '*'
})


function funDot(){
display1.value +='.'
}

function funDiv(){
    display1.value += '/'
}

function funClear(){
    display1.value  = ''
}



let funDbZero = document.getElementById('fun00')

funDbZero.addEventListener('click' ,()=>{
    display1.value += '00'
})

let funZero = document.getElementById('fun0')

funZero.addEventListener('click' ,()=>{
    display1.value += '0'
})


let funDlt = document.getElementById('Dlt')

funDlt.addEventListener('click' ,()=>{
    display1.value = display1.value.toString().slice(0,-1)
})



let funPert = document.getElementById('funPer')
funPert.addEventListener('click' ,()=>{
    display1.value += '%'
})


let funEqual = document.getElementById('funEql')
funEqual.addEventListener('click' ,()=>{
    display1.value =eval(display1.value)
})










