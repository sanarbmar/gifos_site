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