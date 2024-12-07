function setPage(page) {
  cleanPage();
  $("#divForm").load(page);
}

function cleanPage() {
  $("#divForm,#divMessage,#divConfirm,#divModal").empty();
}

function setModal(height, width, title) {
  $("#divModal").dialog({
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

function openModal(page, data) {
  console.log(data);
  $("#divModal").load(page, function () {
    alert(data.product.id);
  });
  $("#divModal").dialog("open");
}
