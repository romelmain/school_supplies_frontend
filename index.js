$(document).ready(function () {});

function prueba() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    username: $("#username").val(),
    password: $("#password").val(),
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let aa = {};

  aa = fetch("http://localhost:8080/api/users/login", requestOptions)
    .then(function (response) {
      if (response.ok) {
        return response.json;
      } else {
        console.log("Respuesta de red OK pero respuesta HTTP no OK");
      }
    })
    .catch(function (error) {
      console.log("Hubo un problema con la petición Fetch:" + error.message);
    });

  console.log(aa);
}
