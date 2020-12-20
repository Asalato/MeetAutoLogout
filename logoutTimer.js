let isTimer = true;

const tn = document.createElement('div');
tn.setAttribute ('id', 'logoutTimer');
const tin = document.createElement('input');
tin.setAttribute('type', 'time');
tin.setAttribute('id', 'timer');
tn.appendChild(tin);

const nin = document.createElement('input');
nin.setAttribute('type', 'number');
nin.setAttribute('id', 'number');
nin.setAttribute('min', '1');
nin.defaultValue = '1';

const stan = document.createElement('div');
stan.setAttribute ('id', 'startButton');
const stabn = document.createElement('button');
stabn.setAttribute('id', 'startButton');
stabn.innerHTML = 'Start';
stabn.disabled = true;
stan.appendChild(stabn);
tn.appendChild(stan);

const ston = document.createElement('div');
ston.setAttribute ('id', 'stopButton');
const stobn = document.createElement('button');
stobn.setAttribute('id', 'stopButton');
stobn.disabled = true;
stobn.innerHTML = 'Stop';
ston.appendChild(stobn);
tn.appendChild(ston);

const tsn = document.createElement('div');
tsn.setAttribute('id', 'timeButton');
const tsbn = document.createElement('button');
tsbn.setAttribute('id', 'timeButton');
tsbn.disabled = true;
tsbn.innerHTML = '⏲';
tsn.appendChild(tsbn);
tn.appendChild(tsn);

const nsn = document.createElement('div');
nsn.setAttribute('id', 'numberButton');
const nsbn = document.createElement('button');
nsbn.setAttribute('id', 'numberButton');
nsbn.innerHTML = '👥';
nsn.appendChild(nsbn);
tn.appendChild(nsn);

let targetTime = '';
tin.addEventListener('input', function(eve) {
    let val = eve.target.value;
    if(val === '') return;
    targetTime = val;
    stobn.disabled = true;
    stabn.disabled = false;
});

let targetNumber = 1;
nin.addEventListener('input', function(eve){
    let val = parseInt(eve.target.value);
    if(val < 1) {
        stobn.disabled = true;
        stabn.disabled = true;
        return;
    }
    targetNumber = val;
    stobn.disabled = true;
    stabn.disabled = false;
});

let timer;
let timeRemaining = -1;
function countDown(){
    timeRemaining -= 1;
    if(timeRemaining > 0) return;
    clearInterval(countDown);
    const en = document.querySelector("#ow3 > div.T4LgNb > div > div:nth-child(8) > div.crqnQb > div.rG0ybd.LCXT6 > div.q2u11 > div.s1GInc.zCbbgf > div > div.I5fjHe.wb61gb");
    if(en) en.click();
    else location.reload();
}

function checkNumber(){
    let node = document.querySelector("span.wnPUne.N0PJ8e");
    let number = parseInt(node.innerHTML);
    if(number === -1 || number > targetNumber) return;
    clearInterval(checkNumber);
    const en = document.querySelector("#ow3 > div.T4LgNb > div > div:nth-child(8) > div.crqnQb > div.rG0ybd.LCXT6 > div.q2u11 > div.s1GInc.zCbbgf > div > div.I5fjHe.wb61gb");
    if(en) en.click();
    else location.reload();
}

stabn.onclick = function () {
    stabn.disabled = true;
    stobn.disabled = false;
    nsbn.disabled = true;
    tsbn.disabled = true;

    if(isTimer) {
        tin.disabled = true;
        const val = targetTime.split(':');
        const now = new Date();
        const nowHour = now.getHours();
        const nowMin = now.getMinutes();
        const nowSec = now.getSeconds();
        const hour = val[0];
        const min = val[1];
        timeRemaining = (hour - nowHour) * 3600 + (min - nowMin) * 60 - nowSec;
        if (timeRemaining < 0) timeRemaining += 86400;

        alert('Timer set to ' + targetTime);
        timer = setInterval(countDown, 1000);
    }else{
        nin.disabled = true;
        alert('Log out when the number of participants drops below ' + targetNumber);
        timer = setInterval(checkNumber, 1000);
    }
};
stobn.onclick = function () {
    stobn.disabled = true;
    stabn.disabled = false;
    nsbn.disabled = !isTimer;
    tsbn.disabled = isTimer;
    tin.disabled = !isTimer;
    nin.disabled = isTimer;
    clearInterval(timer);
};

nsbn.onclick = function(){
    stobn.disabled = true;
    stabn.disabled = targetNumber < 1;
    nsbn.disabled = true;
    tsbn.disabled = false;
    nin.disabled = false;
    isTimer = false;
    tn.appendChild(nin);
    tn.removeChild(tin);
}

tsbn.onclick = function() {
    stobn.disabled = true;
    stabn.disabled = targetTime === '';
    nsbn.disabled = false;
    tsbn.disabled = true;
    tin.disabled = false;
    isTimer = true;
    tn.appendChild(tin);
    tn.removeChild(nin);
}

let isFirst = true;
setInterval(function(){
    const _container = document.querySelector('div.pHsCke');
    if (_container && isFirst) {
        isFirst = false;
        document.querySelector('div.pHsCke').appendChild (tn);
    }
    else if(!_container && !isFirst){
        isFirst = true;
    }
},250);
