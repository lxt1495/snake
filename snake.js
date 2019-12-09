let square = document.querySelectorAll('.square')
let main=document.querySelector('.main')
let food=document.querySelector('.food')
let canvas=document.querySelector('.canvas')
let point=document.querySelector('.point')
let time=document.querySelector('.time')
let description=document.querySelector('.description')
let button=document.querySelector('.button')
let control=document.querySelector('.control')
let reset=document.querySelector('.reset')
let adjust=document.querySelector('.adjust')
let growthRate=document.querySelector('.growth-rate')
let swiftness=document.querySelector('.swiftness')
let score=0,now=0,isRunning=true,index
let n=1, canvasHeight=600, canvasWidth=600, canvasTop=0, canvasLeft=0, winCondition=25, timeCondition=60000, speed=200
let action=new Array(square.length+n)
let move={
    up(x) { if(x){x.style.top=`${x.offsetTop-20}px`}
            return 'down'},
    down(x){if(x){x.style.top=`${x.offsetTop+20}px`}
            return 'up'},
    left(x){if(x){x.style.left=`${x.offsetLeft-20}px`}
            return 'right'},
    right(x){if(x){x.style.left=`${x.offsetLeft+20}px`}
            return 'left'}
    }
function add(array,element){
    array.unshift(element)
    array.splice(array.length-1,1)
    }
function foodDefault(){
    food.style.top=canvasTop+Math.floor(Math.random()*(canvasHeight/20))*20+'px'
    food.style.left=canvasLeft+Math.floor(Math.random()*(canvasWidth/20))*20+'px'
    Object.values(square).forEach(x=>{if(x.offsetTop===food.offsetTop&&x.offsetLeft===food.offsetLeft){foodDefault()}})
    return
    }
function setDefault(){
    square = document.querySelectorAll('.square')
    Object.values(square).forEach((x,i)=>{if(i>2){x.remove()}})
    square = document.querySelectorAll('.square')
    action=new Array(square.length+n)
    score=0
    now=0
    isRunning=true
    point.textContent=`Score: ${score}`
    time.textContent='Time:'
    Object.values(square).forEach(x=>{x.style.top=canvasTop+'px';x.style.left=canvasLeft+'px'})
    for(let i=0; i<square.length; i++){
        add(action,move.right)
        action.forEach((x,i)=>{if(x){x(square[i])}})}
    foodDefault()
    document.body.removeEventListener('keydown',keydown,false)
    if(index){clearInterval(index)}
    document.body.addEventListener('keydown',keydown,false)
    index=setInterval(interval,speed)
    control.textContent='pause'
    }
function lose(){
    alert("you've lost")
    setDefault()
    }
function win(){
    alert("you've won")
    setDefault()
    }
function check(){
    if(main.offsetTop===food.offsetTop&&main.offsetLeft===food.offsetLeft)
            {
            // let realActionLength=0
            // for(let i=0; i<action.length; i++){if(action[i]){realActionLength+=1}}
            // for(let i=0; i<realActionLength-square.length; i++){
            //                         let newSquare = document.createElement('div')
            //                         document.body.appendChild(newSquare)
            //                         newSquare.className='square'
            //                         newSquare.style.top=main.offsetTop+'px'
            //                         newSquare.style.left=main.offsetLeft+'px'
            //                         for(let j=0; j<square.length+i;j++){
            //                             move[action[j]()](newSquare)}
            //   
            let lastSquare=square[square.length-1]        
            let realActionLength=0
            for(let i=0; i<action.length; i++){if(action[i]){realActionLength+=1}}
            for(let i=0; i<realActionLength-square.length; i++){
                                    let newSquare = document.createElement('div')
                                    document.body.appendChild(newSquare)
                                    newSquare.className='square'
                                    newSquare.style.top=lastSquare.offsetTop+'px'
                                    newSquare.style.left=lastSquare.offsetLeft+'px'
                                    for(let j=square.length-1; j<square.length+i;j++){
                                        move[action[j]()](newSquare)}
                                    }
            //action.length+=n
            if(action.length-realActionLength<n){action.length+=n-(action.length-realActionLength)}
            square = document.querySelectorAll('.square')
            foodDefault()
            score+=1
            point.textContent=`Score: ${score}`
            if(score>=winCondition){win()}
            }
    Object.values(document.querySelectorAll('.square:not(.main)')).forEach(x=>{
            if(x.offsetTop===main.offsetTop&&x.offsetLeft===main.offsetLeft){lose()}
            })
    }
function keydown(e){
    if(e.key==='ArrowUp'){
        if(action[0]&&action[0]()==='up'){return}
        if(main.offsetTop<=canvasTop){lose();return}
        add(action,move.up)
        action.forEach((x,i)=>{if(x){x(square[i])}})
        check()
        }
    if(e.key==='ArrowDown'){
        if(action[0]&&action[0]()==='down'){return}
        if(main.offsetTop>=canvasTop+canvasHeight-20){lose();return}
        add(action,move.down)
        action.forEach((x,i)=>{if(x){x(square[i])}})
        check()
        }
    if(e.key==='ArrowLeft'){
        if(action[0]&&action[0]()==='left'){return}
        if(main.offsetLeft<=canvasLeft){lose();return}
        add(action,move.left)
        action.forEach((x,i)=>{if(x){x(square[i])}})
        check()
        }
    if(e.key==='ArrowRight'){
        if(action[0]&&action[0]()==='right'){return}
        if(main.offsetLeft>=canvasLeft+canvasWidth-20){lose();return}
        add(action,move.right)
        action.forEach((x,i)=>{if(x){x(square[i])}})
        check()
        }
    }
function interval(){
    if(action[0]){
        switch(action[0]()){
            case 'down':{if(main.offsetTop<=canvasTop){lose();return};break}
            case 'up':{if(main.offsetTop>=canvasTop+canvasHeight-20){lose();return};break}
            case 'right':{if(main.offsetLeft<=canvasLeft){lose();return};break}
            case 'left':{if(main.offsetLeft>=canvasLeft+canvasWidth-20){lose();return};break}
            default: console.log('err')
        }
        add(action,action[0])
        action.forEach((x,i)=>{if(x){x(square[i])}})
        check()
    }
    now+=speed
    let timeLeft=timeCondition-now
    if(timeLeft<=0){if(score<=winCondition){lose()}else{setDefault()}}
    let second=Math.floor((timeLeft/1000)%60)
    let minute=Math.floor((timeLeft/1000)/60)
    time.textContent=`Time: ${minute}:${second}`
    }
canvas.style.height=canvasHeight+'px'
canvas.style.width=canvasWidth+'px'
canvas.style.top=canvasTop+'px'
canvas.style.left=canvasLeft+'px'
point.style.top=(canvasTop+50)+'px'
point.style.left=(canvasLeft+canvasWidth+100)+'px'
point.style.fontSize=canvasHeight/10+'px'
time.style.top=(point.offsetTop+100)+'px'
time.style.left=(canvasLeft+canvasWidth+100)+'px'
time.style.fontSize=canvasHeight/10+'px'
description.style.top=(time.offsetTop+100)+'px'
description.style.left=(canvasLeft+canvasWidth+100)+'px'
description.style.height=(canvasTop+canvasHeight-description.offsetTop)+'px'
description.style.width=(window.innerWidth-description.offsetLeft-200)+'px'
description.style.fontSize=canvasHeight/15+'px'
description.textContent=`Try to get ${winCondition} scores within ${timeCondition/1000} seconds. Have fun!`
button.style.top=(canvasTop+canvasHeight+100)+'px'
button.style.width=(canvasLeft+canvasWidth)/5+'px'
button.style.left=(canvasLeft+canvasWidth/2-button.offsetWidth/2)+'px'
adjust.style.top=(canvasTop+canvasHeight+200)+'px'
adjust.style.width=(canvasLeft+canvasWidth)/2+'px'
adjust.style.left=(canvasLeft+canvasWidth/2-adjust.offsetWidth/2)+'px'
setDefault()
window.addEventListener('resize',function(){
    description.style.width=(window.innerWidth-description.offsetLeft-200)+'px'
    },false)
control.addEventListener('click',function(){
    if(isRunning){
        isRunning=!isRunning
        document.body.removeEventListener('keydown',keydown,false)
        clearInterval(index)
        control.textContent='continue'
    }else{
        isRunning=!isRunning
        document.body.addEventListener('keydown',keydown,false)
        index=setInterval(interval,speed)
        control.textContent='pause'
    }
    },false)
reset.addEventListener('click',setDefault,false)
growthRate.addEventListener('change',function(e){
    switch(e.target.value){
        case 'easy':{n=1;break}
        case 'normal':{n=2;break}
        case 'fast':{n=4;break}
        case 'super-fast':{n=8;break}
        case 'nightmare':{n=16;break}
        default:{console.log('err');break}
    }
    setDefault()
    },false)
swiftness.addEventListener('change',function(e){
    switch(e.target.value){
        case 'crawl':{speed=1000;break}
        case 'walk':{speed=500;break}
        case 'run':{speed=250;break}
        case 'fly':{speed=125;break}
        case 'speedster':{speed=75;break}
        default:{console.log('err');break}
    }
    setDefault()
    },false)