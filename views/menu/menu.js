$(document).ready(function () {
  console.log("Menu");
});

function setPage(page) {
  cleanPage();
  $("#divForm").load(page);
}

function cleanPage() {
  $("#divForm,#divMessage,#divConfirm").empty();
}
