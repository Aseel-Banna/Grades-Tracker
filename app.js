'use strict';

var studentsArray = [];
var tableHeader = ['Student Name', 'Student Grade', 'Course', 'Pass/Fail'];

var studentForm = document.getElementById('students-form');
var table = document.getElementById('gradesTable');
studentForm.addEventListener('submit', handleListener);

var clearButton = document.getElementById('clearBtn');

clearButton.addEventListener('click', clear);

function Student(name, course){
    this.name = name;
    this.course = course;
    this.grade = generateRandomGrade();

    studentsArray.push(this);
}

Student.prototype.renderStudent = function(){
   var dataRow = document.createElement('tr');

    var nameData = document.createElement('td');
    nameData.textContent = this.name;
    dataRow.appendChild(nameData);

    var gradeData = document.createElement('td');
    gradeData.textContent = this.grade;
    dataRow.appendChild(gradeData);

    var courseData = document.createElement('td');
    courseData.textContent = this.course;
    dataRow.appendChild(courseData);


    var passData = document.createElement('td');
    
    if (this.grade< 50){
        passData.textContent = 'Fail';
        dataRow.appendChild(passData);

    }else{
        passData.textContent = 'Pass';
        dataRow.appendChild(passData);

    }

    table.appendChild(dataRow);
    
}


function generateRandomGrade(){
    return Math.ceil(Math.random() * 100);
}

function handleListener(event){
    event.preventDefault();

    var studentName = event.target.studentName.value;
    var studentCourse = event.target.course.value;

    var newStudent = new Student(studentName, studentCourse);
    newStudent.renderStudent();
    localStorage.setItem('students', JSON.stringify(studentsArray));
}

function renderTableHeader(){
    var headerRow = document.createElement('tr');
    var th;
    for(var i=0; i<tableHeader.length; i++){
        th = document.createElement('th');
        th.textContent = tableHeader[i];
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);
}

function checkLocalStorage(){
    if (localStorage.getItem('students')){
        studentsArray = JSON.parse(localStorage.getItem('students'));
    }
}

function renderAllStudents(){
    for (var i=0; i<studentsArray.length; i++){
        var dataRow = document.createElement('tr');

        var nameData = document.createElement('td');
        nameData.textContent = studentsArray[i].name;
        dataRow.appendChild(nameData);

        var gradeData = document.createElement('td');
        gradeData.textContent = studentsArray[i].grade;
        dataRow.appendChild(gradeData);

        var courseData = document.createElement('td');
        courseData.textContent = studentsArray[i].course;
        dataRow.appendChild(courseData);
        var passData = document.createElement('td');
    
        if (studentsArray[i].grade< 50){
        passData.textContent = 'Fail';
        dataRow.appendChild(passData);

        }else{
        passData.textContent = 'Pass';
        dataRow.appendChild(passData);

    }

        table.appendChild(dataRow);
    }
}

function clear(event){
    event.preventDefault();
    table.innerHTML= '';
    renderTableHeader();
    localStorage.clear();
    
}

renderTableHeader();
checkLocalStorage();
renderAllStudents();

