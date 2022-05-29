const addBtn = document.querySelector(".add");

const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

addBtn.addEventListener("click", function () {
  addNewNote();
});

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `<div class="notes">
 <div class="tools">
   <button class="edit">
     <img
       src="./edit-button-svgrepo-com.svg"
       alt=""
       width="20"
       height="20"
     />
   </button>
   <button class="delete">
     <img src="./delete-svgrepo-com.svg" alt="" width="20" height="20" />
   </button>
 </div>
 <div class="main ${text ? "" : "hidden"}"></div>
 <textarea class = "${text ? "hidden" : ""}"></textarea>
 </div> `;

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");

  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  textArea.value = text;
  main.innerHTML = text;
  editBtn.addEventListener("click", function () {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  deleteBtn.addEventListener("click", function () {
    note.remove();
    updateLS();
  });

  textArea.addEventListener("input", function (e) {
    const { value } = e.target;
    main.innerHTML = value;
    updateLS();
  });

  document.body.appendChild(note);
}

function updateLS() {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];
  notesText.forEach((note) => notes.push(note.value));

  localStorage.setItem("notes", JSON.stringify(notes));
}
