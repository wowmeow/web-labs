let name = document.getElementById("name");
function firstLetter (string) {
    let str = string.toLowerCase();
    return str[0].toUpperCase() + str.slice(1);
};

name.oninput = function (event) {
    name.value = firstLetter(name.value)
}


var inp = document.getElementById("inp");

inp.onclick = function() {
    inp.value = "+7";
}

var old = 0;

inp.onkeydown = function() {
    var curLen = inp.value.length;

    if (curLen < old){
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

document.getElementById("inp").onkeypress= function(event){
    event= event || window.event;
    if (event.charCode && (event.charCode < 48 || event.charCode > 57))
        return false;
};

document.getElementById("name").onkeypress= function(event){
    event= event || window.event;
    if (event.charCode && (event.charCode < 58 && event.charCode > 47 ))
        return false;
};