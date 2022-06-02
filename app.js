// console.log("project 1");
showNotes();
// if user adds the note it must go to the localstorage
let addBtn=document.getElementById("addBtn");
addBtn.addEventListener("click",function(e){
    let addTxt=document.getElementById("addTxt");
    let notes=localStorage.getItem("notes");// will come as a string '["this is my first note","first note","third note"]' 
    if(notes==null)
    {
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);// we have to get that as a array , ["this is my first note","first note","third note"]
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes",JSON.stringify(notesObj));//while putting back to LS we have to convert that array into a  string '["this is my first note","first note","third note","fourth note"]'

    addTxt.value="";
    // console.log(notesObj);
    //now we want to show the notes also
    showNotes();
})

// function to show elements from localStorage
function showNotes()
{
    let notes=localStorage.getItem("notes");
    if(notes==null)
    {
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let html="";
    for (let index = 0; index < notesObj.length; index++) {
        html+=`
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">Note ${index+1}</h5>
                      <p class="card-text">${notesObj[index]}</p>
                      <a id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</a>
                    </div>
                </div>
        `
    }
    let notesElm=document.getElementById('notes');
    if(notesObj.length!=0)
    {
        notesElm.innerHTML=html;
    }
    else{
        notesElm.innerHTML=`<h5>Nothing to show! Use " Add a note" section</h5>`
    }
}
function deleteNote(index)
{
    // console.log("i am deleting");
    let notes=localStorage.getItem("notes");
    if(notes==null)
    {
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

let search=document.getElementById('searchTxt');
search.addEventListener("input",function(){
    let inputVal=search.value.toLowerCase();
    // console.log("input event fired",inputVal);
    let noteCards=document.getElementsByClassName("noteCard");
   for (let index = 0; index < noteCards.length; index++) {
       const element = noteCards[index];
       let cardTxt=element.getElementsByTagName("p")[0].innerText;
       if(cardTxt.includes(inputVal))
       {
           element.style.display="block";
       }
       else{
           element.style.display="none";
       }
   }

})