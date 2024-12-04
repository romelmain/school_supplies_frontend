$(document).ready(function () {
  let userid = 0;
  userid = parseInt(localStorage.getItem("userid"));

  if (userid > 0) {
    $("#divMenu").load("./views/menu/menu.html");
  } else {
    console.log("bbb");
    $(location).attr("href", "http://localhost:5500/login/login.html");
  }
});
