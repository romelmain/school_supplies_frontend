$(document).ready(function () {});

async function login() {
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

  try {
    const response = await fetch(
      "http://localhost:8080/api/users/login",
      requestOptions
    );
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      localStorage.setItem("userid", json.user.id);
      if (json.cartId > 0) {
        localStorage.setItem("idCart", json.cartId);
      }

      $(location).attr("href", "http://localhost:5500/index.html");
    } else {
      console.log(response.status);
    }
  } catch (error) {
    console.log(error);
  }
}
