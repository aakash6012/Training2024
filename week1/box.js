    // onclick
    container2.addEventListener('click',function(){
        // console.log("Click on Sachin TendekuLAR")
        container5.value ='Click Event'
    
    })
    
    container3.addEventListener('click',function(){
        alert("Click HUa")
        container5.value ='On Alert Event'
    })
    
    container1.addEventListener('click',function(){
        if (confirm("Are you sure, want to refresh?")) {
                        location.reload();
                    }
                    container5.value ='On Reload Event'
    })
    
    container6.addEventListener('mouseout',function(){
        container5.value ='On Mouse Out Event'
        // console.log("mouse out  on  Sachin TendekuLAR")
    
    })
    
    container4.addEventListener('mouseover',function(){
        container5.value ='On Mouse Over Event'
        // console.log("mouse over")
    
    })
    
    container7.addEventListener('mouseup',function(){
        container5.value ='On Mouse Up'
        // console.log("mouse up ")
    })
    
    container8.addEventListener('mousedown',function(){
        container5.value ='On Mouse Down'
        // console.log("mouse down")
    })
    
    function color(value){
        document.body.style.backgroundColor = value;
        container5.value ='On Change Event'
    }
    