// from data.js
var tableData = data;

//Define global variables and set default values
var selectedCountry = "allcountries";
var selectedState = "allstates";
var selectedCity = "allcities";
var selectedShape = "allshapes";
var dateSorted = tableData.sort(custom_sort)
var selectedBeginningDate = dateSorted[0].datetime;
var selectedEndingDate = dateSorted[dateSorted.length-1].datetime;

document.getElementById("filter-btn").addEventListener("click", clickFunction);

//Function to remove duplicates from an array
function removeDuplicates(myData) {
    return myData.filter(function(obj, index , arr){
      return arr.indexOf(obj) === index;
    });
}

//Function to populate the dropdown for either country or state.
function countryStateDropDownOptions(selectBox, prop) {
  myArray = prop.sort()
  // Get dropdown element from DOM
  var select = document.getElementById(selectBox);
  
  // Loop through the array
  for(var i = 0; i < myArray.length; i++) {
    var opt = myArray[i].toUpperCase();
    var el = document.createElement("option");
    el.text = opt;
    el.value = opt;
    select.add(el);
  }
}

//Function to populate the dropdown for either city or shape.
function cityShapeDropDownOptions(selectBox, prop){
  myArray = prop.sort()
  // Get dropdown element from DOM
  var select = document.getElementById(selectBox);
  
  // Loop through the coutnry array
  for(var i = 0; i < myArray.length; i++) {
    var opt = myArray[i].charAt(0).toUpperCase() + myArray[i].substr(1).toLowerCase();
    var el = document.createElement("option");
    el.text = opt;
    el.value = opt;
    select.add(el);
  }  
}
  
//Function to run after country is selected to populate state dropdown and store selected country.
function countryFunction(select){
  selectedCountry = select.value.toLowerCase();
  removeOptions(document.getElementById("state_select"));
  removeOptions(document.getElementById("city_select"));
  selected=[];
  selected.push(select.value.toLowerCase());
  
  //Get the states in my data only from an array of given countries
  states = removeDuplicates(tableData.filter(myObj => selected.includes(myObj["country"])).map(mapObj =>mapObj["state"]));

  countryStateDropDownOptions("state_select", states);
}

//Function to run after state is selected to populate state dropdown and store selected state.
function stateFunction(select){
  selectedState = select.value.toLowerCase();
  removeOptions(document.getElementById("city_select"));
  selected=[];
  selected.push(select.value.toLowerCase());
  //Get the cities in my data only from an array of given states
  cities = removeDuplicates(tableData.filter(myObj => selected.includes(myObj["state"])).map(mapObj =>mapObj["city"]));
  cityShapeDropDownOptions("city_select", cities);
}

//Function to run after city is selected to store selected city.
function cityFunction(select){
  selectedCity = select.value.toLowerCase();
}

//Function to run after shape is selected to store selected shape.
function shapeFunction(select){
  selectedShape = select.value.toLowerCase();
}

//Function to run only if beginning date is changed.
function beginningDateFunction(select){
  selectedBeginningDate = select.value;
}

//Function to run only if end date is changed.
function endDateFunction(select){
  selectedEndingDate = select.value;
}

//Function to run after filter button is pushed.
function clickFunction(){
  document.getElementById("filter-btn").innerHTML = "Results Displayed";

  beginDateTime = new Date(selectedBeginningDate).getTime();
  endDateTime = new Date(selectedEndingDate).getTime();

  //filter the data

  displayData = tableData.filter(function(entry){return (entry.country === selectedCountry || selectedCountry === "allcountries");})
    .filter(function(entry){return (entry.state === selectedState || selectedState === "allstates");})
    .filter(function(entry){return (entry.city === selectedCity || selectedCity === "allcities");})
    .filter(function(entry){return (entry.shape === selectedShape || selectedShape === "allshapes");})
    .filter(function(entry){return(new Date(entry.datetime).getTime()<=endDateTime && new Date(entry.datetime).getTime()>=beginDateTime);});

  var tblBody = document.getElementsByTagName("tbody")[0];
 
  
  // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
  for (var i = 0; i < displayData.length; i++) {

    var bRow = document.createElement("tr"); // CREATE ROW FOR EACH RECORD .
    
    keys = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"];
    
    for (var j = 0; j < keys.length; j++) {
      var td = document.createElement("td");
      td.innerHTML = displayData[i][keys[j]];
      bRow.appendChild(td);
    }
    tblBody.appendChild(bRow)
  }
}

//Function to clear options from given dropdown.
function removeOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i > 0 ; i--)
    {
        selectbox.remove(i);
    }
}

function custom_sort(a, b) {
  return new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
}

//Get array of allStates, allCities, allCountries, and allShapes
var allStates = removeDuplicates(tableData.map(mapObj => mapObj["state"])).sort();
var allCities = removeDuplicates(tableData.map(mapObj => mapObj["city"])).sort();
var allCountries = removeDuplicates(tableData.map(mapObj => mapObj["country"]));
var allShapes = removeDuplicates(tableData.map(mapObj => mapObj["shape"])).sort();
// I would like to add a duration window. Like being able to select duration less than a minute, more than 5 minutes, etc, 
// but I am running into time issues. It would take a while to clean up the data to have uniform time units reported.


//Initialize Fields and Drop Downs
document.getElementById("beginningDatetime").placeholder = selectedBeginningDate;
document.getElementById("endDatetime").placeholder = selectedEndingDate;
countryStateDropDownOptions("country_select", allCountries);
//countryStateDropDownOptions("state_select", allStates);
//cityShapeDropDownOptions("city_select", allCities);
cityShapeDropDownOptions("shape_select", allShapes);










