alert("happy birthday Shubam sirs mother")
alert("hello Vaidus");
function slideleft() {
    document.querySelector("#app").style.transform = "translateX(-50%)";
}
function slideright() {
    document.querySelector("#app").style.transform = "translateX(0%)";
}


function showform() {
    document.querySelector("#exp-form").style.display = "block";
}

function updatebudget() {
    var expenses = document.querySelector("#total-exp").innerText;
    expenses = expenses.replace("₹", "");
    expenses = parseInt(expenses);
    var b = document.querySelector("#budget").value;
    if (b == 0) {
        alert("please enter a budget");
    }else if (b >= 50000) {
        alert("you are'nt a rich guy bro");
    } else {
        var finalb = b - expenses;  
        document.querySelector("#total-budget").innerText = "₹" + b;
        localStorage.setItem("budgetshow", "₹" + b);
        localStorage.setItem("rbudgetshow", "₹" + finalb);
        document.querySelector("#remaining-budget").innerText = "₹" + finalb;
        if (finalb <= 0) {
            
            alert("nah bro you are out of budget");
        }
    }
    
}

var currentexp = 0;
var sunMoney = 0;
var monMoney = 0;
var tueMoney = 0;
var wedMoney = 0;
var thuMoney = 0;
var friMoney = 0;
var satMoney = 0;
var clothsMoney = 0;
var techMoney = 0;
var foodMoney = 0;
var travelMoney = 0;
var otherMoney = 0;

function setbar(id, money, max) {
    var b = document.getElementById(id);
    var h = 20;
    if (max > 0) {
        h = 20 + (money / max) * 140;
    }
    b.style.height = h + "px";
    b.title = "₹" + money;
}

function addexp() {
    var cost = document.querySelector("#cost").value;
    var cat = document.querySelector("#catagory").value;
    var date = document.querySelector("#date").value;
    var finalb = document.querySelector("#remaining-budget").innerText;
    finalb = finalb.replace("₹", "");
    finalb = parseInt(finalb);
    if (cost <= 0 || date == 0) {
        alert("please enter valid cost and date");
    } else if (cost>finalb) {
      
        alert("budget issue bro you still need " + Math.abs(cost-finalb));
        document.querySelector("#cost").value = "";
    }else {
        currentexp += Number(cost);
        document.getElementById("total-exp").innerText = "₹" + currentexp;

        var list = document.querySelector("#past-exp");
        list.innerHTML = list.innerHTML + "<p>" + cost + " " + cat + " " + date + "</p>";

        var dayNumber = new Date(date).getDay();
        if (dayNumber == 0) { sunMoney = sunMoney + Number(cost); }
        else if (dayNumber == 1) { monMoney = monMoney + Number(cost); }
        else if (dayNumber == 2) { tueMoney = tueMoney + Number(cost); }
        else if (dayNumber == 3) { wedMoney = wedMoney + Number(cost); }
        else if (dayNumber == 4) { thuMoney = thuMoney + Number(cost); }
        else if (dayNumber == 5) { friMoney = friMoney + Number(cost); }
        else { satMoney = satMoney + Number(cost); }

        if (cat == "food") { foodMoney = foodMoney + Number(cost); }
        else if (cat == "travel") { travelMoney = travelMoney + Number(cost); }
        else { otherMoney = otherMoney + Number(cost); }

        scalebars();
        localStorage.setItem("currentexp", currentexp);
        localStorage.setItem("pastlist", list.innerHTML);
        localStorage.setItem("sunMoney", sunMoney);
        localStorage.setItem("monMoney", monMoney);
        localStorage.setItem("tueMoney", tueMoney);
        localStorage.setItem("wedMoney", wedMoney);
        localStorage.setItem("thuMoney", thuMoney);
        localStorage.setItem("friMoney", friMoney);
        localStorage.setItem("satMoney", satMoney);
        localStorage.setItem("foodMoney", foodMoney);
        localStorage.setItem("clothsMoney", clothsMoney);
        localStorage.setItem("techMoney", techMoney);
        localStorage.setItem("travelMoney", travelMoney);
        localStorage.setItem("otherMoney", otherMoney);

        document.querySelector("#cost").value = "";
        document.querySelector("#date").value = "";
        var left = finalb - Number(cost);
        document.querySelector("#remaining-budget").innerText = "₹" + left;
    localStorage.setItem("rbudgetshow", "₹" + left);
    }
}

function loadpage() {
    var savedExp = localStorage.getItem("currentexp");
    var savedList = localStorage.getItem("pastlist");
    var savedBudget = localStorage.getItem("budgetshow");
    var savedRemainingBudget = localStorage.getItem("rbudgetshow");

    if (savedExp != null) {
        currentexp = Number(savedExp);
        document.getElementById("total-exp").innerText = "₹" + currentexp;
    }
    if (savedList != null) {
        document.querySelector("#past-exp").innerHTML = savedList;
    }
    if (savedBudget != null) {
        document.querySelector("#total-budget").innerText = savedBudget;
    }
    if (savedRemainingBudget != null) {
        document.querySelector("#remaining-budget").innerText = savedRemainingBudget;
    }
    

    if (localStorage.getItem("sunMoney") != null) { sunMoney = Number(localStorage.getItem("sunMoney")); }
    if (localStorage.getItem("monMoney") != null) { monMoney = Number(localStorage.getItem("monMoney")); }
    if (localStorage.getItem("tueMoney") != null) { tueMoney = Number(localStorage.getItem("tueMoney")); }
    if (localStorage.getItem("wedMoney") != null) { wedMoney = Number(localStorage.getItem("wedMoney")); }
    if (localStorage.getItem("thuMoney") != null) { thuMoney = Number(localStorage.getItem("thuMoney")); }
    if (localStorage.getItem("friMoney") != null) { friMoney = Number(localStorage.getItem("friMoney")); }
    if (localStorage.getItem("satMoney") != null) { satMoney = Number(localStorage.getItem("satMoney")); }
    if (localStorage.getItem("foodMoney") != null) { foodMoney = Number(localStorage.getItem("foodMoney")); }
    if (localStorage.getItem("travelMoney") != null) { travelMoney = Number(localStorage.getItem("travelMoney")); }
    if (localStorage.getItem("clothsMoney") != null) { clothsMoney = Number(localStorage.getItem("clothsMoney")); }
    if (localStorage.getItem("techMoney") != null) { techMoney = Number(localStorage.getItem("techMoney")); }
    if (localStorage.getItem("otherMoney") != null) { otherMoney = Number(localStorage.getItem("otherMoney")); }

    scalebars();
}
function scalebars() {
    var maxDay = sunMoney;
    if (monMoney > maxDay) { maxDay = monMoney; }
    if (tueMoney > maxDay) { maxDay = tueMoney; }
    if (wedMoney > maxDay) { maxDay = wedMoney; }
    if (thuMoney > maxDay) { maxDay = thuMoney; }
    if (friMoney > maxDay) { maxDay = friMoney; }
    if (satMoney > maxDay) { maxDay = satMoney; }

    setbar("Sunday", sunMoney, maxDay);
    setbar("Monday", monMoney, maxDay);
    setbar("Tuesday", tueMoney, maxDay);
    setbar("Wenesday", wedMoney, maxDay);
    setbar("Thursday", thuMoney, maxDay);
    setbar("Fri", friMoney, maxDay);
    setbar("Saturday", satMoney, maxDay);

    var maxCat = foodMoney;
    if (travelMoney > maxCat) { maxCat = travelMoney; }
    if (otherMoney > maxCat) { maxCat = otherMoney; }

    setbar("food exp", foodMoney, maxCat);
    setbar("travel exp", travelMoney, maxCat);
    setbar("other exp", otherMoney, maxCat);
    setbar("cloths exp", clothsMoney, maxCat);
    setbar("tech exp", techMoney, maxCat);
}

function reset(){
    localStorage.clear();
    location.reload();
}
window.onload = loadpage;

    console.log("hello vaidus you found the easter egg!!!");
