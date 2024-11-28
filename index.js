$(document).ready(function () {
  let userid = 0;
  userid = parseInt(localStorage.getItem("userid"));

  if (userid > 0) {
    console.log("aaa");
    //$("#divMenu").on("load");
    $("#divMenu").load("./views/menu/menu.html");
    /*$.get("./views/menu.html", function (data) {
      $("#divMenu").html(data);
    });*/
  } else {
    console.log("bbb");
    $(location).attr("href", "http://localhost:5500/login/login.html");
  }
});
