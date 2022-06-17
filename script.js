/*
1-add li items to in progress by default --> done
2-dragable attribute for draging elements back and forth --> done
3-adding attribute for containers to reseved draged elements --> done 
----------------------------------
4-saving every element with its status in local storage
*/


//add button***********************************************
var input = document.getElementById("input");
var draggedItem;


function addElement() {
    if (input.value) {
        var item = document.createElement("li");
        item.setAttribute('draggable', true);
        item.addEventListener("dragstart", daragstartFunc)
        document.querySelector(".inProgress >.tasksSection").appendChild(item);
        item.innerText = input.value;
    }
}

function daragstartFunc(event) {
    draggedItem = this;
}

//drag attribute on containers*******************************

var containerList = document.getElementsByClassName("tasksSection");
for (var i = 0; i < containerList.length; i++) {
    containerList[i].addEventListener('dragover', dragoverFunc);
    containerList[i].addEventListener('drop', dropFunc);
}

function dragoverFunc(e) {
    e.preventDefault();
}

function dropFunc(e) {
    this.appendChild(draggedItem);
}


//delete items****************************************************
document.getElementById("trash").addEventListener('dragover', dragoverFunc);
document.getElementById("trash").addEventListener('drop', function () {
    draggedItem.remove();
});


//local storage saving********************************************

var localItems = {
    inProgress: [],
    onHold: [],
    review: [],
    approved: [],
};

function saveItems() {
    document.querySelectorAll(".inProgress >.tasksSection >li").forEach(function (e) {
        localItems.inProgress.push(e.innerText);
        console.log(e);
    })
    document.querySelectorAll(".onHold >.tasksSection >li").forEach(function (e) {
        localItems.onHold.push(e.innerText);
    })
    document.querySelectorAll(".review >.tasksSection >li").forEach(function (e) {
        localItems.review.push(e.innerText);
    })
    document.querySelectorAll(".approved >.tasksSection >li").forEach(function (e) {
        localItems.approved.push(e.innerText);
    })

    localStorage.setItem("localItems", JSON.stringify(localItems));
}

function getItems() {
    var data = localStorage.getItem("localItems");
    data = JSON.parse(data);
    data.inProgress.forEach(function (e) {
        item = document.createElement("li");
        item.setAttribute('draggable', true);
        item.addEventListener("dragstart", daragstartFunc)
        document.querySelector(".inProgress >.tasksSection").appendChild(item);
        item.innerText = e;
    })
    data.onHold.forEach(function (e) {
        item = document.createElement("li");
        item.setAttribute('draggable', true);
        item.addEventListener("dragstart", daragstartFunc)
        document.querySelector(".onHold >.tasksSection").appendChild(item);
        item.innerText = e;
    })
    data.review.forEach(function (e) {
        item = document.createElement("li");
        item.setAttribute('draggable', true);
        item.addEventListener("dragstart", daragstartFunc)
        document.querySelector(".review >.tasksSection").appendChild(item);
        item.innerText = e;
    })
    data.approved.forEach(function (e) {
        item = document.createElement("li");
        item.setAttribute('draggable', true);
        item.addEventListener("dragstart", daragstartFunc)
        document.querySelector(".approved >.tasksSection").appendChild(item);
        item.innerText = e;
    })
}