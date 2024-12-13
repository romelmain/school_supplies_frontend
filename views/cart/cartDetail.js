$(document).ready(function () {
  console.log("Cart Detail");
  setHeader("Cart Detail");
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

      let divContiner = $("div[class^='container']");
      $("#labelCart").text(json.date);

      json.listProductPrice.map((cart) => {
        let page = "./views/products/productDetail.html?id=" + cart.product.id;
        let row = "<div class='row'>";
        let img = "";
        let colImg = "";
        let colPrice = "";
        let colProductName = "";
        let colCartButtom = "";
        let colExtra = "<div class='col'></div>";
        img =
          "<img align='right'   src='" +
          cart.product.imagen +
          "' width='30px' height='30px' />";
        colImg = "<div class='col-sm-1 '>" + img + "</div>";
        colProductName =
          "<div class='col-sm-4'><b>Product Name:</b>" +
          cart.product.nombre +
          "</div>";
        colPrice =
          "<div class='col-sm-2'><label align='left'><b>Price:</b></label>  " +
          cart.precio +
          " $</div>";
        row +=
          colExtra + colImg + colProductName + colPrice + colExtra + "</div>";
        divContiner.append(row);
      });
    } else {
      console.log(response.status);
    }
  } catch (error) {
    console.log(error);
  }
}
