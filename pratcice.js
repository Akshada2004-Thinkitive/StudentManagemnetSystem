let students=[]


function student(id,name,age){
    this.id=id;
    this.name=name;
    this.age=age
}

let s1=new student(1,"Akshada",22);
let s2=new student(2,"Shraddha",26);
let s3=new student(3,"Shwetali",24);

students.push(s1)
students.push(s2)
students.push(s3)

let stud=students.find(function(s){
    return s.id==1;
})

console.log(stud);



