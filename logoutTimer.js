// ==UserScript==
// @name         Logout Timer
// @namespace    @
// @version      1
// @description  Logout
// @author       Asalato
// @match        https://meet.google.com/*
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

GM_addStyle ( `
    #logoutTimer {
        background-color: white;
        height: inherit;
        display: flex;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 20%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        z-index: 1100;
        pointer-events: none;
    }
    #timer {
        width: 100%;
        font-size: xx-large;
        text-align: center;
        cursor: pointer;
        pointer-events: auto;
    }
    #startButton {
        position: absolute;
        top: 100%;
        left: 0%;
        width: 60%;
        cursor: pointer;
        pointer-events: auto;
    }
    #stopButton {
        position: absolute;
        top: 100%;
        right: 0%;
        width: 60%;
        cursor: pointer;
        pointer-events: auto;
    }
` );

const timerNode = document.createElement('div');
timerNode.setAttribute ('id', 'logoutTimer');
const timerInputNode = document.createElement('input');
timerInputNode.setAttribute('type', 'time');
timerInputNode.setAttribute('id', 'timer');
timerNode.appendChild(timerInputNode);

const startNode = document.createElement('div');
startNode.setAttribute ('id', 'startButton');
const startButtonNode = document.createElement('button');
startButtonNode.setAttribute('id', 'startButton');
startButtonNode.setAttribute('disabled', 'true');
startButtonNode.innerHTML = 'Start';
startNode.appendChild(startButtonNode);
timerNode.appendChild(startNode);

const stopNode = document.createElement('div');
stopNode.setAttribute ('id', 'stopButton');
const stopButtonNode = document.createElement('button');
stopButtonNode.setAttribute('id', 'stopButton');
stopButtonNode.setAttribute('disabled', 'true');
stopButtonNode.innerHTML = 'Stop';
stopNode.appendChild(stopButtonNode);
timerNode.appendChild(stopNode);

let targetTime = '';
timerInputNode.addEventListener('input', function(eve) {
    let val = eve.target.value;
    if(val === '') return;
    targetTime = val;
    stopButtonNode.disabled = true;
    startButtonNode.disabled = false;
});

let timer;
let timeRemaining = -1;
function countDown(){
    timeRemaining -= 1;
    if(timeRemaining > 0) return;
    location.reload();
}

startButtonNode.onclick = function () {
    startButtonNode.disabled = true;
    stopButtonNode.disabled = false;
    timerInputNode.disabled = true;

    const val = targetTime.split(':');
    const now = new Date();
    const nowHour = now.getHours();
    const nowMin = now.getMinutes();
    const nowSec = now.getSeconds();
    const hour = val[0];
    const min = val[1];
    timeRemaining = (hour - nowHour) * 3600 + (min - nowMin) * 60 - nowSec;
    if(timeRemaining < 0) timeRemaining += 86400;

    alert('Timer is set to ' + targetTime);
    timer = setInterval(countDown, 1000);
};
stopButtonNode.onclick = function () {
    stopButtonNode.disabled = true;
    startButtonNode.disabled = false;
    timerInputNode.disabled = false;
    clearInterval(timer);
};

let isFirst = true;
setInterval(function(){
    const _container = document.querySelector('div.pHsCke');
    if (_container && isFirst) {
        isFirst = false;
        document.querySelector('div.pHsCke').appendChild (timerNode);
    }
    else if(!_container && !isFirst){
        isFirst = true;
    }
},250);