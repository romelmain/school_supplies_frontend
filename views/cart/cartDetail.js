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

      let table = "<table class='table table table-hover table-striped'>";
      let thead =
        "<thead>" +
        "<tr>" +
        "<th scope='col'></th>" +
        "<th scope='col'>Product</th>" +
        "<th scope='col'>Item Price</th>" +
        "<th scope='col'>Quantity</th>" +
        "<th scope='col'>Price to Pay</th>" +
        "</tr>" +
        "</thead>";
      let tbody = "<tbody>";
      let endTable = "</tbody></table>";
      let row = "";
      json.listProductPrice.map((cart) => {
        let img =
          "<img align='right'   src='" +
          cart.product.imagen +
          "' width='30px' height='30px' />";
        let tr = "<tr>";
        let colImg = "<td>" + img + "</td>";
        let colProduct = "<td>" + cart.product.nombre + "</td>";
        let colItemPrice = "<td>" + cart.precio + " $</td>";
        let colQuantity = "<td>" + cart.cantidad + "</td>";
        let colPriceToPay = "<td>" + cart.cantidad * cart.precio + " $</td>";
        let endTr = "</tr>";

        row =
          row +
          tr +
          colImg +
          colProduct +
          colItemPrice +
          colQuantity +
          colPriceToPay +
          endTr;
      });

      let products = table + thead + tbody + row + endTable;
      divContiner.append(products);
    } else {
      console.log(response.status);
    }
  } catch (error) {
    console.log(error);
  }
}
