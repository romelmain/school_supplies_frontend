$(document).ready(function () {
  console.log("products!!");

  getAllProducts();
});

async function getAllProducts() {
  console.log("Consulta Productos !!");

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
      "http://localhost:8080/api/products",
      requestOptions
    );
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      let divContiner = $("div[class^='container']");

      json.map((product) => {
        let row = "<div class='row'>";
        let img = "";
        let colImg = "";
        let colPrice = "";
        let colProductName = "";
        let colCartButtom = "";
        img =
          "<img src='" + product.imagen + "' width='260px' height='260px' />";
        colImg = "<div class='col-sm-4'>" + img + "</div>";
        colProductName =
          "<div class='col-sm-4'><b>Product Name:</b>" +
          product.nombre +
          "</div>";
        colPrice =
          "<div class='col-sm-2'><label><b>Price:</b></label>20$</div>";
        colCartButtom =
          "<div class='col-sm-2'><button type='button' class='btn btn-primary'>Add to cart</button></div>";
        row += colImg + colProductName + colPrice + colCartButtom + "</div>";
        divContiner.append(row);
      });
    } else {
      console.log(response.status);
    }
  } catch (error) {
    console.log(error);
  }
}
