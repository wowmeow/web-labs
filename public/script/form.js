let name = document.getElementById("name");

function firstLetter(string) {
    let str = string.toLowerCase();
    return str[0].toUpperCase() + str.slice(1);
};

name.oninput = function (event) {
    name.value = firstLetter(name.value)
}


var inp = document.getElementById("inp");

inp.onclick = function () {
    inp.value = "+7";
}

var old = 0;

inp.onkeydown = function () {
    var curLen = inp.value.length;

    if (curLen < old) {
        old--;
        return;
    }

    if (curLen == 2)
        inp.value = inp.value + "(";

    if (curLen == 6)
        inp.value = inp.value + ")-";

    if (curLen == 11)
        inp.value = inp.value + "-";

    if (curLen == 14)
        inp.value = inp.value + "-";


    old++;
}

document.getElementById("inp").onkeypress = function (event) {
    event = event || window.event;
    if (event.charCode && (event.charCode < 48 || event.charCode > 57))
        return false;
};

document.getElementById("name").onkeypress = function (event) {
    event = event || window.event;
    if (event.charCode && (event.charCode < 58 && event.charCode > 47))
        return false;
};

let subs = document.querySelectorAll(".card__price");
let month = document.querySelector(".month"),
    six_month = document.querySelector(".six_month");
year = document.querySelector(".year");

month.onclick = () => {
    subs[0].textContent = "1 300 ₽";
    subs[1].textContent = "2 800 ₽";
    subs[2].textContent = "2 800 ₽";
};

six_month.onclick = () => {
    subs[0].textContent = "7 800 ₽";
    subs[1].textContent = "16 800 ₽";
    subs[2].textContent = "16 800 ₽";
};

year.onclick = () => {
    subs[0].textContent = "15 600 ₽";
    subs[1].textContent = "33 600 ₽";
    subs[2].textContent = "33 600 ₽";
};

setInterval(() => {
    let xhrGET = new XMLHttpRequest();
    xhrGET.open(
        'GET',
        'http://localhost:7000/count',
        true
    );
    xhrGET.send();
    xhrGET.onreadystatechange = function () {
        if (xhrGET.readyState != 4) {
            return
        }
        if (xhrGET.status === 200) {
            let result = JSON.parse(xhrGET.responseText);
            let person = document.querySelector(".person__");
            let lastone = result.toString().split('').pop();
            if (lastone === "2" || lastone === "3" || lastone === "4") {
                if (result === 12 || result === 13 || result === 14) {
                    person.innerHTML = `Нас выбрали уже ${result} человек !!!`;
                } else {
                    person.innerHTML = `Нас выбрали уже ${result} человека !!!`;
                }
            } else {
                person.innerHTML = `Нас выбрали уже ${result} человек !!!`;
            }
        } else {
            console.log('err', xhrGET.responseText);
        }
    };
}, 1000);