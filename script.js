var count = 1;

var submitSelectedAwards = document.getElementById("button");

function dropDownTextAreaToggle(){
  //getting all the images in a list "imageTagList"
  var imageTagList = document.getElementsByTagName("img");

  //setting the class name for each image as "arrow"
  for (i = 0; i < imageTagList.length; i++) {
    imageTagList[i].className = "arrow";
  }

  //getting all the elements with classname "arrow"
  var arrow = document.getElementsByClassName("arrow");

  
  for (i = 0; i < arrow.length; i++) {
    //Applying function for all images with class arrow
    arrow[i].onclick = function () {

      //getting rows with classname "dropDownTextArea"
      var dropDownTextArea = this.parentNode.parentNode.nextElementSibling;

      //setting row visibility if "none"
      if (dropDownTextArea.style.display === "none") {
        dropDownTextArea.style.display = "table-row";
      } else {
        dropDownTextArea.style.display = "none";
      }
    }
  }

}

window.onload = function() {
  var fullName = "Charmy Darji"; 
  var nuid = "002809073";
  document.getElementById("user-info").innerHTML = "Name: " + fullName + "<br>NUID: " + nuid;
};

function addNewStudent() {

  // Retrieve the rows of the HTML table, determine the latest index by parsing the second-to-last row's content, and set it to 1 if there is only one row (header).
  try {
  var rows = document.getElementById("myTable").rows;
  var latestIndex;
  if (rows.length > 1) {
    latestIndex = parseInt(rows[rows.length - 2].firstElementChild.nextElementSibling.innerHTML.split(" ")[1]) + 1;
  }
  else {
    latestIndex = 1;
  }

  var table = document.getElementById("myTable");
  var tbodyRef = document.getElementsByTagName("tbody")[0];

  // Create a table row (trNode) with cells for checkbox, student, teacher, status, semester, type, budget, and percentage, initializing content and attributes as needed.

  var tdNode = document.createElement("tr");

  var trCheckboxCell = document.createElement("td");
  trCheckboxCell.innerHTML = ' <input id = "checkbox" type = "checkbox" onclick = "onCheckboxClick(this)" /><br /><br /> <img src="down.png" width="25px" />';
  var trStudentCell = document.createElement("td");
  trStudentCell.innerHTML = "Student " + (parseInt(latestIndex));
  var trTeacherCell = document.createElement("td");
  trTeacherCell.innerHTML = "Teacher " + (parseInt(latestIndex));
  var trStatusCell = document.createElement("td");
  trStatusCell.innerHTML = "Approved";
  var trSemCell = document.createElement("td");
  trSemCell.innerHTML = "Fall";
  var trTypeCell = document.createElement("td");
  trTypeCell.innerHTML = "TA";
  var trBudgetCell = document.createElement("td");
  trBudgetCell.innerHTML = "45678";
  var trPercentCell = document.createElement("td");
  trPercentCell.innerHTML = "100%";

  //appending inside tr
  tdNode.appendChild(trCheckboxCell);
  tdNode.appendChild(trStudentCell);
  tdNode.appendChild(trTeacherCell);
  tdNode.appendChild(trStatusCell);
  tdNode.appendChild(trSemCell);
  tdNode.appendChild(trTypeCell);
  tdNode.appendChild(trBudgetCell);
  tdNode.appendChild(trPercentCell);

  //appending inside tBody
  tbodyRef.appendChild(tdNode);

  //creating a new Advisor details row
  tdNode = document.createElement("tr");
  tdNode.setAttribute("class", "dropDownTextArea");

  var trAdvisorDetails = document.createElement("td");
  trAdvisorDetails.setAttribute("colspan", "8")
  trAdvisorDetails.innerHTML = 'Advisor:<br /><br />Award Details<br />Summer 1-2014(TA)<br />Budget Number: <br />Tuition Number: <br />Comments:<br /><br /><br />Award Status:<br /><br /><br />'

  //appending inside tr
  tdNode.appendChild(trAdvisorDetails);

  //appending inside tBody
  tbodyRef.appendChild(tdNode);
    count++;

    var studentName = "Student " + (parseInt(latestIndex));

    alert(studentName + " Record added successfully");
    // If you want to show a pop-up message instead of an alert, you can use a modal or a custom popup implementation.

    dropDownTextAreaToggle();
  } catch (error) {
    console.error("Error adding record:", error);
    alert("Error adding record. Please try again.");
    // Handle the error appropriately, such as logging it or showing a user-friendly message.
  }

}

function onCheckboxClick(checkbox) {
  var rowSelect = checkbox.parentElement.parentElement;

  if (checkbox.checked == true) {

    //Changing color of background and button
    rowSelect.style.backgroundColor = "yellow";
    submitSelectedAwards.style.backgroundColor = "orange";
    submitSelectedAwards.style.borderColor = "orange";

    //getting all the rows
    var trList = document.getElementsByTagName("tr");

    //checking if the last column of the table is "Edit"
    if (trList[0].lastElementChild.innerHTML !== "Edit") {

      //setting Column Names
      var table = document.getElementById("myTable");
      var tHeadRef = document.getElementsByTagName("thead")[0];
      var tdNode = tHeadRef.getElementsByTagName("tr")[0];

      var trDelete = document.createElement("th");
      trDelete.innerHTML = "Delete";
      var trEdit = document.createElement("th");
      trEdit.innerHTML = "Edit";

      //appending inside tr
      tdNode.appendChild(trDelete);
      tdNode.appendChild(trEdit);

      //appending inside tHead
      tHeadRef.appendChild(tdNode);

    }

    //delete button
     var deleteButton = document.createElement("td");
     deleteButton.setAttribute("id", "deleteId");
    deleteButton.innerHTML = '<button id = "delete" type = "button" onclick = "deleteRow(this)">Delete</button>';
    rowSelect.appendChild(deleteButton);

    //edit button
    var editButton = document.createElement("td");
    editButton.setAttribute("id", "editId");
    editButton.innerHTML = '<button id = "edit" type = "button" onclick = "editRow(this)">Edit</button>';
    rowSelect.appendChild(editButton);

  } else {

    //Setting the background color back to default
    rowSelect.style.backgroundColor = "#fff";
    submitSelectedAwards.style.backgroundColor = "grey";
    submitSelectedAwards.style.borderColor = "grey";

    //deleting the 'delete' and 'edit' buttons
    rowSelect.deleteCell(8);
    rowSelect.deleteCell(8);
    submitFunction()
  }
}

//Ensuring the submit button is orange when checkbox is checked
function submitFunction() {

  //Getting all the input tags
  var inputList = document.getElementsByTagName("input");

  //Setting their classname to "checkbox"
  for (i = 0; i < inputList.length; i++) {
    inputList[i].className = "checkbox";
  }

  //Getting all the elements whose class is "checkbox"
  var checkbox = document.getElementsByClassName("checkbox");

  //Setting the enableSubmitButton flag 
  var enableSubmitButton = false;

  for (j = 0; j < checkbox.length; j++) {
    if (checkbox[j].checked) {
      enableSubmitButton = true;
      break;
    }
  }

  //Getting all the button with id = "button"
  var buttonElement = document.getElementById("button");

  if (!enableSubmitButton) {
    resetColumns();
  }
  else {
    buttonElement.style.backgroundColor = "orange";
    buttonElement.style.border = "2px solid orange";
  }
}

//Checks whether or not to remove the Delete and Edit Columns
function resetColumns() {

  var trList = document.getElementsByTagName("tr");

  trList[0].removeChild(trList[0].lastElementChild);
  trList[0].removeChild(trList[0].lastElementChild);
}

//Deletes a particular row
function deleteRow(rowObject) {
  var tr = rowObject.parentElement.parentElement; //tr reference
  var studentName = tr.querySelector("td:nth-child(2)").innerHTML; 

  submitSelectedAwards.style.backgroundColor = "grey";
  submitSelectedAwards.style.borderColor = "grey";

  if (confirm("Are you sure you want to delete " + studentName + "'s record?")) {
  document.getElementById("myTable").deleteRow(tr.rowIndex + 1);
  document.getElementById("myTable").deleteRow(tr.rowIndex);
  }
  count--;
  alert(studentName + " Record deleted successfully");
  submitFunction();
}

//Edits a particular row
function editRow(rowObject) {
  prompt("Edit the details");
}

//Responsible for adding the "Delete" and "Edit" buttons
function onArrowClick(checkbox) {
  var rowSelect = checkbox.parentElement.parentElement;

  if (checkbox.checked == true) {
    rowSelect.style.backgroundColor = "yellow";

    //delete button
    var deleteButton = document.createElement("td");
    deleteButton.setAttribute("id", "deleteId");
    deleteButton.innerHTML = '<button id = "delete" type = "button" onclick = "deleteRow(this)">Delete</button>';
    rowSelect.appendChild(deleteButton);

    //edit button
    var editButton = document.createElement("td");
    editButton.setAttribute("id", "editId");
    editButton.innerHTML = '<button id = "edit" type = "button" onclick = "editRow(this)">Edit</button>';
    rowSelect.appendChild(editButton);

  } else {
    rowSelect.style.backgroundColor = "#fff";
    rowSelect.deleteCell(8);
  }
}

dropDownTextAreaToggle();

//Title constructor function that creates a Title object
function Title(t1) {
  this.mytitle = t1;
}

Title.prototype.getName = function () {
  return (this.mytitle);
}

function createEditPopup(studentName, studentDetails) {
  var popup = document.createElement('div');
  popup.id = 'editPopup';
  popup.style.position = 'fixed';
  popup.style.left = '50%';
  popup.style.top = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.backgroundColor = '#fff';
  popup.style.padding = '20px';
  popup.style.border = '1px solid #ddd';
  popup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
  popup.style.zIndex = '1000';

  var title = document.createElement('h3');
  title.innerText = `Edit details of ${studentName}`;
  popup.appendChild(title);

  var details = document.createElement('p');
  details.innerText = studentDetails;
  popup.appendChild(details);

  var updateButton = document.createElement('button');
  updateButton.innerText = 'Update';
  updateButton.onclick = function() {
    alert(`${studentName} data updated successfully`);
    document.body.removeChild(popup);
  };
  popup.appendChild(updateButton);

  var cancelButton = document.createElement('button');
  cancelButton.innerText = 'Cancel';
  cancelButton.onclick = function() {
    document.body.removeChild(popup);
  };
  popup.appendChild(cancelButton);

  return popup;
}

function editRow(rowObject) {
  var tr = rowObject.parentElement.parentElement; //tr reference
  var studentName = tr.querySelector("td:nth-child(2)").innerHTML;
  var studentDetails = getStudentDetailsAsString(tr);
  
  var popup = createEditPopup(studentName, studentDetails);
  document.body.appendChild(popup);
}

function getStudentDetailsAsString(tr) {
  var details = '';
  for (var i = 1; i < tr.cells.length; i++) {
    details += tr.cells[i].textContent + '\n';
  }
  return details;
}

var socialMedia = {
  facebook: 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};

var t = new Title("CONNECT WITH ME!");