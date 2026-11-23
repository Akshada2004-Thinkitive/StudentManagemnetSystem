
function saveData(students){

    localStorage.setItem("students",JSON.stringify(students));
}

function getData(){
    return JSON.parse(localStorage.getItem("students"));
}