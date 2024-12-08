function setPage(page) {
  cleanPage();
  $("#divForm").load(page);
}

function cleanPage() {
  $("#divForm,#divMessage,#divConfirm,#divModal").empty();
}

function setModal(height, width, title) {
  $("#divModal").dialog({
    open: function (event, ui) {
      let button = $("[class='ui-dialog-buttonset'] > button");
      button.addClass("ui-button ui-widget ui-corner-all");
    },
    title: title,
    autoOpen: false,
    height: height,
    width: width,
    modal: true,
    close: function () {
      $("#divModal").dialog("close");
    },
  });
}

function openModal(page) {
  console.log(page);
  $("#divModal").html(page);
  $("#divModal").dialog("open");
}