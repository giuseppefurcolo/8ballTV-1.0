// Total array items

cTot = content.length;

// Count Separators

let saps = 0;
for (const obj of content) {
  if (obj.title === "<hr>") saps++;
}

// Print Total Videos

document.getElementById("tot").innerHTML = cTot - saps;

var duration = [];

//var linker = "./content/"; Change to content server URL
var linker = "http://giuseppefurcolo.com/delivery/";

listtext = "<ul>";
for (k = 0; k < cTot; k++) {
  if (content[k]["title"] == "<hr>") {
    listtext += "<hr>";
  } else {
    duration = duration.concat(eval(content[k]["file"].substr(0, 2)));
    listtext +=
      "<li><a href= ./content/" +
      content[k]["file"] +
      "  target='new'>" +
      content[k]["title"] +
      " " +
      content[k]["file"].substr(0, 2) +
      "m </a>" +
      " - ID: " +
      Object.keys([content[k]])[0] +
      "</li>";
  }
}

listtext += "</ul>";

var sum = duration.reduceRight(function (a, b) {
  return a + b;
});

document.getElementById("totdur").innerHTML = sum / 60;

var cosa = duration.toString();

document.getElementById("demo").innerHTML = listtext;

if (cosa.match(/15/g) == null) {
  quanti15 = 0;
} else {
  var quanti15 = eval(cosa.match(/15/g)).length;
}

if (cosa.match(/30/g) == null) {
  quanti30 = 0;
} else {
  var quanti30 = eval(cosa.match(/30/g)).length;
}

if (cosa.match(/45/g) == null) {
  quanti45 = 0;
} else {
  var quanti45 = eval(cosa.match(/45/g)).length;
}

if (cosa.match(/60/g) == null) {
  quanti60 = 0;
} else {
  var quanti60 = eval(cosa.match(/60/g)).length;
}

document.getElementById("tot15").innerHTML = quanti15;
document.getElementById("tot30").innerHTML = quanti30;
document.getElementById("tot45").innerHTML = quanti45;
document.getElementById("tot60").innerHTML = quanti60;
