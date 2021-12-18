
const body = document.querySelector('.body');
const botonSliderIzquierda = document.getElementById("boton_slider_izquierda");
const botonSliderDerecha = document.getElementById("boton_slider_derecha");
const botonVerMas = document.getElementById("boton_ver_mas");
const corazon = document.querySelector('#corazon_modal');
const descarga = document.querySelector('.descarga_modal');
const descargaGif = document.querySelector('.descarga');
const link = document.querySelector(".link");
const misFavoritos = document.querySelector(".mis_favoritos");
const misGifs = document.querySelector('.mis_gifos');
const modal = document.querySelector('.modal');
const nombreModo = document.querySelector('#nombreModo');
const resultadoTrending = document.querySelector(".resultado_trending");
const trending = document.querySelector('.trending')
const titulo = document.querySelector('.titulo_modal');
const usuario = document.querySelector('.usuario_modal');
const contenedorSinFavoritos = document.querySelector('.contenedor_sin_favoritos');
let numero = 0;
let arrayFavoritos = [];

/**-------------- FETCH -------------- */
const fetchGif = async (url) => {

	const respuesta = await fetch(url)
	data = await respuesta.json();
	return await data;

}

const traerGif = async (url) => {

	const resultado = await fetchGif(url)
	return resultado

}	

/* ------------------------------------TRENDING-----------------*/

async function mostrarTrending(numero) {

	let url = 'https://api.giphy.com/v1/gifs/trending?api_key=bYQ1Vfn6G2NKpWha0cAgVmdsArrnZiSz&limit=25&rating=g';


	let gifsTrending = await traerGif(url);

	resultadoTrending.innerHTML = '';
	nuevoNumero = numero + 3;
	const cantGif = gifsTrending.data.length;

	for (i = numero; i < nuevoNumero; i++) {

		arrayTrending = {
			'id': gifsTrending.data[i].id,
			'titulo': gifsTrending.data[i].title,
			'usuario': gifsTrending.data[i].username,
			'url': gifsTrending.data[i].images.original.url
		};

		const clase = 'resultado_imagenes';
		if ((numero < cantGif) && (numero >= 0)) {
			listadoTrending.appendChild(getGifHtml(arrayTrending, clase))
		}
		numero++;
	}

}

mostrarTrending(numero);


let listadoTrending = resultadoTrending;




const getGifHtml = (gif, clase) => {

	let arrayGif = gif;
	const divContenedor = document.createElement('div');

	if (arrayFavoritos[0]) {

		if (arrayFavoritos.find(f => f.id == gif.id)) {
			estadoFavorito = "corazon corazonActivo";
		} else {
			estadoFavorito = "corazon";
		}


	} else {

		estadoFavorito = "corazon";

	}


	const template =
		`<div class="${clase}">
	<img src="${gif.url}" alt="${gif.titulo}" class="imagen" corazon_gif="${estadoFavorito}" id_gif="${gif.id}" usuario_gif="${gif.usuario}" titulo_gif="${gif.titulo} "url_gif="${gif.url}" />
	<div class="overlay"></div>
	<div class="usuario">${gif.usuario}</div>
	<div class="titulo">${gif.titulo}</div>
	<div class="descarga" titulo_gif="${gif.titulo} "url_gif="${gif.url}"></div>
	<div class="${estadoFavorito}" id="corazon" corazon_gif="${estadoFavorito}" id_gif="${gif.id}" usuario_gif="${gif.usuario}" titulo_gif="${gif.titulo} "url_gif="${gif.url}"></div>
	<div class="ampliar" corazon_gif="${estadoFavorito}" id_gif="${gif.id}" usuario_gif="${gif.usuario}" titulo_gif="${gif.titulo} "url_gif="${gif.url}"></div>
	<div class="url" id_gif="${gif.url}"></div></div>`;

	divContenedor.innerHTML += template;
	divContenedor.querySelector('#corazon').addEventListener("click", agregarFavoritos);
	divContenedor.querySelector('.descarga').addEventListener("click", descargar);
	divContenedor.querySelector('.ampliar').addEventListener("click", ampliar);
	divContenedor.querySelector('.imagen').addEventListener("click", ampliar);

	return divContenedor;

}


/* -------------------------
	OBTENGO FAVORITOS
--------------------------*/



if (localStorage.getItem("gif_favoritos") !== null) {

	arrayFavoritos = JSON.parse(localStorage.getItem("gif_favoritos"));

}

if (arrayFavoritos.length > 0) {

	if (contenedorSinFavoritos) {

		contenedorSinFavoritos.innerHTML = "";

	}

}



/* -------------------------
	VER MAS
--------------------------*/

if (botonVerMas) {

	botonVerMas.addEventListener("click", function () {

		ocultos = Array.from(document.querySelectorAll(".ocultar"));

		ocultos.forEach(function (item, index) {

			if (index < 12) { item.classList.remove('ocultar'); }

			if (document.querySelectorAll('.ocultar').length === 0) { botonVerMas.style.display = "none"; }

		});


	});

}


/* -------------------------
	MOVER GIFS TRENDING
--------------------------*/

botonSliderDerecha.addEventListener("click", function () {

	numero++;
	mostrarTrending(numero);

});

botonSliderIzquierda.addEventListener("click", function () {

	numero--;
	mostrarTrending(numero);

});

