


let studentsInfo=[];

async function getStudent() {

    try{

        const response=await fetch("http://localhost:8080/get");
        if(!response.ok){
            alert("Something went wrong");
            return;
        }
        studentsInfo=await response.json();
        console.log(studentsInfo);
        
        displayStudents();
        updateStat();



    }catch(error){

        alert(error.message)
    }

    
    
}


async function addStudent() {

    let name = document.getElementById("studentName").value;
    let age = Number(document.getElementById("studentAge").value);
    let course = document.getElementById("studentCourse").value;
    let marks = Number(document.getElementById("studentMarks").value);

    let email=document.getElementById("studentemail").value;

    let student = {
        name: name,
        age: age,
        course: course,
        marks: marks,
        email:email
    };



    await saveStudent(student);
    await getStudent();

  
    document.getElementById("studentForm").reset();
    alert("Student save Successfully");
}

function updateStat(){
    let count=studentsInfo.length;
    let totalMarks=studentsInfo.reduce(function(total,stud){
        return total+=stud.marks
    },0)

    let avgmarks=count>0?totalMarks/studentsInfo.length:0;

    document.getElementById("totalStudents").textContent=count;
    document.getElementById("averageMarks").textContent=avgmarks.toFixed(2);
}

let displayStudents=(data=studentsInfo) =>{

    let table = document.getElementById("studentTable");

    table.innerHTML = "";

    data.forEach(function(student) {

        table.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.course}</td>
                <td>${student.marks}</td>

                <td>
                    <button onclick="editStudent(${student.id})" class="edit-btn">
                        Edit
                    </button>

                    <button onclick="deleteStudent(${student.id})" class="delete-btn">
                        Delete
                    </button>
                </td>
            </tr>
        `;

    });
}

async function saveStudent(student) 
{


        const response=await fetch("http://localhost:8080/save",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(student)
        })

        if(!response.ok){
            throw new Error("Somthing went wrong")
        }

       
   

    
    

}

async function deleteStudent(id){
    
    const response=await fetch(`http://localhost:8080/delete/${id}`,{
        method:"DELETE"
    })

    if(!response.ok){
        throw new Error("Something went wrong")
    }

    await getStudent();
}

function editStudent(id){
    console.log("ID received:", id);


window.location.href=`updateStudent.html?id=${id}`;



   


}


function searchStudent(){
   
    let id=Number(document.getElementById("searchInput").value);
   
    let stud=studentsInfo.find(function(s){
        return s.id===id;
    })

    if(stud){
        console.log(stud);
        
        displayStudents([stud])
    }else{
        alert("Student not found")
        displayStudents();
    }
}

getStudent();
