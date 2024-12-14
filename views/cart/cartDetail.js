$(document).ready(function () {
  console.log("Cart Detail");

  const idCart = localStorage.getItem("idCart");
  getCartDetail(idCart);
});

async function getCartDetail(idCart) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let row = "";

  try {
    const response = await fetch(
      "http://localhost:8080/api/cart/" + idCart,
      requestOptions
    );
    if (response.ok) {
      const json = await response.json();
      console.log(json);

      let divContiner = $("#divCartDetail");
      setHeader("Cart Detail: " + json.date);

      json.listProductPrice.map((cart) => {
        let page = "./views/products/productDetail.html?id=" + cart.product.id;
        let row = "<div class='row'>";
        let img = "";
        let colImg = "";
        let colPrice = "";
        let colProductName = "";
        let colCartButtom = "";
        let colCantidad = "";
        let colPricePay = "";
        let colExtra = "<div class='col'></div>";
        img =
          "<img align='right'   src='" +
          cart.product.imagen +
          "' width='30px' height='30px' />";
        colImg = "<div class='col '>" + img + "</div>";
        colProductName = "<div class='col'>" + cart.product.nombre + "</div>";
        colPrice =
          "<div class='col d-flex justify-content-center'>  " +
          cart.precio +
          " $</div>";
        colCantidad =
          "<div class='col d-flex justify-content-center'>" +
          cart.cantidad +
          "</div>";
        colPricePay =
          "<div class='col d-flex justify-content-center'>" +
          cart.cantidad * cart.precio +
          "</div>";
        row +=
          colImg +
          colProductName +
          colPrice +
          colCantidad +
          colPricePay +
          "</div>";
        $("#divHeaderCartDetail").attr("style", "display: block");
        divContiner.append(row);
      });
    } else {
      $("#divHeaderCartDetail").attr("style", "display: none");
      console.log(response.status);
    }
  } catch (error) {
    console.log(error);
  }
}
