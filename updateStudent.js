const params = new URLSearchParams(window.location.search);

const studentId = params.get("id");

console.log("Current URL:", window.location.href);
console.log("Student ID:", studentId);

async function getStudent() {


    try{
        const response=await fetch(`http://localhost:8080/get/${studentId}`)

        if(!response.ok){
            throw new Error("Student is not present");
        }

        const stud=await response.json();
        console.log(stud);
        

        document.getElementById("studentName").value=stud.name;
        document.getElementById("studentAge").value=stud.age;
        document.getElementById("studentCourse").value=stud.course;
        document.getElementById("studentMarks").value=stud.marks;
        document.getElementById("studentEmail").value=stud.email;
    

    }catch(error){
        alert(error.message);
    }
    
}

getStudent()
document.getElementById("studentForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    let student = {
        name: document.getElementById("studentName").value,
        age: Number(document.getElementById("studentAge").value),
        course: document.getElementById("studentCourse").value,
        marks: Number(document.getElementById("studentMarks").value),
        email:document.getElementById("studentEmail").value,
        id:studentId
    };

    const response =await fetch(`http://localhost:8080/updateFild/${studentId}`,{
        method:"PATCH",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(student)

        

    })


    const result=await response.text();

    alert(result)



    
        document.getElementById("studentName").value="";
        document.getElementById("studentAge").value="";
        document.getElementById("studentCourse").value="";
        document.getElementById("studentMarks").value="";
        document.getElementById("studentEmail").value="";


        window.location.href=`index.html`;



});