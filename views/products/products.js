$(document).ready(function () {
  console.log("products!!");

  getAllProducts();
});

async function getAllProducts() {
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
      "http://localhost:8080/api/products/price",
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
          "<img src='" +
          product.product.imagen +
          "' width='260px' height='260px' />";
        colImg = "<div class='col-sm-4'>" + img + "</div>";
        colProductName =
          "<div class='col-sm-4'><b>Product Name:</b>" +
          product.product.nombre +
          "</div>";
        colPrice =
          "<div class='col-sm-2'><label><b>Price:</b></label>  " +
          product.precio +
          " $</div>";
        colCartButtom =
          "<div class='col-sm-2' onclick='addToCart(" +
          product.id +
          ");'><button type='button' class='btn btn-primary'>Add to cart</button></div>";
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

async function addToCart(idProductoPrecio) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const date = new Date();
  const anio = date.getFullYear();
  const mes = ("0" + (date.getMonth() + 1)).slice(-2);
  const dia = ("0" + date.getDay()).slice(-2);
  const hora = ("0" + date.getHours()).slice(-2);
  const min = ("0" + date.getMinutes()).slice(-2);
  const seg = ("0" + date.getSeconds()).slice(-2);

  const fecha =
    anio + "-" + mes + "-" + dia + " " + hora + ":" + min + ":" + seg;
  console.log("-----------------------------------------------------------");
  const aa = fecha;
  console.log(fecha.toString());
  console.log("-----------------------------------------------------------");
  const request = {
    date: fecha,
    statusCart: {
      id: 1,
    },
    user: {
      id: localStorage.getItem("userid"),
    },
    productPrice: { id: idProductoPrecio },
  };
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify(request),
  };
  try {
    const response = await fetch(
      "http://localhost:8080/api/cart",
      requestOptions
    );
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      $("#ico-cart").attr("src", "./views/img/full-cart.png");
    }
  } catch (error) {
    console.log(error);
  }
}