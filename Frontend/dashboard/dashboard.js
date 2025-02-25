let tableBody = document.getElementById("table-body");

const ACCESSKEY = localStorage.getItem("access");

if (!ACCESSKEY || ACCESSKEY === undefined) {
  window.location.href = "../index.html";
}

function loadStudents() {
  fetch("http://127.0.0.1:8000/api/students/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${ACCESSKEY}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      tableBody.innerHTML = "";

      data.forEach((student) => {
        let tableRow = document.createElement("tr");
        let tableDataID = document.createElement("td");
        let tableDataFirstname = document.createElement("td");
        let tableDataLastname = document.createElement("td");
        let tableDataAge = document.createElement("td");
        let tableDataEdit = document.createElement("td");
        let tableDataDelete = document.createElement("td");

        tableDataID.innerHTML = `${student.id}`;
        tableDataFirstname.innerHTML = `${student.firstname}`;
        tableDataLastname.innerHTML = `${student.lastname}`;
        tableDataAge.innerHTML = `${student.age}`;
        tableDataEdit.innerHTML = `<button class="btn btn-secondary" onclick="editStudent(${student.id})">Bearbeiten</button>`;
        tableDataDelete.innerHTML = `<button class="btn btn-danger" onclick="deleteStudent(${student.id})">Löschen</button>`;

        tableBody.appendChild(tableRow);
        tableRow.appendChild(tableDataID);
        tableRow.appendChild(tableDataFirstname);
        tableRow.appendChild(tableDataLastname);
        tableRow.appendChild(tableDataAge);
        tableRow.appendChild(tableDataEdit);
        tableRow.appendChild(tableDataDelete);
      });
    })
    .catch((error) => {
      console.error("Fehler beim Laden der Studenten:", error);
      alert("Es gab ein Problem beim Laden der Studenten.");
    });
}

document.addEventListener("DOMContentLoaded", loadStudents);

function logOut() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "../index.html";
}

function editStudent(id) {
  window.location.href = `edit.html?id=${id}`;
}

function deleteStudent(id) {
  if (confirm("Möchten Sie diesen Studenten wirklich löschen?")) {
    fetch(`http://127.0.0.1:8000/api/students/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${ACCESSKEY}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert(`Student mit der ID ${id} wurde erfolgreich gelöscht.`);
          loadStudents();
        } else {
          alert("Fehler beim Löschen des Studenten.");
        }
      })
      .catch((error) => {
        console.error("Fehler beim Löschen:", error);
        alert("Ein Fehler ist aufgetreten.");
      });
  }
}
