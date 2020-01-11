let menu=document.querySelector('.menu')
let start=document.querySelector('.start')
let sound=document.querySelectorAll('.sound')
let highScore=document.querySelector('.highscore')
let modalSound=document.querySelector('.modal-sound')
let volume=document.querySelector('.volume')
let volumeDisplay=document.querySelector('.volume-display')
let modalHighScore=document.querySelector('.modal-highscore')
let gameMode=document.querySelector('.game-mode')
let modeNormal=document.querySelector('.mode-normal')
let modeZombie=document.querySelector('.mode-zombie')
let modeWar=document.querySelector('.mode-war')
let modeSuper=document.querySelector('.mode-super')
let modeAngry=document.querySelector('.mode-angry')
let gameStyle=document.querySelector('.game-style')
let styleSurvivor=document.querySelector('.style-survivor')
let styleTimer=document.querySelector('.style-timer')
let labelGrowthRate=document.querySelector('.label-growth-rate')
let labelSwiftness=document.querySelector('.label-swiftness')
let labelEnemyNumber=document.querySelector('.label-enemy-number')
let labelEnemySpeed=document.querySelector('.label-enemy-speed')
let labelMap=document.querySelector('.label-map')
let labelUnbound=document.querySelector('.label-unbound')
let growthRate=document.querySelector('.growth-rate')
let swiftness=document.querySelector('.swiftness')
let swiftCrawl=document.getElementById('crawl')
let swiftWalk=document.getElementById('walk')
let swiftRun=document.getElementById('run')
let swiftFly=document.getElementById('fly')
let swiftSpeedster=document.getElementById('speedster')
let enemyNumber=document.querySelector('.enemy-number')
let enemySpeed=document.querySelector('.enemy-speed')
let map=document.querySelector('.map')
let mapNone=document.getElementById('none')
let mapBrickStorm=document.getElementById('brickStorm')
let unbound=document.querySelector('.unbound')
let modalMenu=document.querySelector('.modal-menu')
let game=document.querySelector('.game')
let canvas=document.querySelector('.canvas')
let square = document.querySelectorAll('.square')
let main=square[0]
let eyeCover=document.querySelector('.eye-cover')
let eye=document.querySelector('.eye')
let eyeBall=document.querySelector('.eye-ball')
let eyeSparkle=document.querySelector('.eye-sparkle')
let emo=document.querySelector('.emo')
let food=document.querySelector('.food')
let display=document.querySelector('.display')
let point=document.querySelector('.point')
let time=document.querySelector('.time')
let feature=document.querySelector('.feature')
let description=document.querySelector('.description')
let pause=document.querySelector('.pause')
let reset=document.querySelector('.reset')
let exit=document.querySelector('.exit')
let score=0,now=0,isRunning=false,stop=true,runIndex,blinkIndex,mode,style,superStrong=false,laserEye=false,bombEater=false,mindControl=false,brickStormHorizontal=true,waveCount=0,waveChange=false
let winCondition=20, timeCondition=60000, n=1, speed=1000, blinkDelay=3000, bombDelay=1000, waveThreshold=5, foodNear=false
let zombieDuration=0,bomb=0,freeze=false
let zombieCondition=15000,enemyCounter=4,freezeDuration=2000,enemyRespawnTime=5000
let foeRunIndex,foeBlinkIndex,explosionIndex,foeBlockUp=false,foeBlockDown=false,foeBlockLeft=false,foeBlockRight=false,foeStop=false
let foeSuperStrong=false,foeLaserEye=false,foeBombEater=false,foeMindControl=false,foodType,brickStorm=false
let foeSpeed=300,foeBlinkDelay=2000,explosionDelay=2000,superDuration=5000,foeRespawnTime=5000
let brickWallIndex,brickWaveIndex,press=false,speedChange=false
let brickGapLength=5,brickWallSpeed=200,brickWaveSpeed=5000,pressDelay=300,scoreThreshold=5
let canvasHeight=Math.floor(window.innerHeight/20)*20, canvasWidth=Math.floor((window.innerWidth/20)*5/6)*20, canvasTop=0, canvasLeft=0
let action=new Array(square.length+n+5)
let position=new Array(square.length+n+5)
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
let foe=document.querySelectorAll('.foe')
let foeMain=foe[0]
let foeEyeCover=document.querySelector('.foe-eye-cover')
let foeEye=document.querySelector('.foe-eye')
let foeEyeBall=document.querySelector('.foe-eye-ball')
let foeEyeSparkle=document.querySelector('.foe-eye-sparkle')
let foeEmo=document.querySelector('.foe-emo')
let foeAction=new Array(foe.length)
let foePosition=new Array(foe.length)
let foeInch={
    up(){
        foeRule()
        if(!foeBlockUp){foeStep(move.up)}
        },
    down(){
        foeRule()
        if(!foeBlockDown){foeStep(move.down)}
    },
    left(){
        foeRule()
        if(!foeBlockLeft){foeStep(move.left)}
    },
    right(){
        foeRule()
        if(!foeBlockRight){foeStep(move.right)}
    }
    }
let foeMove={
    upup(){
        foeInch.up()
        if(foeMindControl){if(!foeBlockUp){step(move.up)}}
        setTimeout(function(){
            foeInch.up()
            if(foeMindControl){if(!foeBlockUp){step(move.up)}}
        },foeSpeed/2)
    },
    upleft(){
        foeInch.up()
        if(foeMindControl){if(!foeBlockUp){step(move.up)}}
        setTimeout(function(){
            foeInch.left()
            if(foeMindControl){if(!foeBlockLeft){step(move.left)}}
        },foeSpeed/2)
    },
    upright(){
        foeInch.up()
        if(foeMindControl){if(!foeBlockUp){step(move.up)}}
        setTimeout(function(){
            foeInch.right()
            if(foeMindControl){if(!foeBlockRight){step(move.right)}}
        },foeSpeed/2)
    },
    downdown(){
        foeInch.down()
        if(foeMindControl){if(!foeBlockDown){step(move.down)}}
        setTimeout(function(){
            foeInch.down()
            if(foeMindControl){if(!foeBlockDown){step(move.down)}}    
        },foeSpeed/2)
    },
    downleft(){
        foeInch.down()
        if(foeMindControl){if(!foeBlockDown){step(move.down)}}
        setTimeout(function(){
            foeInch.left()
            if(foeMindControl){if(!foeBlockLeft){step(move.left)}}
        },foeSpeed/2)
    },
    downright(){
        foeInch.down()
        if(foeMindControl){if(!foeBlockDown){step(move.down)}}
        setTimeout(function(){
            foeInch.right()
            if(foeMindControl){if(!foeBlockRight){step(move.right)}}
        },foeSpeed/2)
    },
    leftleft(){
        foeInch.left()
        if(foeMindControl){if(!foeBlockLeft){step(move.left)}}
        setTimeout(function(){
            foeInch.left()
            if(foeMindControl){if(!foeBlockLeft){step(move.left)}}
        },foeSpeed/2)
    },
    leftup(){
        foeInch.left()
        if(foeMindControl){if(!foeBlockLeft){step(move.left)}}
        setTimeout(function(){
            foeInch.up()
            if(foeMindControl){if(!foeBlockUp){step(move.up)}}    
        },foeSpeed/2)
    },
    leftdown(){
        foeInch.left()
        if(foeMindControl){if(!foeBlockLeft){step(move.left)}}
        setTimeout(function(){
            foeInch.down()
            if(foeMindControl){if(!foeBlockDown){step(move.down)}}    
        },foeSpeed/2)
    },
    rightright(){
        foeInch.right()
        if(foeMindControl){if(!foeBlockRight){step(move.right)}}
        setTimeout(function(){
            foeInch.right()
            if(foeMindControl){if(!foeBlockRight){step(move.right)}}
        },foeSpeed/2)
    },
    rightup(){
        foeInch.right()
        if(foeMindControl){if(!foeBlockRight){step(move.right)}}
        setTimeout(function(){
            foeInch.up()
            if(foeMindControl){if(!foeBlockUp){step(move.up)}}    
        },foeSpeed/2)
    },
    rightdown(){
        foeInch.right()
        if(foeMindControl){if(!foeBlockRight){step(move.right)}}
        setTimeout(function(){
            foeInch.down()
            if(foeMindControl){if(!foeBlockDown){step(move.down)}}    
        },foeSpeed/2)
    }
    }
function add(array,element){
    array.unshift(element)
    array.splice(array.length-1,1)
    }
function draw(){
    square=document.querySelectorAll('.square')
    let lastSquare=square[square.length-1]
    Object.values(square).forEach(x=>{if(x){x.style.borderRadius=0}})
    if(action[0]){switch(action[0]()){
        case 'down':{main.style.borderRadius='50% 50% 0 0';break}
        case 'up':{main.style.borderRadius='0 0 50% 50%';break}
        case 'right':{main.style.borderRadius='50% 0 0 50%';break}
        case 'left':{main.style.borderRadius='0 50% 50% 0';break}
        default: console.log('draw err')
        }
    }
    if(action[square.length-2]){switch(action[square.length-2]()){
        case 'down':{lastSquare.style.borderRadius='0 0 50% 50%';break}
        case 'up':{lastSquare.style.borderRadius='50% 50% 0 0';break}
        case 'right':{lastSquare.style.borderRadius='0 50% 50% 0';break}
        case 'left':{lastSquare.style.borderRadius='50% 0 0 50%';break}
        default: console.log('draw err')
        }
    }
    for(let i=1; i<square.length-1; i++){
        if(action[i]){
                if(action[i]()==='down'){
                    if(action[i-1]()==='right'){square[i].style.borderRadius='0 50% 0 0'}
                    if(action[i-1]()==='left'){square[i].style.borderRadius='50% 0 0 0'}
                }
                if(action[i]()==='up'){
                    if(action[i-1]()==='right'){square[i].style.borderRadius='0 0 50% 0'}
                    if(action[i-1]()==='left'){square[i].style.borderRadius='0 0 0 50%'}
                }
                if(action[i]()==='right'){
                    if(action[i-1]()==='down'){square[i].style.borderRadius='0 0 0 50%'}
                    if(action[i-1]()==='up'){square[i].style.borderRadius='50% 0 0 0'}
                }
                if(action[i]()==='left'){
                    if(action[i-1]()==='down'){square[i].style.borderRadius='0 0 50% 0'}
                    if(action[i-1]()==='up'){square[i].style.borderRadius='0 50% 0 0'}
                }
            }
    }
    if(Math.abs(main.offsetLeft-food.offsetLeft)<=20*5&&Math.abs(main.offsetTop-food.offsetTop)<=20*5){foodNear=true}
    else{foodNear=false}
    emo.style.display='none'
    eyeBall.style.display='block'
    if(foodNear){
                    eyeSparkle.style.display='block'
                    eyeBall.style.width='10px'
                    eyeBall.style.height='10px'
                    if(main.offsetTop<food.offsetTop){
                                if(main.offsetLeft<food.offsetLeft){
                                    eyeBall.style.top='4px'
                                    eyeBall.style.left='2px'
                                    eyeSparkle.style.top='4px'
                                    eyeSparkle.style.left='2px'
                                }
                                else if(main.offsetLeft>food.offsetLeft){
                                    eyeBall.style.top='4px'
                                    eyeBall.style.left='-2px'
                                    eyeSparkle.style.top='4px'
                                    eyeSparkle.style.left='-2px'
                                }
                                else{
                                    eyeBall.style.top='5px'
                                    eyeBall.style.left=0
                                    eyeSparkle.style.top='5px'
                                    eyeSparkle.style.left=0
                                }
                            }
                    else if(main.offsetTop>food.offsetTop){
                                if(main.offsetLeft<food.offsetLeft){
                                    eyeBall.style.top='1px'
                                    eyeBall.style.left='2px'
                                    eyeSparkle.style.top='1px'
                                    eyeSparkle.style.left='2px'
                                }
                                else if(main.offsetLeft>food.offsetLeft){
                                    eyeBall.style.top='1px'
                                    eyeBall.style.left='-2px'
                                    eyeSparkle.style.top='1px'
                                    eyeSparkle.style.left='-2px'
                                }
                                else{
                                    eyeBall.style.top=0
                                    eyeBall.style.left=0
                                    eyeSparkle.style.top=0
                                    eyeSparkle.style.left=0
                                }
                            }
                    else{
                                if(main.offsetLeft<food.offsetLeft){
                                    eyeBall.style.top='2.5px'
                                    eyeBall.style.left='2.5px'
                                    eyeSparkle.style.top='2.5px'
                                    eyeSparkle.style.left='2.5px'
                                }
                                else if(main.offsetLeft>food.offsetLeft){
                                    eyeBall.style.top='2.5px'
                                    eyeBall.style.left='-2.5px'
                                    eyeSparkle.style.top='2.5px'
                                    eyeSparkle.style.left='-2.5px'
                                }
                                else{
                                    eyeBall.style.top='2.5px'
                                    eyeBall.style.left=0
                                    eyeSparkle.style.top='2.5px'
                                    eyeSparkle.style.left=0
                                    emo.textContent='^'
                                    emo.style.top='1px'
                                    emo.style.left='3px'
                                    emo.style.display='block'
                                    eyeBall.style.display='none'
                                }
                        }
                    
                }
    else{
        eyeSparkle.style.display='none'
        eyeBall.style.width='5px'
        eyeBall.style.height='5px'
        if(main.offsetTop<food.offsetTop){
                    if(main.offsetLeft<food.offsetLeft){
                        eyeBall.style.top='8px'
                        eyeBall.style.left='4px'
                    }
                    else if(main.offsetLeft>food.offsetLeft){
                        eyeBall.style.top='8px'
                        eyeBall.style.left='-4px'
                    }
                    else{
                        eyeBall.style.top='10px'
                        eyeBall.style.left=0
                    }
                }
        else if(main.offsetTop>food.offsetTop){
                    if(main.offsetLeft<food.offsetLeft){
                        eyeBall.style.top='2px'
                        eyeBall.style.left='4px'
                    }
                    else if(main.offsetLeft>food.offsetLeft){
                        eyeBall.style.top='2px'
                        eyeBall.style.left='-4px'
                    }
                    else{
                        eyeBall.style.top=0
                        eyeBall.style.left=0
                    }
                }
        else{
                    if(main.offsetLeft<food.offsetLeft){
                        eyeBall.style.top='5px'
                        eyeBall.style.left='5px'
                    }
                    else if(main.offsetLeft>food.offsetLeft){
                        eyeBall.style.top='5px'
                        eyeBall.style.left='-5px'
                    }
                    else{
                        eyeBall.style.top='5px'
                        eyeBall.style.left=0
                    }
                }
        }
    if(mode==='super'){
        if(!foeLaserEye){
            let lasers=document.querySelectorAll('.laser')
            if(lasers){Object.values(lasers).forEach(x=>x.remove())}
        }    
        if(laserEye){
            let bricks=document.querySelectorAll('.brick')
            let brickBlock=null    
            if(action[0]===move.up){
                let laser=document.createElement('div')
                canvas.appendChild(laser)
                laser.className='laser'
                laser.style.top=0
                laser.style.left=main.offsetLeft+'px'
                laser.style.height=(main.offsetTop-canvasTop+20)+'px'
                laser.style.width=main.offsetWidth+'px'
                if(bricks){Object.values(bricks).forEach(x=>{if(x.offsetTop<main.offsetTop&&x.offsetLeft===main.offsetLeft){brickBlock=x}})}
                if(brickBlock){
                    Object.values(bricks).forEach(x=>{if(x.offsetTop<main.offsetTop&&x.offsetLeft===main.offsetLeft&&x.offsetTop>brickBlock.offsetTop){brickBlock=x}})
                    laser.style.top=brickBlock.offsetTop+'px'
                    laser.style.left=brickBlock.offsetLeft+'px'
                    laser.style.height=(main.offsetTop-brickBlock.offsetTop+20)+'px'
                    laser.style.width=main.offsetWidth+'px'
                    }        
            }
            if(action[0]===move.down){
                let laser=document.createElement('div')
                canvas.appendChild(laser)
                laser.className='laser'
                laser.style.top=main.offsetTop+'px'
                laser.style.left=main.offsetLeft+'px'
                laser.style.height=(canvasTop+canvasHeight-main.offsetTop)+'px'
                laser.style.width=main.offsetWidth+'px'
                if(bricks){Object.values(bricks).forEach(x=>{if(x.offsetTop>main.offsetTop&&x.offsetLeft===main.offsetLeft){brickBlock=x}})}
                if(brickBlock){
                    Object.values(bricks).forEach(x=>{if(x.offsetTop>main.offsetTop&&x.offsetLeft===main.offsetLeft&&x.offsetTop<brickBlock.offsetTop){brickBlock=x}})
                    laser.style.top=main.offsetTop+'px'
                    laser.style.left=main.offsetLeft+'px'
                    laser.style.height=(brickBlock.offsetTop-main.offsetTop)+'px'
                    laser.style.width=main.offsetWidth+'px'
                    }
            }
            if(action[0]===move.left){
                let laser=document.createElement('div')
                canvas.appendChild(laser)
                laser.className='laser'
                laser.style.top=main.offsetTop+'px'
                laser.style.left=0
                laser.style.height=main.offsetHeight+'px'
                laser.style.width=(main.offsetLeft-canvasLeft+20)+'px'
                if(bricks){Object.values(bricks).forEach(x=>{if(x.offsetTop===main.offsetTop&&x.offsetLeft<main.offsetLeft){brickBlock=x}})}
                if(brickBlock){
                    Object.values(bricks).forEach(x=>{if(x.offsetTop===main.offsetTop&&x.offsetLeft<main.offsetLeft&&x.offsetLeft>brickBlock.offsetLeft){brickBlock=x}})
                    laser.style.top=brickBlock.offsetTop+'px'
                    laser.style.left=brickBlock.offsetLeft+'px'
                    laser.style.height=main.offsetHeight+'px'
                    laser.style.width=(main.offsetLeft-brickBlock.offsetLeft+20)+'px'
                    }    
            }
            if(action[0]===move.right){
                let laser=document.createElement('div')
                canvas.appendChild(laser)
                laser.className='laser'
                laser.style.top=main.offsetTop+'px'
                laser.style.left=main.offsetLeft+'px'
                laser.style.height=main.offsetHeight+'px'
                laser.style.width=(canvasLeft+canvasWidth-main.offsetLeft)+'px'
                if(bricks){Object.values(bricks).forEach(x=>{if(x.offsetTop===main.offsetTop&&x.offsetLeft>main.offsetLeft){brickBlock=x}})}
                if(brickBlock){
                    Object.values(bricks).forEach(x=>{if(x.offsetTop===main.offsetTop&&x.offsetLeft>main.offsetLeft&&x.offsetLeft<brickBlock.offsetLeft){brickBlock=x}})
                    laser.style.top=main.offsetTop+'px'
                    laser.style.left=main.offsetLeft+'px'
                    laser.style.height=main.offsetHeight+'px'
                    laser.style.width=(brickBlock.offsetLeft-main.offsetLeft)+'px'
                    }    
            }
        }
        if(foeMindControl){
            emo.textContent='@'
            emo.style.top='-1.5px'
            emo.style.left='-0.5px'
            emo.style.display='block'
            eyeBall.style.display='none'
        }
        if(foeSuperStrong||foeLaserEye||foeBombEater){
            eyeSparkle.style.display='none'
            eyeBall.style.width='5px'
            eyeBall.style.height='5px'
            if(action[0]===move.up){
                eyeBall.style.top=0
                eyeBall.style.left=0
            }
            if(action[0]===move.down){
                eyeBall.style.top='10px'
                eyeBall.style.left=0
            }
            if(action[0]===move.left){
                eyeBall.style.top='5px'
                eyeBall.style.left='-5px'
            }
            if(action[0]===move.right){
                eyeBall.style.top='5px'
                eyeBall.style.left='5px'
            }
        }
        if(superStrong||laserEye||bombEater||mindControl){
            eyeSparkle.style.display='block'
            eyeBall.style.width='10px'
            eyeBall.style.height='10px'
            if(action[0]===move.up){
                eyeBall.style.top=0
                eyeBall.style.left=0
                eyeSparkle.style.top=0
                eyeSparkle.style.left=0
            }
            if(action[0]===move.down){
                eyeBall.style.top='5px'
                eyeBall.style.left=0
                eyeSparkle.style.top='5px'
                eyeSparkle.style.left=0
            }
            if(action[0]===move.left){
                eyeBall.style.top='2.5px'
                eyeBall.style.left='-2.5px'
                eyeSparkle.style.top='2.5px'
                eyeSparkle.style.left='-2.5px'
            }
            if(action[0]===move.right){
                eyeBall.style.top='2.5px'
                eyeBall.style.left='2.5px'
                eyeSparkle.style.top='2.5px'
                eyeSparkle.style.left='2.5px'
            }
        }        
        }
    if(mode==='angry'){
        eyeSparkle.style.display='none'
        eyeBall.style.width='5px'
        eyeBall.style.height='5px'
        eyeBall.style.top='5px'
        eyeBall.style.left='5px'
    }
    }
function redraw(){
    square=document.querySelectorAll('.square')
    Object.values(square).forEach((x,i)=>{
        if(position[i]){
            x.style.top=position[i].top+'px'
            x.style.left=position[i].left+'px'
        }
    })
    draw()
    }
function scoreUp(){
    score+=1
    point.textContent=`Score: ${score}`
    point.style.animation='Score 1s'
    setTimeout(function(){point.style.animation=''},1000)
    }
function check(){
    if(main.offsetTop===food.offsetTop&&main.offsetLeft===food.offsetLeft)
        {
            if(mode==='war'){
                if(bomb<3){n=1;
                    bomb+=1
                    feature.textContent=`Bomb-Count: ${bomb}`
                    feature.style.animation='Score 1s'
                    setTimeout(function(){feature.style.animation=''},1000)                
                }
                else{n=0}
                freeze=true
                let freezeTime=0
                let freezeIndex=setInterval(function(){
                    if(isRunning){freezeTime+=100}
                    if(freezeTime>=freezeDuration){
                        freeze=false
                        clearInterval(freezeIndex)}
                },100)
                freezeSound.currentTime=0
                freezeSound.play()
                food.style.animation='Freezeout 0.5s'
                setTimeout(function(){
                    food.style.animation=''
                    foodDefault()
                },500)
            }else if(mode==='super'){
                if(!foeStop){
                    foeSadSound.currentTime=0
                    foeSadSound.play()    
                    }
                let superTime=0
                food.style.left='-999px'
                if(foodType==='strong'){
                    superStrong=true
                    feature.textContent='Super-Power: SuperStrong'
                    feature.style.animation=`Fadeout 0.5s 3, Feature ${superDuration/1000}s`
                    eyeBall.style.backgroundColor='green'
                    Object.values(square).forEach(x=>{x.style.animation='Superstrong 1s';x.style.transform='scale(1.5)';x.style.backgroundColor='green'})
                    superStrongSound.play()
                    let superStrongInterval=setInterval(function(){
                        if(isRunning){superTime+=100}
                        if(superTime>=superDuration||stop){
                            foodDefault()
                            superStrong=false
                            feature.textContent='Super-Power:'
                            feature.style.animation=''    
                            eyeBall.style.backgroundColor='black'
                            Object.values(square).forEach(x=>{x.style.animation='Normalize 1s';x.style.transform='scale(1)';x.style.backgroundColor='lightcoral'})
                            superStrongSound.pause()
                            superStrongSound.currentTime=0
                            clearInterval(superStrongInterval)}
                    },100)}
                if(foodType==='laser'){
                    laserEye=true
                    feature.textContent='Super-Power: LaserEye'
                    feature.style.animation=`Fadeout 0.5s 3, Feature ${superDuration/1000}s`
                    eyeBall.style.backgroundColor='red'
                    laserSound.play()
                    let laserInterval=setInterval(function(){
                        if(isRunning){superTime+=100}
                        if(superTime>=superDuration||stop){
                            foodDefault()
                            laserEye=false
                            feature.textContent='Super-Power:'
                            feature.style.animation=''
                            eyeBall.style.backgroundColor='black'
                            laserSound.pause()
                            laserSound.currentTime=0    
                            clearInterval(laserInterval)}
                    },100)}
                if(foodType==='bomb'){
                    bombEater=true
                    feature.textContent='Super-Power: BombEater'
                    feature.style.animation=`Fadeout 0.5s 3, Feature ${superDuration/1000}s`
                    eyeBall.style.backgroundColor='purple'
                    Object.values(square).forEach(x=>x.style.backgroundColor='red')
                    let bombInterval=setInterval(function(){
                        if(isRunning){superTime+=100}
                        if(superTime>=superDuration||stop){
                            foodDefault()
                            bombEater=false
                            feature.textContent='Super-Power:'
                            feature.style.animation=''
                            eyeBall.style.backgroundColor='black'
                            Object.values(square).forEach(x=>x.style.backgroundColor='lightcoral')    
                            clearInterval(bombInterval)}
                    },100)}
                if(foodType==='mind'){
                    setTimeout(function(){
                        foeDeadMindSound.currentTime=0
                        foeDeadMindSound.play()
                    },1000)
                    mindControl=true
                    feature.textContent='Super-Power: MindControl'
                    feature.style.animation=`Fadeout 0.5s 3, Feature ${superDuration/1000}s`
                    eyeBall.style.backgroundColor='purple'
                    mindControlSound.play()
                    let mindInterval=setInterval(function(){
                        if(isRunning){superTime+=100}
                        if(superTime>=superDuration||stop){
                            foodDefault()
                            mindControl=false
                            feature.textContent='Super-Power:'
                            feature.style.animation=''
                            eyeBall.style.backgroundColor='black'
                            mindControlSound.pause()
                            mindControlSound.currentTime=0                            
                            clearInterval(mindInterval)}
                    },100)}
            }else{
                scoreUp()
                foodDefault()
            }
            pointSound.currentTime=0
            pointSound.play()
            let realActionLength=0                                  
            let realPositionLength=0
            action.forEach(x=>{if(x){realActionLength+=1}})
            position.forEach(x=>{if(x){realPositionLength+=1}})
            for(let i=0; i<Math.min(realPositionLength-square.length,n); i++){
                let newSquare = document.createElement('div')
                canvas.appendChild(newSquare)
                if(mode==='war'){newSquare.className='square bombcarrier'}
                else{newSquare.className='square'}
                if(mode==='zombie'){newSquare.style.backgroundColor='purple'}
                else if(mode==='war'){newSquare.style.backgroundColor='black'}
                else if(mode==='super'){newSquare.style.backgroundColor='lightcoral'}
                else{newSquare.style.backgroundColor='lightcoral'}
                }
            redraw()
            if(action.length-realActionLength<n){action.length+=n-(action.length-realActionLength)}
            if(position.length-realPositionLength<n){position.length+=n-(position.length-realPositionLength)}
            if(style==='timer'&&score>=winCondition){win()}
            if(mode==='zombie'){zombieDuration=0}
            eyeBall.style.top='2.5px'
            eyeBall.style.left=0
            eyeSparkle.style.top='2.5px'
            eyeSparkle.style.left=0
            emo.textContent='^'
            emo.style.top='1px'
            emo.style.left='3px'
            emo.style.display='block'
            eyeBall.style.display='none'
        }
    let lost=false
    let bricks=document.querySelectorAll('.brick')
    if(bricks){
        Object.values(bricks).forEach(x=>{
            if(x.offsetTop===main.offsetTop&&x.offsetLeft===main.offsetLeft){
                if(unbound.checked){stepBack()}
                else{lost=true}
            }
            })    
    }
    Object.values(document.querySelectorAll('.square:not(.main)')).forEach(x=>{
        if(x&&mode!=='super'){
            if(x.offsetTop===main.offsetTop&&x.offsetLeft===main.offsetLeft){lost=true}
            }
        })
    if(lost){
        hitSound.play()
        lose()
        }
    if(mode==='war'){warCheck()}
    if(mode==='super'){superCheck()}
    }
function normal(){
    let lost=false
    Object.values(square).forEach(x=>{  if(x.offsetTop<canvasTop){lost=true}
                                        if(x.offsetTop>canvasTop+canvasHeight-20){lost=true}
                                        if(x.offsetLeft<canvasLeft){lost=true}
                                        if(x.offsetLeft>canvasLeft+canvasWidth-20){lost=true}
                                    })
    if(lost){
        hitSound.play()
        action.forEach((x,i)=>{action[i]=action[i+1]})
        lose()
        }
    }
function unblock(){
    Object.values(canvas.children).forEach(x=>{if(x!==food&&x.className!=='brick'){
                                                    if(x.offsetTop<canvasTop){x.style.top=(canvasTop+canvasHeight-20)+'px'}
                                                    if(x.offsetTop>canvasTop+canvasHeight-20){x.style.top=canvasTop+'px'}
                                                    if(x.offsetLeft<canvasLeft){x.style.left=(canvasLeft+canvasWidth-20)+'px'}
                                                    if(x.offsetLeft>canvasLeft+canvasWidth-20){x.style.left=canvasLeft+'px'}
                                                }
                                    })
    }
function step(stepMove){
    if(!stop){
        add(action,stepMove)
        action.forEach((x,i)=>{if(x){x(square[i])}})
        draw()
        if(unbound.checked){unblock()}
        else{normal()}
        add(position,{top:main.offsetTop,left:main.offsetLeft})
        check()
    }
    }
function stepBack(){
    action.forEach((x,i)=>{action[i]=action[i+1]})
    position.forEach((x,i)=>{position[i]=position[i+1]})
    redraw()
    }
function keydownUp(){
    if(unbound.checked){
        let abort=false
        let bricks=document.querySelectorAll('.brick')
        if(mode==='zombie'){
            Object.values(bricks).forEach(x=>{if(x.offsetTop===(main.offsetTop+20)&&x.offsetLeft===main.offsetLeft){abort=true}})
        }else{
            Object.values(bricks).forEach(x=>{if(x.offsetTop===(main.offsetTop-20)&&x.offsetLeft===main.offsetLeft){abort=true}})
        }
        if(abort){return}
    }
    if(mode==='zombie'){if(action[0]&&action[0]()==='down'){return}
                        step(move.down)}
    else{if(action[0]&&action[0]()==='up'){return}
         step(move.up)
         if(mindControl){foeStep(move.up)}}
    }
function keydownDown(){
    if(unbound.checked){
        let abort=false
        let bricks=document.querySelectorAll('.brick')
        if(mode==='zombie'){
            Object.values(bricks).forEach(x=>{if(x.offsetTop===(main.offsetTop-20)&&x.offsetLeft===main.offsetLeft){abort=true}})
        }else{
            Object.values(bricks).forEach(x=>{if(x.offsetTop===(main.offsetTop+20)&&x.offsetLeft===main.offsetLeft){abort=true}})
        }
        if(abort){return}
    }
    if(mode==='zombie'){if(action[0]&&action[0]()==='up'){return}
                        step(move.up)}
    else{if(action[0]&&action[0]()==='down'){return}
         step(move.down)
         if(mindControl){foeStep(move.down)}}
    }
function keydownLeft(){
    if(unbound.checked){
        let abort=false
        let bricks=document.querySelectorAll('.brick')
        if(mode==='zombie'){
            Object.values(bricks).forEach(x=>{if(x.offsetTop===main.offsetTop&&x.offsetLeft===(main.offsetLeft+20)){abort=true}})
        }else{
            Object.values(bricks).forEach(x=>{if(x.offsetTop===main.offsetTop&&x.offsetLeft===(main.offsetLeft-20)){abort=true}})
        }
        if(abort){return}
    }
    if(mode==='zombie'){if(action[0]&&action[0]()==='right'){return}
                        step(move.right)}
    else{if(action[0]&&action[0]()==='left'){return}
         step(move.left)
         if(mindControl){foeStep(move.left)}}
    }
function keydownRight(){
    if(unbound.checked){
        let abort=false
        let bricks=document.querySelectorAll('.brick')
        if(mode==='zombie'){
            Object.values(bricks).forEach(x=>{if(x.offsetTop===main.offsetTop&&x.offsetLeft===(main.offsetLeft-20)){abort=true}})
        }else{
            Object.values(bricks).forEach(x=>{if(x.offsetTop===main.offsetTop&&x.offsetLeft===(main.offsetLeft+20)){abort=true}})
        }
        if(abort){return}
    }
    if(mode==='zombie'){if(action[0]&&action[0]()==='left'){return}
                        step(move.left)}
    else{if(action[0]&&action[0]()==='right'){return}
         step(move.right)
         if(mindControl){foeStep(move.right)}}
    }
function warKeydown(){
    if(bomb){
        bomb-=1
        feature.textContent=`Bomb-Count: ${bomb}`
        square[square.length-1].remove()
        redraw()
        let bombExplode=document.createElement('div')
        canvas.appendChild(bombExplode)
        bombExplode.className='bomb'
        bombExplode.style.top=main.offsetTop+'px'
        bombExplode.style.left=main.offsetLeft+'px'
        let bombExplodeTime=0
        let bombExplodeIndex=setInterval(function(){
            if(isRunning){bombExplodeTime+=100}
            if(bombExplodeTime>=bombDelay){
                explosionSound.currentTime=0
                explosionSound.play()
                bombExplode.style.backgroundImage="url('./texture/explosion.png')"
                bombExplode.style.animation='Scaleout 1s'
                setTimeout(function(){bombExplode.remove()},1000)
                setTimeout(function(){
                    let lost=false
                    Object.values(canvas.children).forEach(x=>{
                        if(x.offsetTop>=(bombExplode.offsetTop-bombExplode.offsetHeight*5)
                            &&x.offsetTop<=(bombExplode.offsetTop+bombExplode.offsetHeight*5)
                            &&x.offsetLeft>=(bombExplode.offsetLeft-bombExplode.offsetWidth*5)
                            &&x.offsetLeft<=(bombExplode.offsetLeft+bombExplode.offsetWidth*5))
                            {
                                if(x===main||x.className==='square'){lost=true}
                                if(x.className==='square bombcarrier'){x.remove()}
                                if(x===food){foodDefault()}
                                if(x.className==='enemy'){
                                    scoreUp()
                                    x.style.animation='Fadeout 0.2s'
                                    setTimeout(function(){x.remove()},200)
                                    let enemyTime=0
                                    let enemyInterval=setInterval(function(){
                                                if(isRunning){enemyTime+=100}
                                                if(enemyTime>=enemyRespawnTime||stop){
                                                    let newEnemy=document.createElement('div')
                                                    canvas.appendChild(newEnemy)
                                                    newEnemy.className='enemy'
                                                    enemyDefault(newEnemy)    
                                                    clearInterval(enemyInterval)
                                                }
                                            },100)                       
                                }
                                if(x.className==='brick'){
                                    x.style.animation='Fadeout 0.7s'
                                    setTimeout(function(){x.remove()},700)
                                }
                            }
                        })
                    square=document.querySelectorAll('.square')
                    bomb=square.length-3
                    feature.textContent=`Bomb-Count: ${bomb}`
                    if(lost)(lose())
                    else(redraw())    
                },300)
                clearInterval(bombExplodeIndex)
            }
        },100)
    }
    }
function angryKeydown(e){
    flySound.currentTime=0
    flySound.play()
    press=true
    let pressTime=0
    let pressIndex=setInterval(function(){
        if(isRunning){pressTime+=100}
        if(pressTime>=pressDelay){
            press=false
            clearInterval(pressIndex)
        }
    },100)
    document.body.addEventListener('keydown',function checkPress(e){
        if(e.key===' '){
            clearInterval(pressIndex)
            document.body.removeEventListener('keydown',checkPress,false)
        }
    },false)
    window.addEventListener('touchend',function checkTouch(){
        clearInterval(pressIndex)
        window.removeEventListener('touchend',checkTouch,false)
    },false)
    if(main.offsetTop===canvasTop){return}
    Object.values(square).forEach(x=>x.style.top=(x.offsetTop-20)+'px')
    angryCheck()
    }
function keydown(e){
if(!foeMindControl){
    if(mode==='angry'){
        if(e.key===' '){angryKeydown()}    
        }
    else{
        if(e.key==='ArrowUp'){keydownUp()}
        if(e.key==='ArrowDown'){keydownDown()}
        if(e.key==='ArrowLeft'){keydownLeft()}
        if(e.key==='ArrowRight'){keydownRight()}
        if(e.key===' '){if(mode==='war'){warKeydown()}}    
        }
    }
    }
function run(){
    if(mode==='angry'){
        if(!press){
            Object.values(square).forEach(x=>x.style.top=(x.offsetTop+20)+'px')
            angryCheck()
        }
    }else{
        if(!foeMindControl){
            if(action[0]){
                let abort=false
                let bricks=document.querySelectorAll('.brick')
                if(unbound.checked){
                    if(action[0]===move.up){Object.values(bricks).forEach(x=>{if(x.offsetTop===(main.offsetTop-20)&&x.offsetLeft===main.offsetLeft){abort=true}})}
                    if(action[0]===move.down){Object.values(bricks).forEach(x=>{if(x.offsetTop===(main.offsetTop+20)&&x.offsetLeft===main.offsetLeft){abort=true}})}
                    if(action[0]===move.left){Object.values(bricks).forEach(x=>{if(x.offsetTop===main.offsetTop&&x.offsetLeft===(main.offsetLeft-20)){abort=true}})}
                    if(action[0]===move.right){Object.values(bricks).forEach(x=>{if(x.offsetTop===main.offsetTop&&x.offsetLeft===(main.offsetLeft+20)){abort=true}})}
                }
                if(!abort){
                        step(action[0])
                        if(mindControl){foeStep(action[0])}        
                        }            
                }
        }
    }
    now+=speed
    if(now%1000===0){
        if(style==='survivor'){
            let second=Math.floor((now/1000)%60)
            let minute=Math.floor((now/1000)/60)
            time.textContent=`${minute<10?`0${minute}`:minute}:${second<10?`0${second}`:second}`    
            }
        if(style==='timer'){
            let timeLeft=timeCondition-now
            if(timeLeft<=0){if(score<winCondition){lose()}}
            let second=Math.floor((timeLeft/1000)%60)
            let minute=Math.floor((timeLeft/1000)/60)
            time.textContent=`${minute<10?`0${minute}`:minute}:${second<10?`0${second}`:second}`    
            }
        time.style.animation='Time 1s infinite' 
        }
    if(mode==='zombie'){
        zombieDuration+=speed
        if(zombieDuration>=zombieCondition){lose()}
        let second=Math.floor((zombieDuration/1000)%60)
        let minute=Math.floor((zombieDuration/1000)/60)
        feature.textContent=`Zombie-Time: ${minute<10?`0${minute}`:minute}:${second<10?`0${second}`:second}`
        }
    if(mode==='war'&&!freeze){
        let enemy=document.querySelectorAll('.enemy')
        Object.values(enemy).forEach((x,i)=>{
            if(x){
                if(x.offsetTop>main.offsetTop){
                    move.up(x)
                    if(x.offsetLeft>main.offsetLeft){move.left(x)}
                    if(x.offsetLeft<main.offsetLeft){move.right(x)}
                    warCheck()
                }else if(x.offsetTop<main.offsetTop){
                    move.down(x)
                    if(x.offsetLeft>main.offsetLeft){move.left(x)}
                    if(x.offsetLeft<main.offsetLeft){move.right(x)}
                    warCheck()
                }else{
                    if(x.offsetLeft>main.offsetLeft){move.left(x)}
                    if(x.offsetLeft<main.offsetLeft){move.right(x)}
                    warCheck()
                }
                Object.values(enemy).forEach((y,j)=>{
                    if(y&&i!==j&&x.offsetTop===y.offsetTop&&x.offsetLeft===y.offsetLeft){enemyDefault(x)}
                    })
                if(x.offsetTop===food.offsetTop&&x.offsetLeft===food.offsetLeft){foodDefault()}    
            }
        })
        }
    }
function blink(){
    eyeCover.style.maxHeight=eye.offsetHeight+'px'
    setTimeout(function(){eyeCover.style.maxHeight=0},100)
    }
function warCheck(){
    let lost=false
    let enemy=document.querySelectorAll('.enemy')
    if(enemy){
        Object.values(enemy).forEach(x=>{
            Object.values(square).forEach(y=>{if(x.offsetTop===y.offsetTop&&x.offsetLeft===y.offsetLeft){lost=true}})
        })
        }
    if(lost){
        hitSound.play()
        lose()
        }
    }
function enemyDefault(newEnemy){
    if(newEnemy){
        let bricks=document.querySelectorAll('.brick')
        newEnemy.style.top=canvasTop+Math.floor(Math.random()*(canvasHeight/20))*20+'px'
        newEnemy.style.left=canvasLeft+Math.floor(Math.random()*(canvasWidth/20))*20+'px'
        if(newEnemy.offsetTop===food.offsetTop&&newEnemy.offsetLeft===food.offsetLeft){enemyDefault(newEnemy)}
        if(bricks){Object.values(bricks).forEach(x=>{if(x&&x.offsetTop===newEnemy.offsetTop&&x.offsetLeft===newEnemy.offsetLeft){enemyDefault(newEnemy)}})}
        Object.values(square).forEach(x=>{
            if(x&&newEnemy.offsetTop>=x.offsetTop-Math.floor((canvasHeight/20)/3)*20
                &&newEnemy.offsetTop<=x.offsetTop+Math.floor((canvasHeight/20)/3)*20
                &&newEnemy.offsetLeft>=x.offsetLeft-Math.floor((canvasWidth/20)/3)*20
                &&newEnemy.offsetLeft<=x.offsetLeft+Math.floor((canvasWidth/20)/3)*20){enemyDefault(newEnemy)}
        })
        return
    }
    }
function superCheck(){
    if(superStrong&&!foeStop){
        let foeLost=false
        Object.values(square).forEach(x=>{
            Object.values(foe).forEach(y=>{
                if(x.offsetTop===y.offsetTop&&x.offsetLeft===y.offsetLeft){foeLost=true}
            })
        })
        if(foeLost){
            foeDeadStrongSound.currentTime=0
            foeDeadStrongSound.play()
            foeDead()}
        }
    if(foeSuperStrong){
        let lost=false
        Object.values(square).forEach(x=>{
            Object.values(foe).forEach(y=>{
                if(x.offsetTop===y.offsetTop&&x.offsetLeft===y.offsetLeft){lost=true}
            })
        })
        if(lost){
            hitSound.play()
            lose()
            }
        }
    if(laserEye&&!foeStop){
        let bricks=document.querySelectorAll('.brick')
        let brickBlock=null
        if(action[0]===move.up){
            let foeLost=false
            if(bricks){Object.values(bricks).forEach(x=>{if(x.offsetTop<main.offsetTop&&x.offsetLeft===main.offsetLeft){brickBlock=x}})}
            if(brickBlock){
                Object.values(bricks).forEach(x=>{if(x.offsetTop<main.offsetTop&&x.offsetLeft===main.offsetLeft&&x.offsetTop>brickBlock.offsetTop){brickBlock=x}})
                }
            Object.values(foe).forEach(x=>{
                if(brickBlock){if(x.offsetTop>brickBlock.offsetTop&&x.offsetTop<main.offsetTop&&x.offsetLeft===main.offsetLeft){foeLost=true}}
                else{if(x.offsetTop<main.offsetTop&&x.offsetLeft===main.offsetLeft){foeLost=true}}
                })
            if(foeLost){
                foeDeadLaserSound.currentTime=0
                foeDeadLaserSound.play()
                foeDead()}
            }
        if(action[0]===move.down){
            let foeLost=false
            if(bricks){Object.values(bricks).forEach(x=>{if(x.offsetTop>main.offsetTop&&x.offsetLeft===main.offsetLeft){brickBlock=x}})}
            if(brickBlock){
                Object.values(bricks).forEach(x=>{if(x.offsetTop>main.offsetTop&&x.offsetLeft===main.offsetLeft&&x.offsetTop<brickBlock.offsetTop){brickBlock=x}})
                }
            Object.values(foe).forEach(x=>{
                if(brickBlock){if(x.offsetTop<brickBlock.offsetTop&&x.offsetTop>main.offsetTop&&x.offsetLeft===main.offsetLeft){foeLost=true}}
                else{if(x.offsetTop>main.offsetTop&&x.offsetLeft===main.offsetLeft){foeLost=true}}
                })
            if(foeLost){
                foeDeadLaserSound.currentTime=0
                foeDeadLaserSound.play()
                foeDead()}
            }
        if(action[0]===move.left){
            let foeLost=false
            if(bricks){Object.values(bricks).forEach(x=>{if(x.offsetTop===main.offsetTop&&x.offsetLeft<main.offsetLeft){brickBlock=x}})}
            if(brickBlock){
                Object.values(bricks).forEach(x=>{if(x.offsetTop===main.offsetTop&&x.offsetLeft<main.offsetLeft&&x.offsetLeft>brickBlock.offsetLeft){brickBlock=x}})
            }
            Object.values(foe).forEach(x=>{
                if(brickBlock){if(x.offsetLeft>brickBlock.offsetLeft&&x.offsetTop===main.offsetTop&&x.offsetLeft<main.offsetLeft){foeLost=true}}
                else{if(x.offsetTop===main.offsetTop&&x.offsetLeft<main.offsetLeft){foeLost=true}}
                })
            if(foeLost){
                foeDeadLaserSound.currentTime=0
                foeDeadLaserSound.play()
                foeDead()}
            }
        if(action[0]===move.right){
            let foeLost=false
            if(bricks){Object.values(bricks).forEach(x=>{if(x.offsetTop===main.offsetTop&&x.offsetLeft>main.offsetLeft){brickBlock=x}})}
            if(brickBlock){
                Object.values(bricks).forEach(x=>{if(x.offsetTop===main.offsetTop&&x.offsetLeft>main.offsetLeft&&x.offsetLeft<brickBlock.offsetLeft){brickBlock=x}})
            }
            Object.values(foe).forEach(x=>{
                if(brickBlock){if(x.offsetLeft<brickBlock.offsetLeft&&x.offsetTop===main.offsetTop&&x.offsetLeft>main.offsetLeft){foeLost=true}}
                else{if(x.offsetTop===main.offsetTop&&x.offsetLeft>main.offsetLeft){foeLost=true}}
                })
            if(foeLost){
                foeDeadLaserSound.currentTime=0
                foeDeadLaserSound.play()
                foeDead()}
            }
        }
    if(foeLaserEye){
        let bricks=document.querySelectorAll('.brick')
        let brickBlock=null
        if(foeAction[0]===move.up){
            let lost=false
            if(bricks){Object.values(bricks).forEach(x=>{if(x.offsetTop<foeMain.offsetTop&&x.offsetLeft===foeMain.offsetLeft){brickBlock=x}})}
            if(brickBlock){
                Object.values(bricks).forEach(x=>{if(x.offsetTop<foeMain.offsetTop&&x.offsetLeft===foeMain.offsetLeft&&x.offsetTop>brickBlock.offsetTop){brickBlock=x}})
            }
            Object.values(square).forEach(x=>{
                if(brickBlock){if(x.offsetTop>brickBlock.offsetTop&&x.offsetTop<foeMain.offsetTop&&x.offsetLeft===foeMain.offsetLeft){lost=true}}
                else{if(x.offsetTop<foeMain.offsetTop&&x.offsetLeft===foeMain.offsetLeft){lost=true}}
            })
            if(lost){lose()}
        }
        if(foeAction[0]===move.down){
            let lost=false
            if(bricks){Object.values(bricks).forEach(x=>{if(x.offsetTop>foeMain.offsetTop&&x.offsetLeft===foeMain.offsetLeft){brickBlock=x}})}
            if(brickBlock){
                Object.values(bricks).forEach(x=>{if(x.offsetTop>foeMain.offsetTop&&x.offsetLeft===foeMain.offsetLeft&&x.offsetTop<brickBlock.offsetTop){brickBlock=x}})
            }
            Object.values(square).forEach(x=>{
                if(brickBlock){if(x.offsetTop<brickBlock.offsetTop&&x.offsetTop>foeMain.offsetTop&&x.offsetLeft===foeMain.offsetLeft){lost=true}}
                else{if(x.offsetTop>foeMain.offsetTop&&x.offsetLeft===foeMain.offsetLeft){lost=true}}
            })
            if(lost){lose()}
        }
        if(foeAction[0]===move.left){
            let lost=false
            if(bricks){Object.values(bricks).forEach(x=>{if(x.offsetTop===foeMain.offsetTop&&x.offsetLeft<foeMain.offsetLeft){brickBlock=x}})}
            if(brickBlock){
                Object.values(bricks).forEach(x=>{if(x.offsetTop===foeMain.offsetTop&&x.offsetLeft<foeMain.offsetLeft&&x.offsetLeft>brickBlock.offsetLeft){brickBlock=x}})
            }
            Object.values(square).forEach(x=>{
                if(brickBlock){if(x.offsetLeft>brickBlock.offsetLeft&&x.offsetTop===foeMain.offsetTop&&x.offsetLeft<foeMain.offsetLeft){lost=true}}
                else{if(x.offsetTop===foeMain.offsetTop&&x.offsetLeft<foeMain.offsetLeft){lost=true}}
            })
            if(lost){lose()}
        }
        if(foeAction[0]===move.right){
            let lost=false
            if(bricks){Object.values(bricks).forEach(x=>{if(x.offsetTop===foeMain.offsetTop&&x.offsetLeft>foeMain.offsetLeft){brickBlock=x}})}
            if(brickBlock){
                Object.values(bricks).forEach(x=>{if(x.offsetTop===foeMain.offsetTop&&x.offsetLeft>foeMain.offsetLeft&&x.offsetLeft<brickBlock.offsetLeft){brickBlock=x}})
            }
            Object.values(square).forEach(x=>{
                if(brickBlock){if(x.offsetLeft<brickBlock.offsetLeft&&x.offsetTop===foeMain.offsetTop&&x.offsetLeft>foeMain.offsetLeft){lost=true}}
                else{if(x.offsetTop===foeMain.offsetTop&&x.offsetLeft>foeMain.offsetLeft){lost=true}}
            })
            if(lost){lose()}
        }
        }    
    }
function foeDraw(target){
    foe=document.querySelectorAll('.foe')
    let lastFoe=foe[foe.length-1]
    Object.values(foe).forEach(x=>{if(x){x.style.borderRadius=0}})
    if(foeAction[0]){switch(foeAction[0]()){
        case 'down':{foeMain.style.borderRadius='50% 50% 0 0';break}
        case 'up':{foeMain.style.borderRadius='0 0 50% 50%';break}
        case 'right':{foeMain.style.borderRadius='50% 0 0 50%';break}
        case 'left':{foeMain.style.borderRadius='0 50% 50% 0';break}
        default: console.log('draw err')
        }
    }
    if(foeAction[foe.length-2]){switch(foeAction[foe.length-2]()){
        case 'down':{lastFoe.style.borderRadius='0 0 50% 50%';break}
        case 'up':{lastFoe.style.borderRadius='50% 50% 0 0';break}
        case 'right':{lastFoe.style.borderRadius='0 50% 50% 0';break}
        case 'left':{lastFoe.style.borderRadius='50% 0 0 50%';break}
        default: console.log('draw err')
        }
    }
    for(let i=1; i<foe.length-1; i++){
        if(foeAction[i]){
                if(foeAction[i]()==='down'){
                    if(foeAction[i-1]()==='right'){foe[i].style.borderRadius='0 50% 0 0'}
                    if(foeAction[i-1]()==='left'){foe[i].style.borderRadius='50% 0 0 0'}
                }
                if(foeAction[i]()==='up'){
                    if(foeAction[i-1]()==='right'){foe[i].style.borderRadius='0 0 50% 0'}
                    if(foeAction[i-1]()==='left'){foe[i].style.borderRadius='0 0 0 50%'}
                }
                if(foeAction[i]()==='right'){
                    if(foeAction[i-1]()==='down'){foe[i].style.borderRadius='0 0 0 50%'}
                    if(foeAction[i-1]()==='up'){foe[i].style.borderRadius='50% 0 0 0'}
                }
                if(foeAction[i]()==='left'){
                    if(foeAction[i-1]()==='down'){foe[i].style.borderRadius='0 0 50% 0'}
                    if(foeAction[i-1]()==='up'){foe[i].style.borderRadius='0 50% 0 0'}
                }
            }
    }
    if(Math.abs(foeMain.offsetLeft-target.offsetLeft)<=20*5&&Math.abs(foeMain.offsetTop-target.offsetTop)<=20*5){foeTargetNear=true}
    else{foeTargetNear=false}
    foeEmo.style.display='none'
    foeEyeBall.style.display='block'
    if(foeTargetNear){
                    foeEyeSparkle.style.display='block'
                    foeEyeBall.style.width='10px'
                    foeEyeBall.style.height='10px'
                    if(foeMain.offsetTop<target.offsetTop){
                                if(foeMain.offsetLeft<target.offsetLeft){
                                    foeEyeBall.style.top='4px'
                                    foeEyeBall.style.left='2px'
                                    foeEyeSparkle.style.top='4px'
                                    foeEyeSparkle.style.left='2px'
                                }
                                else if(foeMain.offsetLeft>target.offsetLeft){
                                    foeEyeBall.style.top='4px'
                                    foeEyeBall.style.left='-2px'
                                    foeEyeSparkle.style.top='4px'
                                    foeEyeSparkle.style.left='-2px'
                                }
                                else{
                                    foeEyeBall.style.top='5px'
                                    foeEyeBall.style.left=0
                                    foeEyeSparkle.style.top='5px'
                                    foeEyeSparkle.style.left=0
                                }
                            }
                    else if(foeMain.offsetTop>target.offsetTop){
                                if(foeMain.offsetLeft<target.offsetLeft){
                                    foeEyeBall.style.top='1px'
                                    foeEyeBall.style.left='2px'
                                    foeEyeSparkle.style.top='1px'
                                    foeEyeSparkle.style.left='2px'
                                }
                                else if(foeMain.offsetLeft>target.offsetLeft){
                                    foeEyeBall.style.top='1px'
                                    foeEyeBall.style.left='-2px'
                                    foeEyeSparkle.style.top='1px'
                                    foeEyeSparkle.style.left='-2px'
                                }
                                else{
                                    foeEyeBall.style.top=0
                                    foeEyeBall.style.left=0
                                    foeEyeSparkle.style.top=0
                                    foeEyeSparkle.style.left=0
                                }
                            }
                    else{
                                if(foeMain.offsetLeft<target.offsetLeft){
                                    foeEyeBall.style.top='2.5px'
                                    foeEyeBall.style.left='2.5px'
                                    foeEyeSparkle.style.top='2.5px'
                                    foeEyeSparkle.style.left='2.5px'
                                }
                                else if(foeMain.offsetLeft>target.offsetLeft){
                                    foeEyeBall.style.top='2.5px'
                                    foeEyeBall.style.left='-2.5px'
                                    foeEyeSparkle.style.top='2.5px'
                                    foeEyeSparkle.style.left='-2.5px'
                                }
                                else{
                                    foeEyeBall.style.top='2.5px'
                                    foeEyeBall.style.left=0
                                    foeEyeSparkle.style.top='2.5px'
                                    foeEyeSparkle.style.left=0
                                    foeEmo.textContent='^'
                                    foeEmo.style.top='1px'
                                    foeEmo.style.left='3px'
                                    foeEmo.style.display='block'
                                    foeEyeBall.style.display='none'
                                }
                        }
                    
                }
    else{
        foeEyeSparkle.style.display='none'
        foeEyeBall.style.width='5px'
        foeEyeBall.style.height='5px'
        if(foeMain.offsetTop<target.offsetTop){
                    if(foeMain.offsetLeft<target.offsetLeft){
                        foeEyeBall.style.top='8px'
                        foeEyeBall.style.left='4px'
                    }
                    else if(foeMain.offsetLeft>target.offsetLeft){
                        foeEyeBall.style.top='8px'
                        foeEyeBall.style.left='-4px'
                    }
                    else{
                        foeEyeBall.style.top='10px'
                        foeEyeBall.style.left=0
                    }
                }
        else if(foeMain.offsetTop>target.offsetTop){
                    if(foeMain.offsetLeft<target.offsetLeft){
                        foeEyeBall.style.top='2px'
                        foeEyeBall.style.left='4px'
                    }
                    else if(foeMain.offsetLeft>target.offsetLeft){
                        foeEyeBall.style.top='2px'
                        foeEyeBall.style.left='-4px'
                    }
                    else{
                        foeEyeBall.style.top=0
                        foeEyeBall.style.left=0
                    }
                }
        else{
                    if(foeMain.offsetLeft<target.offsetLeft){
                        foeEyeBall.style.top='5px'
                        foeEyeBall.style.left='5px'
                    }
                    else if(foeMain.offsetLeft>target.offsetLeft){
                        foeEyeBall.style.top='5px'
                        foeEyeBall.style.left='-5px'
                    }
                    else{
                        foeEyeBall.style.top='5px'
                        foeEyeBall.style.left=0
                    }
                }
        }
    if(!laserEye){
        let lasers=document.querySelectorAll('.laser')
        if(lasers){Object.values(lasers).forEach(x=>x.remove())}
    }    
    if(foeLaserEye){
        let bricks=document.querySelectorAll('.brick')
        let brickBlock=null
        if(foeAction[0]===move.up){
            let laser=document.createElement('div')
            canvas.appendChild(laser)
            laser.className='laser'
            laser.style.top=0
            laser.style.left=foeMain.offsetLeft+'px'
            laser.style.height=(foeMain.offsetTop-canvasTop+20)+'px'
            laser.style.width=foeMain.offsetWidth+'px'
            if(bricks){Object.values(bricks).forEach(x=>{if(x.offsetTop<foeMain.offsetTop&&x.offsetLeft===foeMain.offsetLeft){brickBlock=x}})}
            if(brickBlock){
                Object.values(bricks).forEach(x=>{if(x.offsetTop<foeMain.offsetTop&&x.offsetLeft===foeMain.offsetLeft&&x.offsetTop>brickBlock.offsetTop){brickBlock=x}})
                laser.style.top=brickBlock.offsetTop+'px'
                laser.style.left=brickBlock.offsetLeft+'px'
                laser.style.height=(foeMain.offsetTop-brickBlock.offsetTop+20)+'px'
                laser.style.width=foeMain.offsetWidth+'px'    
            }
        }
        if(foeAction[0]===move.down){
            let laser=document.createElement('div')
            canvas.appendChild(laser)
            laser.className='laser'
            laser.style.top=foeMain.offsetTop+'px'
            laser.style.left=foeMain.offsetLeft+'px'
            laser.style.height=(canvasTop+canvasHeight-foeMain.offsetTop)+'px'
            laser.style.width=foeMain.offsetWidth+'px'
            if(bricks){Object.values(bricks).forEach(x=>{if(x.offsetTop>foeMain.offsetTop&&x.offsetLeft===foeMain.offsetLeft){brickBlock=x}})}
            if(brickBlock){
                Object.values(bricks).forEach(x=>{if(x.offsetTop>foeMain.offsetTop&&x.offsetLeft===foeMain.offsetLeft&&x.offsetTop<brickBlock.offsetTop){brickBlock=x}})
                laser.style.top=foeMain.offsetTop+'px'
                laser.style.left=foeMain.offsetLeft+'px'
                laser.style.height=(brickBlock.offsetTop-foeMain.offsetTop)+'px'
                laser.style.width=foeMain.offsetWidth+'px'
                }
        }
        if(foeAction[0]===move.left){
            let laser=document.createElement('div')
            canvas.appendChild(laser)
            laser.className='laser'
            laser.style.top=foeMain.offsetTop+'px'
            laser.style.left=0
            laser.style.height=foeMain.offsetHeight+'px'
            laser.style.width=(foeMain.offsetLeft-canvasLeft+20)+'px'
            if(bricks){Object.values(bricks).forEach(x=>{if(x.offsetTop===foeMain.offsetTop&&x.offsetLeft<foeMain.offsetLeft){brickBlock=x}})}
            if(brickBlock){
                Object.values(bricks).forEach(x=>{if(x.offsetTop===foeMain.offsetTop&&x.offsetLeft<foeMain.offsetLeft&&x.offsetLeft>brickBlock.offsetLeft){brickBlock=x}})
                laser.style.top=brickBlock.offsetTop+'px'
                laser.style.left=brickBlock.offsetLeft+'px'
                laser.style.height=foeMain.offsetHeight+'px'
                laser.style.width=(foeMain.offsetLeft-brickBlock.offsetLeft+20)+'px'
                }
        }
        if(foeAction[0]===move.right){
            let laser=document.createElement('div')
            canvas.appendChild(laser)
            laser.className='laser'
            laser.style.top=foeMain.offsetTop+'px'
            laser.style.left=foeMain.offsetLeft+'px'
            laser.style.height=foeMain.offsetHeight+'px'
            laser.style.width=(canvasLeft+canvasWidth-foeMain.offsetLeft)+'px'
            if(bricks){Object.values(bricks).forEach(x=>{if(x.offsetTop===foeMain.offsetTop&&x.offsetLeft>foeMain.offsetLeft){brickBlock=x}})}
            if(brickBlock){
                Object.values(bricks).forEach(x=>{if(x.offsetTop===foeMain.offsetTop&&x.offsetLeft>foeMain.offsetLeft&&x.offsetLeft<brickBlock.offsetLeft){brickBlock=x}})
                laser.style.top=foeMain.offsetTop+'px'
                laser.style.left=foeMain.offsetLeft+'px'
                laser.style.height=foeMain.offsetHeight+'px'
                laser.style.width=(brickBlock.offsetLeft-foeMain.offsetLeft)+'px'
                }
        }
    }
    if(mindControl){
        foeEmo.textContent='@'
        foeEmo.style.top='-1.5px'
        foeEmo.style.left='-0.5px'
        foeEmo.style.display='block'
        foeEyeBall.style.display='none'
        }    
    }
function playHappySound(){
    switch(Math.floor(Math.random()*5+1)){
        case 1:{
            happySound1.currentTime=0
            happySound1.play()
            break}
        case 2:{
            happySound2.currentTime=0
            happySound2.play()
            break}
        case 3:{
            happySound3.currentTime=0
            happySound3.play()
            break}
        case 4:{
            happySound4.currentTime=0
            happySound4.play()
            break}
        case 5:{
            happySound5.currentTime=0
            happySound5.play()
            break}
        default:{console.log('happySound err')}
    }
    }
function foeCheck(){
    if(foeMain.offsetTop===food.offsetTop&&foeMain.offsetLeft===food.offsetLeft){
            playHappySound()
            let superTime=0
            food.style.left='-999px'
            if(foodType==='strong'){
                foeSuperStrong=true
                feature.textContent='Enemy-Power: SuperStrong'
                feature.style.animation=`Fadeout 0.5s 3, Feature ${superDuration/1000}s`
                foeEyeBall.style.backgroundColor='green'
                Object.values(foe).forEach(x=>{x.style.animation='Superstrong 1s';x.style.transform='scale(1.5)';x.style.backgroundColor='green'})
                superStrongSound.play()
                let superStrongInterval=setInterval(function(){
                    if(isRunning){superTime+=100}
                    if(superTime>=superDuration||stop){
                        disappointSound.currentTime=0
                        disappointSound.play()                
                        foodDefault()
                        foeSuperStrong=false
                        feature.textContent='Super-Power:'
                        feature.style.animation=''
                        foeEyeBall.style.backgroundColor='black'
                        Object.values(foe).forEach(x=>{x.style.animation='Normalize 1s';x.style.transform='scale(1)';x.style.backgroundColor='lightsalmon'})
                        superStrongSound.pause()
                        superStrongSound.currentTime=0
                        clearInterval(superStrongInterval)}
                },100)
            }
            if(foodType==='laser'){
                foeLaserEye=true
                feature.textContent='Enemy-Power: LaserEye'
                feature.style.animation=`Fadeout 0.5s 3, Feature ${superDuration/1000}s`
                foeEyeBall.style.backgroundColor='red'
                laserSound.play()
                let laserInterval=setInterval(function(){
                    if(isRunning){superTime+=100}
                    if(superTime>=superDuration||stop){
                        disappointSound.currentTime=0
                        disappointSound.play()                
                        foodDefault()
                        foeLaserEye=false
                        feature.textContent='Super-Power:'
                        feature.style.animation=''
                        foeEyeBall.style.backgroundColor='black'
                        laserSound.pause()
                        laserSound.currentTime=0    
                        clearInterval(laserInterval)}
                },100)
            }
            if(foodType==='bomb'){
                foeBombEater=true
                feature.textContent='Enemy-Power: BombEater'
                feature.style.animation=`Fadeout 0.5s 3, Feature ${superDuration/1000}s`
                foeEyeBall.style.backgroundColor='purple'
                Object.values(foe).forEach(x=>x.style.backgroundColor='red')
                let bombInterval=setInterval(function(){
                    if(isRunning){superTime+=100}
                    if(superTime>=superDuration||stop){
                        disappointSound.currentTime=0
                        disappointSound.play()                
                        foodDefault()
                        foeBombEater=false
                        feature.textContent='Super-Power:'
                        feature.style.animation=''
                        foeEyeBall.style.backgroundColor='black'
                        Object.values(foe).forEach(x=>x.style.backgroundColor='lightsalmon')    
                        clearInterval(bombInterval)}
                },100)}
            if(foodType==='mind'){
                foeMindControl=true
                feature.textContent='Enemy-Power: MindControl'
                feature.style.animation=`Fadeout 0.5s 3, Feature ${superDuration/1000}s`
                foeEyeBall.style.backgroundColor='purple'
                mindControlSound.play()
                let mindInterval=setInterval(function(){
                    if(isRunning){superTime+=100}
                    if(superTime>=superDuration||stop){
                        disappointSound.currentTime=0
                        disappointSound.play()                
                        foodDefault()
                        foeMindControl=false
                        feature.textContent='Super-Power:'
                        feature.style.animation=''
                        foeEyeBall.style.backgroundColor='black'
                        mindControlSound.pause()
                        mindControlSound.currentTime=0                        
                        clearInterval(mindInterval)}
                },100)}
        }
    superCheck()
    }
function foeRule(){
    let topLimit=(foeMain.offsetTop===canvasTop)
    let bottomLimit=(foeMain.offsetTop===(canvasTop+canvasHeight-20))
    let leftLimit=(foeMain.offsetLeft===canvasLeft)
    let rightLimit=(foeMain.offsetLeft===(canvasLeft+canvasWidth-20))
    if(foeStop){
        foeBlockUp=true
        foeBlockDown=true
        foeBlockLeft=true
        foeBlockRight=true    
    }else{
        foeBlockUp=false
        foeBlockDown=false
        foeBlockLeft=false
        foeBlockRight=false
        if(foeAction[0]()==='down'){foeBlockDown=true}
        if(foeAction[0]()==='up'){foeBlockUp=true}
        if(foeAction[0]()==='right'){foeBlockRight=true}
        if(foeAction[0]()==='left'){foeBlockLeft=true}
        if(topLimit){foeBlockUp=true}   
        if(bottomLimit){foeBlockDown=true}
        if(leftLimit){foeBlockLeft=true}
        if(rightLimit){foeBlockRight=true}    
    }
    }
function foeStep(stepMove){
    if(!foeStop){
        add(foeAction,stepMove)
        foeAction.forEach((x,i)=>{if(x){x(foe[i])}})
        if(unbound.checked){unblock()}
        if(foeSuperStrong||superStrong||foeLaserEye||laserEye||foeBombEater||bombEater){foeDraw(main)}
        else if(foeMindControl){
            let bombExplode=document.querySelector('.bomb')
            foeDraw(bombExplode)}
        else{foeDraw(food)}
        add(foePosition,{top:foeMain.offsetTop,left:foeMain.offsetLeft})
        foeCheck()
    }
    }
function foeRun(target){
if(!mindControl){
    let topLimit=(foeMain.offsetTop===canvasTop)
    let bottomLimit=(foeMain.offsetTop===(canvasTop+canvasHeight-20))
    let leftLimit=(foeMain.offsetLeft===canvasLeft)
    let rightLimit=(foeMain.offsetLeft===(canvasLeft+canvasWidth-20))
    let bombExplode=document.querySelector('.bomb')
    if(bombExplode){
        if(foeMain.offsetTop>=(bombExplode.offsetTop-bombExplode.offsetHeight*5-20)
            &&foeMain.offsetTop<=(bombExplode.offsetTop+bombExplode.offsetHeight*5+20)
            &&foeMain.offsetLeft>=(bombExplode.offsetLeft-bombExplode.offsetWidth*5-20)
            &&foeMain.offsetLeft<=(bombExplode.offsetLeft+bombExplode.offsetWidth*5+20))
        {
            if(topLimit&&leftLimit){
                if(foeAction[0]()==='down'||foeAction[0]()==='up'){foeMove.rightright();return}
                if(foeAction[0]()==='right'||foeAction[0]()==='left'){foeMove.downdown();return}
            }
            else if(topLimit&&rightLimit){
                if(foeAction[0]()==='down'||foeAction[0]()==='up'){foeMove.leftleft();return}
                if(foeAction[0]()==='right'||foeAction[0]()==='left'){foeMove.downdown();return}   
            }
            else if(bottomLimit&&rightLimit){
                if(foeAction[0]()==='down'||foeAction[0]()==='up'){foeMove.leftleft();return}
                if(foeAction[0]()==='right'||foeAction[0]()==='left'){foeMove.upup();return}       
            }
            else if(bottomLimit&&leftLimit){
                if(foeAction[0]()==='down'||foeAction[0]()==='up'){foeMove.rightright();return}
                if(foeAction[0]()==='right'||foeAction[0]()==='left'){foeMove.upup();return}       
            }
            else if(topLimit||bottomLimit){
                if(foeAction[0]()==='right'){foeMove.leftleft();return}
                else if(foeAction[0]()==='left'){foeMove.rightright();return}
                else{
                    if(foeMain.offsetLeft>=bombExplode.offsetLeft){foeMove.rightright();return}
                    else{foeMove.leftleft();return}
                    }
            }
            else if(leftLimit||rightLimit){
                if(foeAction[0]()==='down'){foeMove.upup();return}
                else if(foeAction[0]()==='up'){foeMove.downdown();return}
                else{
                    if(foeMain.offsetTop>=bombExplode.offsetTop){foeMove.downdown();return}
                    else{foeMove.upup();return}
                    }
            }
            else{
                if(foeMain.offsetTop>bombExplode.offsetTop){
                    if(foeMain.offsetLeft>bombExplode.offsetLeft){
                        if(foeAction[0]()==='up'){foeMove.downdown();return}
                        if(foeAction[0]()==='down'){foeMove.rightright();return}
                        if(foeAction[0]()==='left'){foeMove.rightright();return}
                        if(foeAction[0]()==='right'){foeMove.downdown();return}
                        }
                    else if(foeMain.offsetLeft<bombExplode.offsetLeft){
                        if(foeAction[0]()==='up'){foeMove.downdown();return}
                        if(foeAction[0]()==='down'){foeMove.leftleft();return}    
                        if(foeAction[0]()==='left'){foeMove.downdown();return}
                        if(foeAction[0]()==='right'){foeMove.leftleft();return}
                        }
                    else {
                        if(foeAction[0]()==='up'){foeMove.downdown();return}
                        if(foeAction[0]()==='down'){foeMove.rightright();return}    
                        if(foeAction[0]()==='left'){foeMove.rightright();return}
                        if(foeAction[0]()==='right'){foeMove.leftleft();return}
                    }
                }else if(foeMain.offsetTop<bombExplode.offsetTop){
                    if(foeMain.offsetLeft>bombExplode.offsetLeft){
                        if(foeAction[0]()==='up'){foeMove.rightright();return}
                        if(foeAction[0]()==='down'){foeMove.upup();return}
                        if(foeAction[0]()==='left'){foeMove.rightright();return}
                        if(foeAction[0]()==='right'){foeMove.upup();return}
                        }
                    else if(foeMain.offsetLeft<bombExplode.offsetLeft){
                        if(foeAction[0]()==='up'){foeMove.leftleft();return}    
                        if(foeAction[0]()==='down'){foeMove.upup();return}
                        if(foeAction[0]()==='left'){foeMove.upup();return}
                        if(foeAction[0]()==='right'){foeMove.leftleft();return}
                        }
                    else {
                        if(foeAction[0]()==='up'){foeMove.rightright();return}    
                        if(foeAction[0]()==='down'){foeMove.upup();return}
                        if(foeAction[0]()==='left'){foeMove.rightright();return}
                        if(foeAction[0]()==='right'){foeMove.leftleft();return}
                    }
                }else{
                    if(foeMain.offsetLeft>bombExplode.offsetLeft){
                        if(foeAction[0]()==='right'){foeMove.upup();return}
                        else{foeMove.rightright();return}
                        }
                    else if(foeMain.offsetLeft<bombExplode.offsetLeft){
                        if(foeAction[0]()==='left'){foeMove.upup();return}
                        else{foeMove.leftleft();return}
                        }
                    else{
                        if(foeAction[0]()==='up'){foeMove.downdown();return}
                        else{foeMove.upup();return}
                        }
                }
            } 
        }
    }
    let escape=false
    if(superStrong||laserEye||bombEater||foeMindControl){escape=true}
    if(escape){
        if(topLimit&&leftLimit){
            if(foeAction[0]()==='down'||foeAction[0]()==='up'){foeMove.rightright();return}
            if(foeAction[0]()==='right'||foeAction[0]()==='left'){foeMove.downdown();return}
        }
        else if(topLimit&&rightLimit){
            if(foeAction[0]()==='down'||foeAction[0]()==='up'){foeMove.leftleft();return}
            if(foeAction[0]()==='right'||foeAction[0]()==='left'){foeMove.downdown();return}   
        }
        else if(bottomLimit&&rightLimit){
            if(foeAction[0]()==='down'||foeAction[0]()==='up'){foeMove.leftleft();return}
            if(foeAction[0]()==='right'||foeAction[0]()==='left'){foeMove.upup();return}       
        }
        else if(bottomLimit&&leftLimit){
            if(foeAction[0]()==='down'||foeAction[0]()==='up'){foeMove.rightright();return}
            if(foeAction[0]()==='right'||foeAction[0]()==='left'){foeMove.upup();return}       
        }
        else if(topLimit||bottomLimit){
            if(foeMindControl){
                if(topLimit){
                    if(foeAction[0]()==='down'){foeMove.rightdown();return}
                    else{foeMove.downdown();return}
                }
                if(bottomLimit){
                    if(foeAction[0]()==='up'){foeMove.rightup();return}
                    else{foeMove.upup();return}
                }
            }
            else{
                if(foeAction[0]()==='right'){foeMove.leftleft();return}
                else if(foeAction[0]()==='left'){foeMove.rightright();return}
                else{
                    if(foeMain.offsetLeft>=target.offsetLeft){foeMove.rightright();return}
                    else{foeMove.leftleft();return}
                    }
            }
        }
        else if(leftLimit||rightLimit){
            if(foeMindControl){
                if(leftLimit){
                    if(foeAction[0]()==='right'){foeMove.downright();return}
                    else{foeMove.rightright();return}
                }
                if(rightLimit){
                    if(foeAction[0]()==='left'){foeMove.downleft();return}
                    else{foeMove.leftleft();return}
                }
            }
            else{
                if(foeAction[0]()==='down'){foeMove.upup();return}
                else if(foeAction[0]()==='up'){foeMove.downdown();return}
                else{
                    if(foeMain.offsetTop>=target.offsetTop){foeMove.downdown();return}
                    else{foeMove.upup();return}
                    }
            }
        }
        else{
            if(superStrong||bombEater){
                if(foeMain.offsetTop>target.offsetTop){
                    if(foeMain.offsetLeft>target.offsetLeft){
                        if(foeAction[0]()==='right'||foeAction[0]()==='up'){
                            if(action[0]()==='down'||action[0]()==='up'){foeMove.downright();return}
                            if(action[0]()==='right'||action[0]()==='left'){foeMove.downdown();return}
                            }
                        if(foeAction[0]()==='left'||foeAction[0]()==='down'){
                            if(action[0]()==='down'||action[0]()==='up'){foeMove.rightright();return}
                            if(action[0]()==='right'||action[0]()==='left'){foeMove.rightdown();return}
                            }
                        }
                    else if(foeMain.offsetLeft<target.offsetLeft){
                        if(foeAction[0]()==='left'||foeAction[0]()==='up'){
                            if(action[0]()==='down'||action[0]()==='up'){foeMove.downleft();return}
                            if(action[0]()==='right'||action[0]()==='left'){foeMove.downdown();return}
                            }
                        if(foeAction[0]()==='right'||foeAction[0]()==='down'){
                            if(action[0]()==='down'||action[0]()==='up'){foeMove.leftleft();return}
                            if(action[0]()==='right'||action[0]()==='left'){foeMove.leftdown();return}
                            }
                        }
                    else {
                        if(action[0]()==='right'){
                            if(foeAction[0]()==='right'){foeMove.downright();return}
                            else{foeMove.rightright();return}}
                        else if(action[0]()==='left'){
                            if(foeAction[0]()==='left'){foeMove.downleft();return}
                            else{foeMove.leftleft();return}}
                        else{
                            if(foeAction[0]()==='down'){foeMove.rightdown();return}
                            else{foeMove.downdown();return}
                        }
                    }
                }else if(foeMain.offsetTop<target.offsetTop){
                    if(foeMain.offsetLeft>target.offsetLeft){
                        if(foeAction[0]()==='left'||foeAction[0]()==='up'){
                            if(action[0]()==='down'||action[0]()==='up'){foeMove.rightright();return}
                            if(action[0]()==='right'||action[0]()==='left'){foeMove.rightup();return}
                            }
                        if(foeAction[0]()==='right'||foeAction[0]()==='down'){
                            if(action[0]()==='down'||action[0]()==='up'){foeMove.upright();return}
                            if(action[0]()==='right'||action[0]()==='left'){foeMove.upup();return}
                            }
                        }
                    else if(foeMain.offsetLeft<target.offsetLeft){
                        if(foeAction[0]()==='right'||foeAction[0]()==='up'){
                            if(action[0]()==='down'||action[0]()==='up'){foeMove.leftleft();return}
                            if(action[0]()==='right'||action[0]()==='left'){foeMove.leftup();return}
                            }
                        if(foeAction[0]()==='left'||foeAction[0]()==='down'){
                            if(action[0]()==='down'||action[0]()==='up'){foeMove.upleft();return}
                            if(action[0]()==='right'||action[0]()==='left'){foeMove.upup();return}
                            }
                        }
                    else {
                        if(action[0]()==='right'){
                            if(foeAction[0]()==='right'){foeMove.upright();return}
                            else{foeMove.rightright();return}}
                        else if(action[0]()==='left'){
                            if(foeAction[0]()==='left'){foeMove.upleft();return}
                            else{foeMove.leftleft();return}}
                        else{
                            if(foeAction[0]()==='up'){foeMove.rightup();return}
                            else{foeMove.upup();return}
                        }
                    }
                }else{
                    if(foeMain.offsetLeft>target.offsetLeft){
                        if(action[0]()==='down'){
                            if(foeAction[0]()==='down'){foeMove.rightdown();return}
                            else{foeMove.downdown();return}}
                        else if(action[0]()==='up'){
                            if(foeAction[0]()==='up'){foeMove.rightup();return}
                            else{foeMove.upup();return}}
                        else{
                            if(foeAction[0]()==='right'){foeMove.downright();return}
                            else{foeMove.rightright();return}
                            }
                        }
                    else if(foeMain.offsetLeft<target.offsetLeft){
                        if(action[0]()==='down'){
                            if(foeAction[0]()==='down'){foeMove.leftdown();return}
                            else{foeMove.downdown();return}}
                        else if(action[0]()==='up'){
                            if(foeAction[0]()==='up'){foeMove.leftup();return}
                            else{foeMove.upup();return}}
                        else{
                            if(foeAction[0]()==='left'){foeMove.downleft();return}
                            else{foeMove.leftleft();return}
                            }
                        }
                    else{
                        if(foeAction[0]()==='up'){foeMove.downdown();return}
                        else{foeMove.upup();return}
                        }
                }
            }
            if(laserEye){
                if(action[0]()==='down'){
                    if(foeAction[0]()==='up'){
                        if(foeMain.offsetLeft>=target.offsetLeft){foeMove.rightup();return}
                        else{foeMove.leftup()}
                    }else{foeMove.upup();return}
                    }
                if(action[0]()==='up'){
                    if(foeAction[0]()==='down'){
                        if(foeMain.offsetLeft>=target.offsetLeft){foeMove.rightdown();return}
                        else{foeMove.leftdown()}
                    }else{foeMove.downdown();return}
                    }
                if(action[0]()==='right'){
                    if(foeAction[0]()==='left'){
                        if(foeMain.offsetTop>=target.offsetTop){foeMove.downleft();return}
                        else{foeMove.upleft()}
                    }else{foeMove.leftleft();return}
                    }
                if(action[0]()==='left'){
                    if(foeAction[0]()==='right'){
                        if(foeMain.offsetTop>=target.offsetTop){foeMove.downright();return}
                        else{foeMove.upright()}
                    }else{foeMove.rightright();return}
                    }
            }
            if(foeMindControl){
                if(bombExplode){
                    if(main.offsetTop>bombExplode.offsetTop){
                        if(main.offsetLeft>bombExplode.offsetLeft){
                            if(action[0]()==='up'||action[0]()==='down'){foeMove.leftup();return}
                            if(action[0]()==='left'||action[0]()==='right'){foeMove.upleft();return}
                            }
                        else if(main.offsetLeft<bombExplode.offsetLeft){
                            if(action[0]()==='up'||action[0]()==='down'){foeMove.rightup();return}
                            if(action[0]()==='left'||action[0]()==='right'){foeMove.upright();return}
                            }
                        else {
                            if(action[0]()==='up'){foeMove.rightup();return}
                            else{foeMove.upup();return}
                            }
                    }else if(main.offsetTop<bombExplode.offsetTop){
                        if(main.offsetLeft>bombExplode.offsetLeft){
                            if(action[0]()==='up'||action[0]()==='down'){foeMove.leftdown();return}
                            if(action[0]()==='left'||action[0]()==='right'){foeMove.downleft();return}
                            }
                        else if(main.offsetLeft<bombExplode.offsetLeft){
                            if(action[0]()==='up'||action[0]()==='down'){foeMove.rightdown();return}
                            if(action[0]()==='left'||action[0]()==='right'){foeMove.downright();return}
                            }
                        else {
                            if(action[0]()==='down'){foeMove.rightdown();return}
                            else{foeMove.downdown();return}
                            }
                    }else{
                        if(main.offsetLeft>bombExplode.offsetLeft){
                            if(action[0]()==='left'){foeMove.downleft();return}
                            else{foeMove.leftleft();return}
                            }
                        else if(main.offsetLeft<bombExplode.offsetLeft){
                            if(action[0]()==='right'){foeMove.downright();return}
                            else{foeMove.rightright();return}
                            }
                        else{
                            if(action[0]()==='up'){foeMove.downright();return}
                            else{foeMove.upleft();return}
                        }
                    }            
                }   
            }         
        }
    }
    else{
        if(foeMain.offsetTop>target.offsetTop){
            if(foeMain.offsetLeft>target.offsetLeft){
                if(foeAction[0]()==='up'||foeAction[0]()==='down'){foeMove.leftup();return}
                if(foeAction[0]()==='left'||foeAction[0]()==='right'){foeMove.upleft();return}
                }
            else if(foeMain.offsetLeft<target.offsetLeft){
                if(foeAction[0]()==='up'||foeAction[0]()==='down'){foeMove.rightup();return}
                if(foeAction[0]()==='left'||foeAction[0]()==='right'){foeMove.upright();return}
                }
            else {
                if(foeAction[0]()==='up'){foeMove.rightup();return}
                else{foeMove.upup();return}
                }
        }else if(foeMain.offsetTop<target.offsetTop){
            if(foeMain.offsetLeft>target.offsetLeft){
                if(foeAction[0]()==='up'||foeAction[0]()==='down'){foeMove.leftdown();return}
                if(foeAction[0]()==='left'||foeAction[0]()==='right'){foeMove.downleft();return}
                }
            else if(foeMain.offsetLeft<target.offsetLeft){
                if(foeAction[0]()==='up'||foeAction[0]()==='down'){foeMove.rightdown();return}
                if(foeAction[0]()==='left'||foeAction[0]()==='right'){foeMove.downright();return}
                }
            else {
                if(foeAction[0]()==='down'){foeMove.rightdown();return}
                else{foeMove.downdown();return}
                }
        }else{
            if(foeMain.offsetLeft>target.offsetLeft){
                if(foeAction[0]()==='left'){foeMove.downleft();return}
                else{foeMove.leftleft();return}
                }
            else if(foeMain.offsetLeft<target.offsetLeft){
                if(foeAction[0]()==='right'){foeMove.downright();return}
                else{foeMove.rightright();return}
                }
        }    
    }
    }
}
function foeBlink(){
    foeEyeCover.style.maxHeight=foeEye.offsetHeight+'px'
    setTimeout(function(){foeEyeCover.style.maxHeight=0},100)
    }
function foeDead(){
    if(!foeStop){
        foeEmo.textContent='X'
        foeEmo.style.top='-1px'
        foeEmo.style.left='3px'
        foeEmo.style.display='block'
        foeEyeBall.style.display='none'
        Object.values(foe).forEach(x=>x.style.animation='Fadeout 0.5s infinite')
        foeStop=true
        scoreUp()
        if(mindControl){mindControl=false}
        if(foeMindControl){foeMindControl=false}
        let foeDeadTime=0
        let foeDeadIndex=setInterval(function(){
            if(isRunning){foeDeadTime+=100}
            if(foeDeadTime>=foeRespawnTime){
                foeDraw(food)
                Object.values(foe).forEach(x=>x.style.animation='')
                foeStop=false
                clearInterval(foeDeadIndex)
            }
        },100)
    }
    }
function explosion(){
    let bombExplode=document.createElement('div')
    canvas.appendChild(bombExplode)
    bombExplode.className='bomb'
    while(true){
        let breakable=true
        bombExplode.style.top=canvasTop+Math.floor(Math.random()*(canvasHeight/20))*20+'px'
        bombExplode.style.left=canvasLeft+Math.floor(Math.random()*(canvasWidth/20))*20+'px'
        let bricks=document.querySelectorAll('.brick')
        if(bricks){Object.values(bricks).forEach(x=>{if(x&&x.offsetTop===bombExplode.offsetTop&&x.offsetLeft===bombExplode.offsetLeft){breakable=false}})}
        if(bombExplode.offsetTop===food.offsetTop&&bombExplode.offsetLeft===food.offsetLeft){breakable=false}
        if(breakable){break}
    }
    let bombExplodeTime=0
    let bombExplodeIndex=setInterval(function(){
        if(isRunning){bombExplodeTime+=100}
        if(bombExplodeTime>=bombDelay){
            explosionSound.currentTime=0
            explosionSound.play()
            bombExplode.style.backgroundImage="url('./texture/explosion.png')"
            bombExplode.style.animation='Scaleout 1s'
            setTimeout(function(){bombExplode.remove()},1000)
            setTimeout(function(){
                let lost=false,foeLost=false
                Object.values(canvas.children).forEach(x=>{
                    if(x.offsetTop>=(bombExplode.offsetTop-bombExplode.offsetHeight*5)
                        &&x.offsetTop<=(bombExplode.offsetTop+bombExplode.offsetHeight*5)
                        &&x.offsetLeft>=(bombExplode.offsetLeft-bombExplode.offsetWidth*5)
                        &&x.offsetLeft<=(bombExplode.offsetLeft+bombExplode.offsetWidth*5))
                        {
                            if(x===main||x.className==='square'){if(!bombEater){lost=true}}
                            if(x===foeMain||x.className==='foe'){if(!foeBombEater){foeLost=true}}
                            if(x===food){foodDefault()}
                            if(x.className==='brick'){
                                x.style.animation='Fadeout 0.7s'
                                setTimeout(function(){x.remove()},700)
                            }
                        }
                    })
                if(lost){lose()}
                if(foeLost){
                    if(!mindControl){score-=1}
                    if(!foeStop){
                        foeDeadBombSound.currentTime=0
                        foeDeadBombSound.play()    
                        }
                    foeDead()
                    }
            },300)
            clearInterval(bombExplodeIndex)
        }
    },100)
    if(bombEater){
        Object.values(square).forEach(x=>{
            let squareExplodeTime=0
            x.style.animation='Fadeout 0.2s infinite'
            let squareExplodeIndex=setInterval(function(){
                if(isRunning){squareExplodeTime+=100}
                if(squareExplodeTime>=bombDelay){
                    largeExplosionSound.currentTime=0
                    largeExplosionSound.play()
                    x.style.animation=''
                    x.style.opacity='1'
                    let squareExplode=document.createElement('div')
                    canvas.appendChild(squareExplode)
                    squareExplode.className='bomb'
                    squareExplode.style.top=x.offsetTop+'px'
                    squareExplode.style.left=x.offsetLeft+'px'
                    squareExplode.style.backgroundImage="url('./texture/largeExplosion.png')"
                    squareExplode.style.animation='Superscale 1s'        
                    setTimeout(function(){squareExplode.remove()},1000)
                    setTimeout(function(){
                        let foeLost=false
                        Object.values(canvas.children).forEach(y=>{
                            if(y.offsetTop>=(squareExplode.offsetTop-squareExplode.offsetHeight*10)
                                &&y.offsetTop<=(squareExplode.offsetTop+squareExplode.offsetHeight*10)
                                &&y.offsetLeft>=(squareExplode.offsetLeft-squareExplode.offsetWidth*10)
                                &&y.offsetLeft<=(squareExplode.offsetLeft+squareExplode.offsetWidth*10))
                                {
                                    if(y===foeMain||y.className==='foe'){if(!foeBombEater){foeLost=true}}
                                    if(y===food){foodDefault()}
                                    if(y.className==='brick'){
                                        y.style.animation='Fadeout 0.7s'
                                        setTimeout(function(){y.remove()},700)
                                    }
                                }
                            })
                        if(foeLost){
                            if(!foeStop){
                                foeDeadBombSound.currentTime=0
                                foeDeadBombSound.play()    
                                }
                            foeDead()}
                    },300)
                    clearInterval(squareExplodeIndex)
                }
            },100)    
        })
    }
    if(foeBombEater){
        Object.values(foe).forEach(x=>{
            let foeExplodeTime=0
            x.style.animation='Fadeout 0.2s infinite'
            let foeExplodeIndex=setInterval(function(){
                if(isRunning){foeExplodeTime+=100}
                if(foeExplodeTime>=bombDelay){
                    largeExplosionSound.currentTime=0
                    largeExplosionSound.play()
                    x.style.animation=''
                    x.style.opacity='1'
                    let foeExplode=document.createElement('div')
                    canvas.appendChild(foeExplode)
                    foeExplode.className='bomb'
                    foeExplode.style.top=x.offsetTop+'px'
                    foeExplode.style.left=x.offsetLeft+'px'
                    foeExplode.style.backgroundImage="url('./texture/largeExplosion.png')"
                    foeExplode.style.animation='Superscale 1s'        
                    setTimeout(function(){foeExplode.remove()},1000)
                    setTimeout(function(){
                        let lost=false
                        Object.values(canvas.children).forEach(y=>{
                            if(y.offsetTop>=(foeExplode.offsetTop-foeExplode.offsetHeight*10)
                                &&y.offsetTop<=(foeExplode.offsetTop+foeExplode.offsetHeight*10)
                                &&y.offsetLeft>=(foeExplode.offsetLeft-foeExplode.offsetWidth*10)
                                &&y.offsetLeft<=(foeExplode.offsetLeft+foeExplode.offsetWidth*10))
                                {
                                    if(y===main||y.className==='square'){if(!bombEater){lost=true}}
                                    if(y===food){foodDefault()}
                                    if(y.className==='brick'){
                                        y.style.animation='Fadeout 0.7s'
                                        setTimeout(function(){y.remove()},700)
                                    }
                                }
                            })
                        if(lost){lose()}
                    },300)
                    clearInterval(foeExplodeIndex)
                }
            },100)    
        })
    }
    }
function brickStormHorizontalWave(){
    if(waveChange){
        let brick=document.querySelector('.brick')
        if(!brick){
            waveChange=false
            brickStormHorizontal=!brickStormHorizontal
            end()
            begin()
        }
    }
    else{
        let brickWall=[]
        let brickNumber=Math.floor(canvasHeight/20)
        let mainBrick=document.createElement('div')
        canvas.appendChild(mainBrick)
        mainBrick.className='brick'
        mainBrick.style.top=canvasTop+'px'
        mainBrick.style.left=(canvasLeft+canvasWidth-20)+'px'
        brickWall.push(mainBrick)
        for(let i=0; i<brickNumber-1;i++){
            let brick=document.createElement('div')
            canvas.appendChild(brick)
            brick.className='brick'
            brick.style.top=(mainBrick.offsetTop+(i+1)*20)+'px'
            brick.style.left=mainBrick.offsetLeft+'px'
            brickWall.push(brick)
        }
        let brickGapIndex=Math.floor(Math.random()*(brickWall.length-brickGapLength))
        for(let i=0; i<brickGapLength;i++){
            brickWall[brickGapIndex+i].remove()
        }
        waveCount+=1
        if(waveCount%waveThreshold===0){waveChange=true}
        if(waveCount%(waveThreshold*2)===0){
            if(brickWaveSpeed>3000){brickWaveSpeed-=400}
            if(brickWallSpeed>100){brickWallSpeed-=20}
        }
    }
    }
function brickStormHorizontalWall(){
    let squareMove=false
    let bricks=document.querySelectorAll('.brick')
    if(bricks){
        Object.values(bricks).forEach(x=>{
            Object.values(square).forEach(y=>{
                if(x.offsetTop===y.offsetTop&&x.offsetLeft===y.offsetLeft+20){squareMove=true}
            })
            })
        if(squareMove){
            Object.values(square).forEach(x=>x.style.left=(x.offsetLeft-20)+'px')
            unblock()
            position.forEach(x=>{
                if(x){
                    x.left-=20
                    if(x.top<canvasTop){x.top=canvasTop+canvasHeight-20}
                    if(x.top>canvasTop+canvasHeight-20){x.top=canvasTop}
                    if(x.left<canvasLeft){x.left=canvasLeft+canvasWidth-20}
                    if(x.left>canvasLeft+canvasWidth-20){x.left=canvasLeft}
                }
            })
            check()
        }
        Object.values(bricks).forEach(x=>{
            x.style.left=(x.offsetLeft-20)+'px'
            if(x.offsetLeft<canvasLeft){x.remove()}
        })
    }
    }
function brickStormVerticalWave(){
    if(waveChange){
        let brick=document.querySelector('.brick')
        if(!brick){
            waveChange=false
            brickStormHorizontal=!brickStormHorizontal
            end()
            begin()
        }
    }
    else{
        let brickWall=[]
        let brickNumber=Math.floor(canvasWidth/20)
        let mainBrick=document.createElement('div')
        canvas.appendChild(mainBrick)
        mainBrick.className='brick'
        mainBrick.style.top=canvasTop+'px'
        mainBrick.style.left=canvasLeft+'px'
        brickWall.push(mainBrick)
        for(let i=0; i<brickNumber-1;i++){
            let brick=document.createElement('div')
            canvas.appendChild(brick)
            brick.className='brick'
            brick.style.top=mainBrick.offsetTop+'px'
            brick.style.left=(mainBrick.offsetLeft+(i+1)*20)+'px'
            brickWall.push(brick)
        }
        let brickGapIndex=Math.floor(Math.random()*(brickWall.length-brickGapLength))
        for(let i=0; i<brickGapLength;i++){
            brickWall[brickGapIndex+i].remove()
        }
        waveCount+=1
        if(waveCount%waveThreshold===0){waveChange=true}
        if(waveCount%(waveThreshold*2)===0){
            if(brickWaveSpeed>3000){brickWaveSpeed-=400}
            if(brickWallSpeed>100){brickWallSpeed-=20}
        }
    }
    }
function brickStormVerticalWall(){
    let squareMove=false
    let bricks=document.querySelectorAll('.brick')
    if(bricks){
        Object.values(bricks).forEach(x=>{
            Object.values(square).forEach(y=>{
                if(x.offsetTop===y.offsetTop-20&&x.offsetLeft===y.offsetLeft){squareMove=true}
            })
            })
        if(squareMove){
            Object.values(square).forEach(x=>x.style.top=(x.offsetTop+20)+'px')
            unblock()
            position.forEach(x=>{
                if(x){
                    x.top+=20
                    if(x.top<canvasTop){x.top=canvasTop+canvasHeight-20}
                    if(x.top>canvasTop+canvasHeight-20){x.top=canvasTop}
                    if(x.left<canvasLeft){x.left=canvasLeft+canvasWidth-20}
                    if(x.left>canvasLeft+canvasWidth-20){x.left=canvasLeft}
                }
            })
            check()
        }
        Object.values(bricks).forEach(x=>{
            x.style.top=(x.offsetTop+20)+'px'
            if(x.offsetTop>canvasTop+canvasHeight-20){x.remove()}
        })
    }
    }
function angryCheck(){
    let lost=false
    let bricks=document.querySelectorAll('.brick')
    if(bricks){
        Object.values(bricks).forEach(x=>{
            Object.values(square).forEach(y=>{if(x.offsetTop===y.offsetTop&&x.offsetLeft===y.offsetLeft){lost=true}})
            })    
    }
    Object.values(square).forEach(x=>{if(x.offsetTop>(canvasTop+canvasHeight-20)){lost=true}})
    if(lost){lose()}
}
function brickWave(){
    let brickWall=[]
    let brickNumber=Math.floor(canvasHeight/20)
    let mainBrick=document.createElement('div')
    canvas.appendChild(mainBrick)
    mainBrick.className='brick'
    mainBrick.style.top=canvasTop+'px'
    mainBrick.style.left=(canvasLeft+canvasWidth-20)+'px'
    brickWall.push(mainBrick)
    for(let i=0; i<brickNumber-1;i++){
        let brick=document.createElement('div')
        canvas.appendChild(brick)
        brick.className='brick'
        brick.style.top=(mainBrick.offsetTop+(i+1)*20)+'px'
        brick.style.left=mainBrick.offsetLeft+'px'
        brickWall.push(brick)
    }
    let brickGapIndex=Math.floor(Math.random()*(brickWall.length-brickGapLength))
    for(let i=0; i<brickGapLength;i++){
        brickWall[brickGapIndex+i].remove()
    }
    if(speedChange){
        brickWaveSpeed-=200
        brickWallSpeed-=10
        end()
        begin()
        speedChange=false
    }
    }
function brickWall(){
        let passed=false
        let lost=false
        let bricks=document.querySelectorAll('.brick')
        if(bricks){
            Object.values(bricks).forEach(x=>{
                x.style.left=(x.offsetLeft-20)+'px'
                if(x.offsetLeft<canvasLeft){x.remove();passed=true}
                if(x){
                    Object.values(square).forEach(y=>{if(x.offsetTop===y.offsetTop&&x.offsetLeft===y.offsetLeft){lost=true}})
                    }
            })
        }
        if(passed){
            scoreSound.currentTime=0
            scoreSound.play()
            scoreUp()
            if(score%scoreThreshold===0
                &&brickWallSpeed>100
                &&brickWaveSpeed>3000
                ){speedChange=true}
            }
        if(lost){lose()}
    }
function foodDefault(){
    let bricks=document.querySelectorAll('.brick')
    food.style.top=canvasTop+Math.floor(Math.random()*(canvasHeight/20))*20+'px'
    food.style.left=canvasLeft+Math.floor(Math.random()*(canvasWidth/20))*20+'px'
    Object.values(square).forEach(x=>{if(x&&x.offsetTop===food.offsetTop&&x.offsetLeft===food.offsetLeft){foodDefault()}})
    if(bricks){Object.values(bricks).forEach(x=>{if(x&&x.offsetTop===food.offsetTop&&x.offsetLeft===food.offsetLeft){foodDefault()}})}
    if(mode==='super'){
        Object.values(foe).forEach(x=>{if(x&&x.offsetTop===food.offsetTop&&x.offsetLeft===food.offsetLeft){foodDefault()}})
        switch(Math.floor(Math.random()*4+1)){
            case 1:{foodType='strong'
                    food.style.backgroundImage="url('./texture/foodStrong.png')"
                    break}
            case 2:{foodType='laser'
                    food.style.backgroundImage="url('./texture/foodLaser.png')"
                    break}
            case 3:{foodType='bomb'
                    food.style.backgroundImage="url('./texture/foodBomb.png')"
                    break}
            case 4:{foodType='mind'
                    food.style.backgroundImage="url('./texture/foodMind.png')"
                    break}
            default:{console.log('food err')}
        }
    }
    return
    }
function begin(){
    if(mode==='angry'){
        brickWaveIndex=setInterval(brickWave,brickWaveSpeed)
        brickWallIndex=setInterval(brickWall,brickWallSpeed)
    }else{
        if(brickStorm){
            if(brickStormHorizontal){
                brickStormHorizontalWave()
                brickWaveIndex=setInterval(brickStormHorizontalWave,brickWaveSpeed)
                brickWallIndex=setInterval(brickStormHorizontalWall,brickWallSpeed) 
            }else{
                brickStormVerticalWave()
                brickWaveIndex=setInterval(brickStormVerticalWave,brickWaveSpeed)
                brickWallIndex=setInterval(brickStormVerticalWall,brickWallSpeed) 
            }   
        }
    }
    document.body.addEventListener('keydown',keydown,false)
    runIndex=setInterval(run,speed)
    blinkIndex=setInterval(blink,blinkDelay)
    if(mode==='super'){
        foeRunIndex=setInterval(function(){
            if(foeSuperStrong||superStrong||foeLaserEye||laserEye||foeBombEater||bombEater||foeMindControl){foeRun(main)}
            else{foeRun(food)}
            },foeSpeed)
        foeBlinkIndex=setInterval(foeBlink,foeBlinkDelay)
        explosionIndex=setInterval(explosion,explosionDelay)    
    }
    window.addEventListener('touchstart',touchStart,false)
    window.addEventListener('touchend',touchEnd,false)
    }
function end(){
    document.body.removeEventListener('keydown',keydown,false)
    if(runIndex){clearInterval(runIndex)}
    if(blinkIndex){clearInterval(blinkIndex)}
    if(foeRunIndex){clearInterval(foeRunIndex)}
    if(foeBlinkIndex){clearInterval(foeBlinkIndex)}
    if(explosionIndex){clearInterval(explosionIndex)}
    if(brickWaveIndex){clearInterval(brickWaveIndex)}
    if(brickWallIndex){clearInterval(brickWallIndex)}
    window.removeEventListener('touchstart',touchStart,false)
    window.removeEventListener('touchend',touchEnd,false)
    time.style.animation=''
    }
function setCanvas(){
    if(window.innerWidth>1000){
        canvasHeight=Math.ceil(window.innerHeight/20)*20 
        canvasWidth=Math.ceil((window.innerWidth/20)*5/6)*20 
        canvasTop=0 
        canvasLeft=0
        display.style.display='block'
        display.style.top=canvasTop+'px'
        display.style.left=(canvasLeft+canvasWidth+20)+'px'
        display.style.height=canvasHeight+'px'
        display.style.width=(window.innerWidth-display.offsetLeft-20)+'px'
        if(style==='timer'){
            description.textContent=`Try to get ${winCondition} points within ${timeCondition/1000} seconds`
        }else{
            if(mode==='normal'){description.textContent=`Just eat`}
            if(mode==='zombie'){description.textContent=`Reverse keydown. Zombie must eat every ${zombieCondition/1000} seconds`}
            if(mode==='war'){description.textContent=`Press space to plant bomb`}
            if(mode==='super'){description.textContent=`Food gives you super-power`}
            if(mode==='angry'){description.textContent=`Press space to jump`}
        }    
        }
    else{
        canvasHeight=Math.floor(window.innerHeight/20-2)*20 
        canvasWidth=Math.floor(window.innerWidth/20-1)*20 
        canvasTop=0 
        canvasLeft=0
        display.style.display='none'
    }
    canvas.style.top=canvasTop+'px'
    canvas.style.left=canvasLeft+'px'
    canvas.style.height=canvasHeight+'px'
    canvas.style.width=canvasWidth+'px'
    let bricks=document.querySelectorAll('.brick')
    if(bricks){Object.values(bricks).forEach(x=>x.remove())}
    let enemy=document.querySelectorAll('.enemy')
    if(enemy){Object.values(enemy).forEach(x=>x.remove())}
    let bombs=document.querySelectorAll('.bomb')
    if(bombs){Object.values(bombs).forEach(x=>x.remove())}
    foe=document.querySelectorAll('.foe')
    Object.values(foe).forEach(x=>x.style.display='none')
    let lasers=document.querySelectorAll('.laser')
    if(lasers){Object.values(lasers).forEach(x=>x.remove())}
    }
function setDefault(){
    setCanvas()
    brickStorm=false
    switch(growthRate.value){
        case 'slow':{n=1;break}
        case 'normal':{n=2;break}
        case 'fast':{n=4;break}
        case 'super-fast':{n=8;break}
        case 'nightmare':{n=16;break}
        default:{console.log('growth rate err');break}
    }
    switch(swiftness.value){
        case 'crawl':{speed=1000;break}
        case 'walk':{speed=500;break}
        case 'run':{speed=250;break}
        case 'fly':{speed=125;break}
        case 'speedster':{speed=62.5;break}
        default:{console.log('swiftness err');break}
    }
    switch(enemyNumber.value){
        case '3':{enemyCounter=3;break}
        case '4':{enemyCounter=4;break}
        case '5':{enemyCounter=5;break}
        default:{console.log('enemy number err');break}
    }
    switch(enemySpeed.value){
        case 'normal':{foeSpeed=200;break}
        case 'fast':{foeSpeed=100;break}
        case 'super-fast':{foeSpeed=50;break}
        default:{console.log('enemy speed err');break}
    }
    switch(map.value){
        case 'none':{break}
        case '| | |':{
            let topIndent=20*2, leftIndent=20*2
            let brickNumber=Math.floor((canvasHeight-2*topIndent)/20)
            let firstBrick=document.createElement('div')
            canvas.appendChild(firstBrick)
            firstBrick.className='brick'
            firstBrick.style.top=canvasTop+topIndent+'px'
            firstBrick.style.left=canvasLeft+leftIndent+'px'
            for(let i=0; i<brickNumber-1; i++){
                let brick=document.createElement('div')
                canvas.appendChild(brick)
                brick.className='brick'
                brick.style.top=(firstBrick.offsetTop+20*(i+1))+'px'
                brick.style.left=firstBrick.offsetLeft+'px'
            }  
            let lastBrick=document.createElement('div')
            canvas.appendChild(lastBrick)
            lastBrick.className='brick'
            lastBrick.style.top=canvasTop+topIndent+'px'
            lastBrick.style.left=(canvasLeft+canvasWidth-20-leftIndent)+'px'
            for(let i=0; i<brickNumber-1; i++){
                let brick=document.createElement('div')
                canvas.appendChild(brick)
                brick.className='brick'
                brick.style.top=(lastBrick.offsetTop+20*(i+1))+'px'
                brick.style.left=lastBrick.offsetLeft+'px'
            }
            let middleBrick=document.createElement('div')
            canvas.appendChild(middleBrick)
            middleBrick.className='brick'
            middleBrick.style.top=canvasTop+topIndent+'px'
            middleBrick.style.left=Math.floor(((firstBrick.offsetLeft+lastBrick.offsetLeft)/2)/20)*20+'px'
            for(let i=0; i<brickNumber-1; i++){
                let brick=document.createElement('div')
                canvas.appendChild(brick)
                brick.className='brick'
                brick.style.top=(middleBrick.offsetTop+20*(i+1))+'px'
                brick.style.left=middleBrick.offsetLeft+'px'
            }         
            break}
        case 'H':{
            let topIndent=20*2, leftIndent=20*2
            let brickNumber=Math.floor((canvasHeight-2*topIndent)/20)
            let firstBrick=document.createElement('div')
            canvas.appendChild(firstBrick)
            firstBrick.className='brick'
            firstBrick.style.top=canvasTop+topIndent+'px'
            firstBrick.style.left=canvasLeft+leftIndent+'px'
            for(let i=0; i<brickNumber-1; i++){
                let brick=document.createElement('div')
                canvas.appendChild(brick)
                brick.className='brick'
                brick.style.top=(firstBrick.offsetTop+20*(i+1))+'px'
                brick.style.left=firstBrick.offsetLeft+'px'
            }  
            let lastBrick=document.createElement('div')
            canvas.appendChild(lastBrick)
            lastBrick.className='brick'
            lastBrick.style.top=canvasTop+topIndent+'px'
            lastBrick.style.left=(canvasLeft+canvasWidth-20-leftIndent)+'px'
            for(let i=0; i<brickNumber-1; i++){
                let brick=document.createElement('div')
                canvas.appendChild(brick)
                brick.className='brick'
                brick.style.top=(lastBrick.offsetTop+20*(i+1))+'px'
                brick.style.left=lastBrick.offsetLeft+'px'
            }
            let length=0
            while(length<lastBrick.offsetLeft-firstBrick.offsetLeft){
                length+=20
                let brick=document.createElement('div')
                canvas.appendChild(brick)
                brick.className='brick'
                brick.style.top=(canvasTop+Math.floor((canvasHeight/2)/20)*20)+'px'
                brick.style.left=(firstBrick.offsetLeft+length)+'px'
            }
            break}
        case 'brick-storm':{
            brickStorm=true
            break}
        default:{console.log('map err');break}
    }
    if(mode==='war'){n=1;unbound.checked=true}
    if(mode==='super'){n=0;unbound.checked=true}
    square = document.querySelectorAll('.square')
    Object.values(square).forEach((x,i)=>{if(i>2){x.remove()}})
    while(square.length<3){
        let newSquare=document.createElement('div')
        canvas.appendChild(newSquare)
        newSquare.className='square'
        square = document.querySelectorAll('.square')
    }
    square = document.querySelectorAll('.square')
    Object.values(square).forEach(x=>x.style.animation='')
    action=new Array(square.length+n+5)
    position=new Array(square.length+n+5)
    score=0
    now=0
    isRunning=true
    stop=false
    point.textContent=`Score: ${score}`
    time.textContent='00:00'
    time.style.animation=''
    emo.style.display='none'
    eyeBall.style.display='block'
    Object.values(square).forEach(x=>{
        if(mode==='angry'){x.style.top=Math.floor((canvasTop+canvasHeight/4)/20)*20+'px'}
        else{x.style.top=canvasTop+'px'}
        x.style.left=canvasLeft+'px'})
    for(let i=0; i<square.length; i++){
        add(action,move.right)
        action.forEach((x,i)=>{if(x){x(square[i])}})
        draw()
        add(position,{top:main.offsetTop,left:main.offsetLeft})
        }
    foodDefault()
    foodNear=false
    freeze=false,superStrong=false,laserEye=false,bombEater=false,mindControl=false
    foeBlockUp=false,foeBlockDown=false,foeBlockLeft=false,foeBlockRight=false,foeStop=false
    foeSuperStrong=false,foeLaserEye=false,foeBombEater=false,foeMindControl=false
    press=false,brickStormHorizontal=true,waveChange=false,waveCount=0,brickWallSpeed=200,brickWaveSpeed=5000
    stopPlaySound()
    if(mode==='zombie'){
        zombieSound.play()
        zombieDuration=0
        feature.style.display='block'
        feature.textContent='Zombie-Time:'
        Object.values(square).forEach(x=>{if(x){x.style.backgroundColor='purple'}})
        eyeBall.style.backgroundColor='red'
        emo.style.color='red'
        canvas.style.backgroundImage="url('./texture/bgZombie.png')"
        food.style.backgroundImage="url('./texture/foodZombie.png')"
    }else if(mode==='war'){
        warSound.play()
        bomb=0
        feature.style.display='block'
        feature.textContent='Bomb-Count:'
        for(let i=0; i<enemyCounter; i++){
            let newEnemy=document.createElement('div')
            canvas.appendChild(newEnemy)
            newEnemy.className='enemy'
            enemyDefault(newEnemy)
        }
        Object.values(square).forEach(x=>{if(x){x.style.backgroundColor='green'}})
        eyeBall.style.backgroundColor='black'
        emo.style.color='black'
        canvas.style.backgroundImage="url('./texture/bgWar.jpg')"
        food.style.backgroundImage="url('./texture/foodWar.png')"
    }else if(mode==='super'){
        superSound.play()
        feature.style.display='block'
        feature.textContent='Super-Power:'
        foeAction=new Array(foe.length)
        foePosition=new Array(foe.length)
        Object.values(foe).forEach(x=>{x.style.display='block';x.style.animation=''})
        Object.values(foe).forEach(x=>{x.style.top=(canvasTop+canvasHeight-20)+'px';x.style.left=(canvasLeft+canvasWidth-20)+'px'})
        for(let i=0; i<foe.length; i++){
            add(foeAction,move.left)
            foeAction.forEach((x,i)=>{if(x){x(foe[i])}})
            foeDraw(food)
            add(foePosition,{top:foeMain.offsetTop,left:foeMain.offsetLeft})
            }
        Object.values(foe).forEach(x=>{if(x){x.style.backgroundColor='lightsalmon'}})
        foeEmo.style.display='none'
        foeEmo.style.color='black'    
        foeEyeBall.style.display='block'    
        foeEyeBall.style.backgroundColor='black'
        Object.values(square).forEach(x=>{if(x){x.style.backgroundColor='lightcoral'}})
        eyeBall.style.backgroundColor='black'
        emo.style.color='black'
        canvas.style.backgroundImage="url('./texture/bgSuper.png')"
    }else if(mode==='angry'){
        angrySound.play()
        feature.style.display='none'
        brickWave()
        speed=50
        food.style.left='-999px'
        Object.values(square).forEach(x=>{if(x){x.style.backgroundColor='lightcoral'}})
        eyeBall.style.backgroundColor='black'
        emo.style.color='black'
        eyeSparkle.style.display='none'
        eyeBall.style.width='5px'
        eyeBall.style.height='5px'
        eyeBall.style.top='5px'
        eyeBall.style.left='5px'
        canvas.style.backgroundImage="url('./texture/bgAngry.png')"
    }else{
        normalSound.play()
        feature.style.display='none'
        Object.values(square).forEach(x=>{if(x){x.style.backgroundColor='lightcoral'}})
        eyeBall.style.backgroundColor='black'
        emo.style.color='black'
        canvas.style.backgroundImage="url('./texture/bgNormal.jpg')"
        food.style.backgroundImage="url('./texture/foodNormal.png')"
        }
    end()
    begin()
    }
function updateScore(){
    let newHighScore=false
    if(mode==='normal'&&highScoreNormal){
        highScoreNormal.forEach(x=>{
            let topScore=x.split('/')[0]
            if(score>Number(topScore)){newHighScore=true}})
        if(newHighScore){
            alert('you have new high score')
            let a=new Date
            let time=a.getTime()
            add(highScoreNormal,`${score}/${time}`)
            highScoreNormal.sort((a,b)=>{return (Number(b.split('/')[0])-Number(a.split('/')[0]))})
            let data={normal:highScoreNormal.toString()}
            fetch('https://5e0ee98d9576aa00146661f4.mockapi.io/highScore/1',{
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res=>{
                    if(res.ok){console.log('highScore updated')}
                    else{console.log('highScore failed')}
                })
        }
    }
    if(mode==='zombie'&&highScoreZombie){
        highScoreZombie.forEach(x=>{
            let topScore=x.split('/')[0]
            if(score>Number(topScore)){newHighScore=true}})
        if(newHighScore){
            alert('you have new high score')
            let a=new Date
            let time=a.getTime()
            add(highScoreZombie,`${score}/${time}`)
            highScoreZombie.sort((a,b)=>{return (Number(b.split('/')[0])-Number(a.split('/')[0]))})
            let data={zombie:highScoreZombie.toString()}
            fetch('https://5e0ee98d9576aa00146661f4.mockapi.io/highScore/1',{
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res=>{
                    if(res.ok){console.log('highScore updated')}
                    else{console.log('highScore failed')}
                })
        }
    }
    if(mode==='war'&&highScoreWar){
        highScoreWar.forEach(x=>{
            let topScore=x.split('/')[0]
            if(score>Number(topScore)){newHighScore=true}})
        if(newHighScore){
            alert('you have new high score')
            let a=new Date
            let time=a.getTime()
            add(highScoreWar,`${score}/${time}`)
            highScoreWar.sort((a,b)=>{return (Number(b.split('/')[0])-Number(a.split('/')[0]))})
            let data={war:highScoreWar.toString()}
            fetch('https://5e0ee98d9576aa00146661f4.mockapi.io/highScore/1',{
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res=>{
                    if(res.ok){console.log('highScore updated')}
                    else{console.log('highScore failed')}
                })
        }
    }
    if(mode==='super'&&highScoreSuper){
        highScoreSuper.forEach(x=>{
            let topScore=x.split('/')[0]
            if(score>Number(topScore)){newHighScore=true}})
        if(newHighScore){
            alert('you have new high score')
            let a=new Date
            let time=a.getTime()
            add(highScoreSuper,`${score}/${time}`)
            highScoreSuper.sort((a,b)=>{return (Number(b.split('/')[0])-Number(a.split('/')[0]))})
            let data={super:highScoreSuper.toString()}
            fetch('https://5e0ee98d9576aa00146661f4.mockapi.io/highScore/1',{
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res=>{
                    if(res.ok){console.log('highScore updated')}
                    else{console.log('highScore failed')}
                })
        }
    }
    if(mode==='angry'&&highScoreAngry){
        highScoreAngry.forEach(x=>{
            let topScore=x.split('/')[0]
            if(score>Number(topScore)){newHighScore=true}})
        if(newHighScore){
            alert('you have new high score')
            let a=new Date
            let time=a.getTime()
            add(highScoreAngry,`${score}/${time}`)
            highScoreAngry.sort((a,b)=>{return (Number(b.split('/')[0])-Number(a.split('/')[0]))})
            let data={angry:highScoreAngry.toString()}
            fetch('https://5e0ee98d9576aa00146661f4.mockapi.io/highScore/1',{
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res=>{
                    if(res.ok){console.log('highScore updated')}
                    else{console.log('highScore failed')}
                })
        }
    }
    }
function stopPlaySound(){
    normalSound.pause()
    normalSound.currentTime=0
    zombieSound.pause()
    zombieSound.currentTime=0
    warSound.pause()
    warSound.currentTime=0
    superSound.pause()
    superSound.currentTime=0
    angrySound.pause()
    angrySound.currentTime=0
    laserSound.pause()
    laserSound.currentTime=0
    mindControlSound.pause()
    mindControlSound.currentTime=0
    }
function lose(){
    if(!stop){
        end()
        isRunning=false
        stop=true
        setTimeout(function(){
            alert("you've lost")
            updateScore()
        },100)
        if(mode==='angry'){
            hitSound.play()
            fallSound.play()
            if(main.offsetTop>canvasTop+canvasHeight-20){Object.values(square).forEach(x=>x.style.top=(canvasTop+canvasHeight-20)+'px')}
            else{
                let bricks=document.querySelectorAll('.brick')
                Object.values(bricks).forEach(x=>x.style.left=(x.offsetLeft+20)+'px')
            }
            Object.values(square).forEach(x=>x.style.animation='Angrylose 2s')
            setTimeout(function(){Object.values(square).forEach(x=>x.style.top=(x.offsetTop+2000)+'px')},1000)
        }else{
            if(!foeMindControl){stepBack()}
            if(brickStorm){
                let bricks=document.querySelectorAll('.brick')
                if(brickStormHorizontal){Object.values(bricks).forEach(x=>x.style.left=(x.offsetLeft+20)+'px')}
                else{Object.values(bricks).forEach(x=>x.style.top=(x.offsetTop-20)+'px')}
            }
        }
        emo.textContent='X'
        emo.style.top='-1px'
        emo.style.left='3px'
        emo.style.display='block'
        eyeBall.style.display='none'
        description.textContent='Click anywhere to return menu'
        window.addEventListener('click',function resetClick(){
            menu.style.display='flex'
            game.style.display='none'
            stopPlaySound()
            menuSound.play()            
            window.removeEventListener('click',resetClick,false)
        },false)
    }
    }
function win(){
    if(!stop){
        end()
        isRunning=false
        stop=true
        emo.textContent='^'
        emo.style.top='1px'
        emo.style.left='3px'
        emo.style.display='block'
        eyeBall.style.display='none'
        description.textContent='Click anywhere to return menu'
        alert("you've won")
        updateScore()
        window.addEventListener('click',function resetClick(){
            menu.style.display='flex'
            game.style.display='none'
            stopPlaySound()
            menuSound.play()            
            window.removeEventListener('click',resetClick,false)
        },false)
    }
    }
pause.addEventListener('click',function(){
    if(!stop){
        if(isRunning){
            isRunning=!isRunning
            end()
            modalMenu.style.display='block'
        }else{
            isRunning=!isRunning
            begin()
            modalMenu.style.display='none'
        }
    }
    },false)
reset.addEventListener('click',function(){
    modalMenu.style.display='none'
    setDefault()
    },false)
exit.addEventListener('click',function(){
    end()
    isRunning=false
    stop=true
    modalMenu.style.display='none'
    game.style.display='none'
    menu.style.display='flex'
    stopPlaySound()
    menuSound.play()
    },false)
start.addEventListener('click',function(){
    gameMode.style.display='block'
    },false)
window.addEventListener('click',function(e){
    if(e.target===modalSound){
        if(!stop){modalMenu.style.display='block'}
        modalSound.style.display='none'}
    if(e.target===modalHighScore){modalHighScore.style.display='none'}
    if(e.target===gameMode){gameMode.style.display='none'}
    if(e.target===gameStyle){gameStyle.style.display='none'}
    if(e.target===modalMenu){modalMenu.style.display='none' ; pause.click()}
    },false)
modeNormal.addEventListener('click',function(){
    mode='normal'
    gameMode.style.display='none'
    gameStyle.style.display='block'
    labelGrowthRate.style.display='block'
    labelSwiftness.style.display='block'
    labelEnemyNumber.style.display='none'
    labelEnemySpeed.style.display='none'
    labelMap.style.display='block'
    labelUnbound.style.display='block'
    swiftCrawl.style.display='block'
    swiftWalk.style.display='block'
    swiftRun.style.display='block'
    swiftFly.style.display='block'
    swiftSpeedster.style.display='block'
    swiftRun.selected='true'
    mapBrickStorm.style.display='none'
    mapNone.selected='true'
    },false)
modeZombie.addEventListener('click',function(){
    mode='zombie'
    gameMode.style.display='none'
    gameStyle.style.display='block'
    labelGrowthRate.style.display='block'
    labelSwiftness.style.display='block'
    labelEnemyNumber.style.display='none'
    labelEnemySpeed.style.display='none'
    labelMap.style.display='block'
    labelUnbound.style.display='block'
    swiftCrawl.style.display='block'
    swiftWalk.style.display='block'
    swiftRun.style.display='block'
    swiftFly.style.display='block'
    swiftSpeedster.style.display='block'
    swiftRun.selected='true'
    mapBrickStorm.style.display='none'
    mapNone.selected='true'
    },false)
modeWar.addEventListener('click',function(){
    mode='war'
    gameMode.style.display='none'
    gameStyle.style.display='block'
    labelGrowthRate.style.display='none'
    labelSwiftness.style.display='block'
    labelEnemyNumber.style.display='block'
    labelEnemySpeed.style.display='none'
    labelMap.style.display='block'
    labelUnbound.style.display='none'
    swiftCrawl.style.display='none'
    swiftWalk.style.display='block'
    swiftRun.style.display='block'
    swiftFly.style.display='block'
    swiftSpeedster.style.display='none'
    swiftRun.selected='true'
    mapBrickStorm.style.display='block'
    mapNone.selected='true'
    },false)
modeSuper.addEventListener('click',function(){
    mode='super'
    gameMode.style.display='none'
    gameStyle.style.display='block'
    labelGrowthRate.style.display='none'
    labelSwiftness.style.display='block'
    labelEnemyNumber.style.display='none'
    labelEnemySpeed.style.display='block'
    labelMap.style.display='block'
    labelUnbound.style.display='none'
    swiftCrawl.style.display='none'
    swiftWalk.style.display='none'
    swiftRun.style.display='block'
    swiftFly.style.display='block'
    swiftSpeedster.style.display='block'
    swiftRun.selected='true'
    mapBrickStorm.style.display='block'
    mapNone.selected='true'
    },false)
modeAngry.addEventListener('click',function(){
    mode='angry'
    mapNone.selected='true'
    style='survivor'
    gameMode.style.display='none'
    gameStyle.style.display='none'
    menu.style.display='none'
    game.style.display='block'
    menuSound.pause()
    menuSound.currentTime=0
    setDefault()
    },false)
styleSurvivor.addEventListener('click',function(){
    style='survivor'
    gameMode.style.display='none'
    gameStyle.style.display='none'
    menu.style.display='none'
    game.style.display='block'
    menuSound.pause()
    menuSound.currentTime=0
    setDefault()
    },false)
styleTimer.addEventListener('click',function(){
    style='timer'
    gameMode.style.display='none'
    gameStyle.style.display='none'
    menu.style.display='none'
    game.style.display='block'
    menuSound.pause()
    menuSound.currentTime=0
    setDefault()
    },false)
Object.values(sound).forEach(x=>{
    x.addEventListener('click',function(){
        if(!stop){modalMenu.style.display='none'}
        modalSound.style.display='block'
    },false)
    })
volume.addEventListener('input',function(){
    menuSound.volume=volume.value/100
    normalSound.volume=volume.value/100
    zombieSound.volume=volume.value/100
    warSound.volume=volume.value/100
    superSound.volume=volume.value/100
    angrySound.volume=volume.value/100
    explosionSound.volume=volume.value/100
    superStrongSound.volume=volume.value/100
    laserSound.volume=volume.value/100
    largeExplosionSound.volume=volume.value/100
    mindControlSound.volume=volume.value/100
    freezeSound.volume=volume.value/100
    hitSound.volume=volume.value/100
    scoreSound.volume=volume.value/100
    fallSound.volume=volume.value/100
    flySound.volume=volume.value/100
    foeSadSound.volume=volume.value/100
    foeDeadStrongSound.volume=volume.value/100
    foeDeadLaserSound.volume=volume.value/100
    foeDeadBombSound.volume=volume.value/100
    foeDeadMindSound.volume=volume.value/100
    disappointSound.volume=volume.value/100
    happySound1.volume=volume.value/100
    happySound2.volume=volume.value/100
    happySound3.volume=volume.value/100
    happySound4.volume=volume.value/100
    happySound5.volume=volume.value/100
    pointSound.volume=volume.value/100
    volumeDisplay.textContent=`Volume: ${volume.value}`
    },false)
highScore.addEventListener('click',function(){
    modalHighScore.style.display='block'
    Object.values(tabContent.children).forEach(x=>x.innerHTML='')
    if(highScoreNormal){highScoreNormal.forEach((x,i)=>{
        let a=new Date(Number(x.split('/')[1]))
        tabContent.children[0].innerHTML+=`${i+1}) ${x.split('/')[0]} <br /> ${x.split('/')[1]==='0'?'none':a.toDateString()} <br />`})}
    if(highScoreZombie){highScoreZombie.forEach((x,i)=>{
        let a=new Date(Number(x.split('/')[1]))
        tabContent.children[1].innerHTML+=`${i+1}) ${x.split('/')[0]} <br /> ${x.split('/')[1]==='0'?'none':a.toDateString()} <br />`})}
    if(highScoreWar){highScoreWar.forEach((x,i)=>{
        let a=new Date(Number(x.split('/')[1]))
        tabContent.children[2].innerHTML+=`${i+1}) ${x.split('/')[0]} <br /> ${x.split('/')[1]==='0'?'none':a.toDateString()} <br />`})}
    if(highScoreSuper){highScoreSuper.forEach((x,i)=>{
        let a=new Date(Number(x.split('/')[1]))
        tabContent.children[3].innerHTML+=`${i+1}) ${x.split('/')[0]} <br /> ${x.split('/')[1]==='0'?'none':a.toDateString()} <br />`})}
    if(highScoreAngry){highScoreAngry.forEach((x,i)=>{
        let a=new Date(Number(x.split('/')[1]))
        tabContent.children[4].innerHTML+=`${i+1}) ${x.split('/')[0]} <br /> ${x.split('/')[1]==='0'?'none':a.toDateString()} <br />`})}
    },false)

let tabButton=document.querySelector('.tab-button')
let tabContent=document.querySelector('.tab-content')
    for(let i=0; i<tabButton.children.length;i++){
        tabButton.children[i].addEventListener('click',function(e){  
            Object.values(tabButton.children).forEach(element=>element.className=element.className.replace('active',''))
            Object.values(tabContent.children).forEach(element=>element.className=element.className.replace('active',''))
            e.target.className+=' active'
            tabContent.children[i].className+=' active'
        },false)
    }
document.getElementById('tab-default').click()

let highScoreNormal,highScoreZombie,highScoreWar,highScoreSuper,highScoreAngry
fetch('https://5e0ee98d9576aa00146661f4.mockapi.io/highScore/1',{method:'GET'})
    .then(res=>res.json())
    .then(res=>{
        highScoreNormal=res.normal.split(',')
        highScoreZombie=res.zombie.split(',')
        highScoreWar=res.war.split(',')
        highScoreSuper=res.super.split(',')
        highScoreAngry=res.angry.split(',')
    })

let menuSound= new Audio('./sound/mainTrack.mp3')
menuSound.loop=true
let normalSound= new Audio('./sound/normal.mp3')
normalSound.loop=true
let zombieSound= new Audio('./sound/zombie.mp3')
zombieSound.loop=true
let warSound= new Audio('./sound/war.mp3')
warSound.loop=true
let superSound= new Audio('./sound/super.mp3')
superSound.loop=true
let angrySound= new Audio('./sound/angry.mp3')
angrySound.loop=true

window.addEventListener('click',function playMenuSound(){
    menuSound.play()
    window.removeEventListener('click',playMenuSound,false)
    },false)

let explosionSound=new Audio('./sound/explosion.mp3')
explosionSound.loop=false
let superStrongSound=new Audio('./sound/superStrong.mp3')
superStrongSound.loop=false
let laserSound= new Audio('./sound/laser.mp3')
laserSound.loop=true
let largeExplosionSound=new Audio('./sound/largeExplosion.mp3')
largeExplosionSound.loop=false
let mindControlSound=new Audio('./sound/mindControl.mp3')
mindControlSound.loop=false
let freezeSound=new Audio('./sound/freeze.mp3')
freezeSound.loop=false
let hitSound=new Audio('./sound/hit.wav')
hitSound.loop=false
let scoreSound=new Audio('./sound/score.wav')
scoreSound.loop=false
let fallSound=new Audio('./sound/fall.wav')
fallSound.loop=false
let flySound=new Audio('./sound/fly.wav')
flySound.loop=false
let foeSadSound=new Audio('./sound/foeSad.mp3')
foeSadSound.loop=false
let foeDeadStrongSound=new Audio('./sound/foeDeadStrong.mp3')
foeDeadStrongSound.loop=false
let foeDeadLaserSound=new Audio('./sound/foeDeadLaser.mp3')
foeDeadLaserSound.loop=false
let foeDeadBombSound=new Audio('./sound/foeDeadBomb.mp3')
foeDeadBombSound.loop=false
let foeDeadMindSound=new Audio('./sound/foeDeadMind.mp3')
foeDeadMindSound.loop=false
let disappointSound=new Audio('./sound/disappoint.mp3')
disappointSound.loop=false
let happySound1=new Audio('./sound/happy1.mp3')
happySound1.loop=false
let happySound2=new Audio('./sound/happy2.mp3')
happySound2.loop=false
let happySound3=new Audio('./sound/happy3.mp3')
happySound3.loop=false
let happySound4=new Audio('./sound/happy4.mp3')
happySound4.loop=false
let happySound5=new Audio('./sound/happy5.mp3')
happySound5.loop=false
let pointSound=new Audio('./sound/point.mp3')
pointSound.loop=false

let touchStartX=0,touchStartY=0,touchEndX=0,touchEndY=0
let touchThreshold=window.innerWidth/20
function touchStart(e){
    touchStartX=e.changedTouches[0].screenX
    touchStartY=e.changedTouches[0].screenY
    }
function touchEnd(e){
    touchEndX=e.changedTouches[0].screenX
    touchEndY=e.changedTouches[0].screenY
    let spaceX=touchEndX-touchStartX
    let spaceY=touchEndY-touchStartY
    if(!foeMindControl){
        if(mode==='angry'){
            if(Math.abs(spaceX)<=touchThreshold&&Math.abs(spaceY)<=touchThreshold){angryKeydown()}
        }else{
            if(spaceY<-touchThreshold){keydownUp()}
            if(spaceY>touchThreshold){keydownDown()}    
            if(spaceX<-touchThreshold){keydownLeft()}
            if(spaceX>touchThreshold){keydownRight()}    
            if(Math.abs(spaceX)<=touchThreshold&&Math.abs(spaceY)<=touchThreshold){if(mode==='war'){warKeydown()}}
            }    
        }
    }

