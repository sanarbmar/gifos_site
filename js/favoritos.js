/* -------------------------
    OBTENGO FAVORITOS
--------------------------*/

arrayFavoritos = [];

if (localStorage.getItem("favLocalStorage") !== null){
	
	arrayFavoritos = JSON.parse(localStorage.getItem("favLocalStorage"));		
	
} 		

if(arrayFavoritos.length > 0){
	
	if(contenedorSinFavoritos){
		
		contenedorSinFavoritos.innerHTML = "";			
		
	} 
	
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
		
		localStorage.setItem("favLocalStorage", JSON.stringify(arrayFavoritos));
		
		} else {
		
		let fav ={"id":id_gif,
			"titulo": titulo_gif ,
			"usuario" : usuario_gif ,
		"url" : url_gif };
		
		
		arrayFavoritos.push(fav);
		
		localStorage.setItem("favLocalStorage", JSON.stringify(arrayFavoritos));		
		
		evento.target.setAttribute("class", "corazon corazonActivo");
		
		
	}
	
	
}





/* -------------------------
    MOSTRAR FAVORITOS
--------------------------*/

function mostrarFavoritos(){
	
	let cantidadFavoritos = arrayFavoritos.length;
	
	if ( cantidadFavoritos > 12 ){botonVerMas.style.display = "block";}
	
	const clase = 'resultado_imagenes_busqueda';			
	
	for (i = 0; i < cantidadFavoritos; i++){
		
		misFavoritos.appendChild(getGifHtml(arrayFavoritos[i] , clase))	
		
		
	}
	
	let items = Array.from(document.querySelectorAll(".resultado_imagenes_busqueda"));
	
	cantidad = 12;
	
	items.forEach(function (item, index) {
		
		if (index > cantidad - 1) {
			item.classList.add('ocultar');
		}
		
		
	});
	
	
}	


if(misFavoritos){
	
	mostrarFavoritos()
	
}	