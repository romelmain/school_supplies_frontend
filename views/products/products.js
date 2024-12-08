$(document).ready(function () {
  console.log("products!!");
  setModal(500, 1200, "Product Detail");

  $("#divModal").dialog("option", "buttons", [
    {
      text: "Cancel",
      click: function () {
        $(this).dialog("close");
      },
    },
    {
      text: "Add to Cart",
      click: function () {
        const productId = $("#productId").val();
        addToCart(productId);
        $(this).dialog("close");
      },
    },
  ]);

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
        let page =
          "./views/products/productDetail.html?id=" + product.product.id;
        let row = "<div class='row'>";
        let img = "";
        let colImg = "";
        let colPrice = "";
        let colProductName = "";
        let colCartButtom = "";
        img =
          "<img onclick='(getAllProductsById(" +
          product.product.id +
          "))'  src='" +
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
  const dia = ("0" + date.getDate()).slice(-2);
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

async function getAllProductsById(idProduct) {
  let page = "./views/products/productDetail.html";
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
      "http://localhost:8080/api/products/" + idProduct,
      requestOptions
    );
    if (response.ok) {
      const json = await response.json();
      const productHtml = setProductData(json);
      openModal(productHtml);
    } else {
      console.log(response.status);
    }
  } catch (error) {
    console.log(error);
  }
}

function setProductData(data) {
  console.log(data);

  let container = "<div class='container'>";
  let row = "<div class='row'>";
  let col =
    "<div class='col-sm-4'><img width='260px' height='260px' src='" +
    data.product.imagen +
    "'></img></div>";
  col +=
    "<div class='col-sm-4'>" +
    data.product.nombre +
    ": " +
    data.precio +
    "$</div>";
  col += "<div class='col-sm-4'>" + data.product.descripcion + "</div>";
  let input =
    "  <input type='hidden' id='productId' name='productId' value='" +
    data.id +
    "' />";
  let producto = container + row + col + "</div></div>" + input;
  return producto;
}
