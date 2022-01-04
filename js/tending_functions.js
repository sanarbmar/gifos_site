/* -------------------------
	AMPLIAR MODAL
--------------------------*/
const ampliada = document.querySelector('.imagen_ampliada');
const cerrarModal = document.querySelector('.cerrar_modal');

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

/* -------------------------
	AGREGO O QUITO DE FAVORITOS
--------------------------*/

function agregarFavoritos(evento){
	
	let id_gif = evento.target.attributes.getNamedItem('id_gif').value;
	let url_gif = evento.target.attributes.getNamedItem('url_gif').value;
	let titulo_gif = evento.target.attributes.getNamedItem('titulo_gif').value;
	let usuario_gif = evento.target.attributes.getNamedItem('usuario_gif').value;
	let corazon_gif = evento.target.className;
	
	if ( corazon_gif != 'corazon' ) { 
		
		evento.target.setAttribute("class", "corazon");
		
		for (i=0 ; i < arrayFavoritos.length ; i++ ){
			
			if(arrayFavoritos[i].id == id_gif){	
				
				arrayFavoritos.splice( i, 1 );
				
			}
		}
		
		localStorage.setItem("gif_favoritos", JSON.stringify(arrayFavoritos));
		
		} else {
		
		let fav ={"id":id_gif,
			"titulo": titulo_gif ,
			"usuario" : usuario_gif ,
		"url" : url_gif };
		
		
		arrayFavoritos.push(fav);
		
		localStorage.setItem("gif_favoritos", JSON.stringify(arrayFavoritos));		
		
		evento.target.setAttribute("class", "corazon corazonActivo");
		
		
	}
	
	
}

/* -------------------------
	MOSTRAR FAVORITOS
--------------------------*/

function mostrarFavoritos() {

	let cantidadFavoritos = arrayFavoritos.length;

	if (cantidadFavoritos > 12) {
		botonVerMas.style.display = "block";
	}

	const clase = 'resultado_imagenes_busqueda';

	for (i = 0; i < cantidadFavoritos; i++) {

		misFavoritos.appendChild(getGifHtml(arrayFavoritos[i], clase));


	}

	let items = Array.from(document.querySelectorAll(".resultado_imagenes_busqueda"));

	let cantidad = 12;

	items.forEach(function (item, index) {

		if (index > cantidad - 1) {
			item.classList.add('ocultar');
		}


	});


}





if (misFavoritos) {

	mostrarFavoritos()

}

/* -------------------------
    OBTENGO MIS GIFS
--------------------------*/

arrayMisGifs = [];

if (localStorage.getItem("misGifosLocalStorage") !== null){
	
	arrayMisGifs = JSON.parse(localStorage.getItem("misGifosLocalStorage"));		
	
} 		

if(arrayMisGifs.length > 0){
	
	if(contenedorSinGif){
		
		contenedorSinGif.innerHTML = "";			
		
	} 
	
}


/* -------------------------
    MOSTRAR MIS GIFS
--------------------------*/

function mostrarMisGifs(){
	
	let cantidadGif = arrayMisGifs.length;
	
	if ( cantidadGif > 12 ){botonVerMas.style.display = "block";}
	
	const clase = 'resultado_imagenes_busqueda';			
	
	for (i = 0; i < cantidadGif; i++){
		
		misGifs.appendChild(getGifHtml(arrayMisGifs[i] , clase))	
		
		
	}
	
	let items = Array.from(document.querySelectorAll(".resultado_imagenes_busqueda"));
	
	cantidad = 12;
	
	items.forEach(function (item, index) {
		
		if (index > cantidad - 1) {
			item.classList.add('ocultar');
		}
		
		
	});
	
	
}	


if(misGifs){
	
	mostrarMisGifs()
	
}

/* darkmodeButton.onclick */