$(document).ready(function () {
  //$("#divLogout").dialog({ autoOpen: false });

  $("#divLogout").dialog({
    autoOpen: false,
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    buttons: {
      Cancel: function () {
        $(this).dialog("close");
      },
      Logout: function () {
        localStorage.removeItem("userid");
        $(location).attr("href", "http://localhost:5500/index.html");
        $(this).dialog("close");
      },
    },
  });
});

function setLogoutDialog() {
  $("#divLogout").dialog("open");
}
