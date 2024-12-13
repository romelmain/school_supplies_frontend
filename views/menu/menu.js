$(document).ready(function () {
  console.log("Menu");
  if (
    localStorage.getItem("idCart") != null &&
    localStorage.getItem("idCart") > 0
  ) {
    console.log("Hay carrito");
    $("#ico-cart").attr("src", "./views/img/full-cart.png");
  } else {
    console.log("No hay carrito");
  }
});
