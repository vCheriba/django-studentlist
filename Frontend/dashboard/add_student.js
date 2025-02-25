const ACCESSKEY = localStorage.getItem("access");

if (!ACCESSKEY || ACCESSKEY === undefined) {
  window.location.href = "../index.html";
}

document.getElementById("addStudentForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const age = document.getElementById("age").value;

  const newStudent = {
    firstname: firstname,
    lastname: lastname,
    age: age,
  };

  fetch("http://127.0.0.1:8000/api/students/create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${ACCESSKEY}`,
    },
    body: JSON.stringify(newStudent),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(`Student ${firstname} ${lastname} erfolgreich hinzugefügt!`);
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("Fehler beim Hinzufügen des Studenten:", error);
      alert("Ein Fehler ist beim Hinzufügen des Studenten aufgetreten.");
    });
});
