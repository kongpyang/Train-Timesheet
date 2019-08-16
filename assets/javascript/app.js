function getTrainInfo(cb) {
localforage.getItem("shelfHolder").then(function (result) {
cb(result || []); 
});
}

function setTrainInfo(newTrainInfo, cb) {
localforage.setItem("shelfHolder", newTrainInfo).then(cb);
}
setTrainInfo("", function(){
getTrainInfo(function(result){
console.log(result);
})
});

//  create function to grab user data from form

document.getElementById("submitButton").addEventListener("click", function(event) {

event.preventDefault();
const trainName = document.getElementById("name").value.trim();  
const inputDestination = document.getElementById("inputDestination").value.trim();
const time = document.getElementById("time").value.trim();
const frequencyTime = document.getElementById("frequencyTime").value.trim();

const trainInfo = {
trainName: trainName,
inputDestination: inputDestination,
time: time,
frequencyTime: frequencyTime,
};
//console log the result//
setTrainInfo(trainInfo, function(){
getTrainInfo(function(result){
console.log(result);  
})
});

//this function will go in your click event
//we will get the current employee list from localForage, which will be an empty array or an array of objects
getTrainInfo(function (result) {

//we will define a new array and set it equal to our results array
let newArr = result;
//we will push our new user object to the array we just created
newArr.push(trainInfo);
//now our array is updated so we'll push this array back to localForage
setTrainInfo(newArr, function () {
    console.log("done");
});
});

})

document.querySelector("button").addEventListener("click", function(){
const value = document.querySelector("input").value;
localforage.getItem("saved").then(function(result){
if(!result){
result = [];
}
result.push(value);
localforage.setItem("saved", result)
.then(function(){
    console.log("saved")
});
});

});

const table = document.querySelector("table");
setInterval(function(){
localforage.getItem("saved").then(function(result){
if(!result){
result = [];
}
table.innerHTML = "";
for(let i = 0; i<result.length; i++){
const br = document.createElement("br");
table.append(br, result[i])
}
});
}, 500)



