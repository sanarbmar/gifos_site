/* -------------------------
	DECLARACIONES
--------------------------*/

const ampliada = document.querySelector('.imagen_ampliada');
const body = document.querySelector('.body');
const botonSliderIzquierda = document.getElementById("boton_slider_izquierda");
const botonSliderDerecha = document.getElementById("boton_slider_derecha");
const botonVerMas = document.getElementById("boton_ver_mas");
const botonCrear = document.getElementById("boton_crear");
const cerrarModal = document.querySelector('.cerrar_modal');
const contenedorBusqueda = document.querySelector('.contenedor_busqueda');
const contenedorSinFavoritos = document.querySelector('.contenedor_sin_favoritos');
const contenedorSinGif = document.querySelector('.contenedor_sin_gifos');
const contenedorVideo = document.querySelector('.contenedor_video');
const contenedorSugerencias = document.getElementById('contenedor_sugerencias');
const corazon = document.querySelector('#corazon_modal');
const descarga = document.querySelector('.descarga_modal');
const descargaGif = document.querySelector('.descarga');
const inputBusqueda = document.querySelector(".input_busqueda");
const logo = document.querySelector(".logo");
const link = document.querySelector(".link");
const modo = document.getElementById("modo");
const menuHamburguesa = document.querySelector('.menu_hamburguesa');
const menu = document.querySelector('.menu');
const misFavoritos = document.querySelector('.mis_favoritos');
const misGifs = document.querySelector('.mis_gifos');
const modal = document.querySelector('.modal');
const nombreModo = document.querySelector('#nombreModo');
const resultadoTrending = document.querySelector(".resultado_trending");
const textoBusqueda = document.querySelector('.texto_busqueda');
const trending = document.querySelector('.trending')
const titulo = document.querySelector('.titulo_modal');
const usuario = document.querySelector('.usuario_modal');
const paso1 = document.querySelector('.uno');
const paso2 = document.querySelector('.dos');
const paso3 = document.querySelector('.tres');
const reloj = document.querySelector('.reloj');
const luzCamara = document.querySelector('.luz_camara');
const h1Crear = document.querySelector('.h1_crear');
const h3Crear = document.querySelector('.h3_crear');
const video = document.querySelector('.video')
const grabar = document.querySelector('.grabar')
const previsualizar = document.querySelector('.previsualizar')
const overPrevisualizar = document.querySelector('.overlay_previsualizar')

let numero = 0;

if (localStorage.getItem("modoElegido") == null){ localStorage.setItem("modoElegido", "Diurno");}

let modoElegido = localStorage.getItem("modoElegido");


/* -------------------------
	FETCH
--------------------------*/


const fetchGif = async (url) => {
	
	const respuesta = await fetch(url)
	data = await respuesta.json();
	return await data;
	
}

const traerGif = async (url) => {
	
	const resultado = await fetchGif(url)
	return resultado
	
}


/* -------------------------
	TEMPLATE
--------------------------*/

const getGifHtml = (gif ,clase)=>{
	
	let	arrayGif= gif;
	const divContenedor = document.createElement('div');
	
	if (arrayFavoritos[0]){
		
		if(arrayFavoritos.find(f => f.id == gif.id)){estadoFavorito ="corazon corazonActivo";}else{estadoFavorito ="corazon";}
		
		
		} else {
		
		estadoFavorito ="corazon";
		
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
		
	divContenedor.innerHTML = template;
	divContenedor.querySelector('#corazon').addEventListener("click", agregarFavoritos);   
    divContenedor.querySelector('.descarga').addEventListener( "click", descargar);  
	divContenedor.querySelector('.ampliar').addEventListener("click", ampliar);  	
	divContenedor.querySelector('.imagen').addEventListener("click", ampliar);  
	
	return divContenedor;
	
}

/* -------------------------
	MODO NOCTURNO
--------------------------*/	

if (modoElegido=="Nocturno") {
	body.classList.toggle("nocturno");
	nombreModo.textContent = 'Modo Diurno';
} else {nombreModo.textContent = 'Modo Nocturno';}


modo.addEventListener("click", function() {
	
	let modoElegido = localStorage.getItem("modoElegido");
	
	body.classList.toggle("nocturno");
	
	if(body.classList.value=="body diurno"){menuHamburguesa.setAttribute("style", "background-image: url('imagenes/close.svg')");
		
	}  else{menuHamburguesa.setAttribute("style", "background-image: url('imagenes/close-modo-noct.svg')");}
	
	if (modoElegido == "Diurno") {
		localStorage.setItem("modoElegido", "Nocturno");
		nombreModo.textContent = 'Modo Diurno';
		
		}else {
		
		localStorage.setItem("modoElegido", "Diurno");
		nombreModo.textContent = 'Modo Nocturno';
		
	}  
	
});

/* -------------------------
	MENU HAMBURGUESA
--------------------------*/


menuHamburguesa.addEventListener("click", function() {	
	
	if(menu.style.display ==="block"){
		
		menu.style.display = "none";
		menu_hamburguesa.setAttribute("style", "background-image: url('imagenes/burger.svg')");
		menu_hamburguesa.setAttribute("style", "color: #FFFFFF");
		
		} else {
		
		if (modoElegido == "Diurno"){menu_hamburguesa.setAttribute("style", "background-image: url('imagenes/close.svg')");
			
			}else { 
			
			menu_hamburguesa.setAttribute("style", "background-image: url('imagenes/close-modo-noct.svg')");
			
		}
		
		menu.style.display = "block";
		
	}
	
});

/* -------------------------
	VER MAS
--------------------------*/

if(botonVerMas){
	
	botonVerMas.addEventListener("click", function() {	
		
		ocultos = Array.from(document.querySelectorAll(".ocultar"));
		
		ocultos.forEach(function (item, index) {
			
			if (index < cantidad) { item.classList.remove('ocultar'); }
			
			if (document.querySelectorAll('.ocultar').length === 0) { botonVerMas.style.display = "none";}
			
		});
		
		
	});
	
}

/* -------------------------
	LINK EN LOGO
--------------------------*/

logo.addEventListener("click", function() { window.location = "index.html"; });

/* -------------------------
	AMPLIAR MODAL
--------------------------*/

function ampliar(evento){
	
	modal.style.display = "flex";
	
	let id_gif = evento.target.attributes.getNamedItem('id_gif').value;
	let url_gif = evento.target.attributes.getNamedItem('url_gif').value;
	let titulo_gif = evento.target.attributes.getNamedItem('titulo_gif').value;
	let usuario_gif = evento.target.attributes.getNamedItem('usuario_gif').value;	
	let corazon_gif = evento.target.attributes.getNamedItem('corazon_gif').value;	
	
	ampliada.setAttribute("style", "background-image: url('"+url_gif+"')");
	ampliada.style.backgroundRepeat = "no-repeat";
	ampliada.style.backgroundSize = "100% 100%";
	
	titulo.innerHTML = titulo_gif;
	
	usuario.innerHTML = usuario_gif;
	
	corazon.setAttribute("class", corazon_gif);
	corazon.setAttribute("titulo_gif", titulo_gif);
	corazon.setAttribute("usuario_gif", usuario_gif);
	corazon.setAttribute("id_gif", id_gif);
	corazon.setAttribute("url_gif", url_gif);
	corazon.addEventListener("click", agregarFavoritos);
		
	descarga.setAttribute("url_gif", url_gif);
	descarga.setAttribute("titulo_gif", titulo_gif);
	// descarga.addEventListener( "click", descargar); 
	document.querySelector('.descarga_modal').addEventListener( "click", descargar);
	// descarga.addEventListener("click", alert("hola"));
	
}

if(cerrarModal){
	
	cerrarModal.addEventListener("click", function() {
		
		modal.style.display = "none";
		
	});
	
}

/* -------------------------
	DESCARGA
--------------------------*/

function descargar(evento){ 	

	let url = evento.target.attributes.getNamedItem('url_gif').value;
	let nombre = evento.target.attributes.getNamedItem('titulo_gif').value;
	let xhr = new XMLHttpRequest();
		
		xhr.open("GET", url, true);
		xhr.responseType = "blob";
		
		xhr.onload = function(){
		
			let urlCreator = window.URL || window.webkitURL;
			let imageUrl = urlCreator.createObjectURL(this.response);
			let tag = document.createElement('a');
			tag.href = imageUrl;
			tag.download = nombre;
			document.body.appendChild(tag);
			tag.click();
			document.body.removeChild(tag);
		
		}
		
		xhr.send();
		
}

