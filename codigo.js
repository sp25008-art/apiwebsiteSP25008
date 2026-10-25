
var fila = "<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td><td class='rating'></td></tr>";

var productos = null;

function codigoCat(catstr) {
    var code = "null";

    switch (catstr) {
        case "electronics":
            code = "c1";
            break;
        case "jewelery":
            code = "c2";
            break;
        case "men's clothing":
            code = "c3";
            break;
        case "women's clothing":
            code = "c4";
            break;
    }

    return code;
}

var orden = 0;

function listarProductos(productos) {
    var precio = document.getElementById("price");

    precio.setAttribute(
        "onclick",
        "orden *= -1; listarProductos(productos);"
    );

    var num = productos.length;
    var listado = document.getElementById("listado");

    var ids, titles, prices, descriptions, categories, fotos, ratings;
    var tbody = document.getElementById("tbody");

    tbody.innerHTML = "";

    var catcode;

    for (var i = 0; i < num; i++) {
        tbody.innerHTML += fila;
    }

    ids = document.getElementsByClassName("id");
    titles = document.getElementsByClassName("title");
    descriptions = document.getElementsByClassName("description");
    categories = document.getElementsByClassName("category");
    fotos = document.getElementsByClassName("foto");
    prices = document.getElementsByClassName("price");
    ratings = document.getElementsByClassName("rating");

    if (orden === 0) {
        orden = -1;
        precio.innerHTML = "Precio";
        precio.style.color = "";
    } else if (orden === 1) {
        ordenarAsc(productos, "price");
        precio.innerHTML = "Precio A";
        precio.style.color = "darkgreen";
    } else if (orden === -1) {
        ordenarDesc(productos, "price");
        precio.innerHTML = "Precio D";
        precio.style.color = "blue";
    }

    listado.style.display = "block";

    for (var nfila = 0; nfila < num; nfila++) {
        ids[nfila].innerHTML = productos[nfila].id;
        titles[nfila].innerHTML = productos[nfila].title;
        descriptions[nfila].innerHTML = productos[nfila].description;
        categories[nfila].innerHTML = productos[nfila].category;

        catcode = codigoCat(productos[nfila].category);
        categories[nfila].parentElement.setAttribute("class", catcode);

        prices[nfila].innerHTML = "$" + productos[nfila].price;

        // Mostrar la calificación del producto
        if (
            productos[nfila].rating &&
            productos[nfila].rating.rate !== undefined
        ) {
            ratings[nfila].innerHTML =
                "⭐ " + productos[nfila].rating.rate + " / 5";
        } else {
            ratings[nfila].innerHTML = "Sin calificación";
        }

        // Mostrar la imagen del producto
        fotos[nfila].innerHTML =
            "<img src='" + productos[nfila].image + "' alt='Imagen del producto'>";

        fotos[nfila].firstChild.setAttribute(
            "onclick",
            "window.open('" + productos[nfila].image + "', '_blank')"
        );
    }
}

function obtenerProductos() {
    fetch("https://fakestoreapi.com/products")
        .then(function (res) {
            if (!res.ok) {
                throw new Error("Error al consultar la API: " + res.status);
            }
            return res.json();
        })
        .then(function (data) {
            productos = data;
            listarProductos(productos);
        })
        .catch(function (error) {
            console.error("No se pudieron obtener los productos:", error);
            alert("No se pudieron cargar los productos. Revisa tu conexión a Internet e inténtalo de nuevo.");
        });
}

function ordenarDesc(p_array_json, p_key) {
    p_array_json.sort(function (a, b) {
        if (a[p_key] > b[p_key]) return -1;
        if (a[p_key] < b[p_key]) return 1;
        return 0;
    });
}

function ordenarAsc(p_array_json, p_key) {
    p_array_json.sort(function (a, b) {
        if (a[p_key] > b[p_key]) return 1;
        if (a[p_key] < b[p_key]) return -1;
        return 0;
    });
}
