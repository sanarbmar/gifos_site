/* -------------------------
    MOVER GIFS TRENDING
--------------------------*/

botonSliderDerecha.addEventListener("click", function() {	
	
	numero++;	
	mostrarTrending(numero);
	
});

botonSliderIzquierda.addEventListener("click", function() {
	
	numero--;	
	mostrarTrending(numero);	
	
});

/* -------------------------
	TRENDING
--------------------------*/

async function mostrarTrending(numero){
	
	let url = 'https://api.giphy.com/v1/gifs/trending?api_key=bYQ1Vfn6G2NKpWha0cAgVmdsArrnZiSz&limit=25&rating=g';
	
	let gifsTrending = await traerGif(url);
	
	resultadoTrending.innerHTML='';
	nuevoNumero = numero + 3;
	const cantGif =gifsTrending.data.length;
	
	for (i = numero; i < nuevoNumero; i++){
		
		arrayTrending = { 'id': gifsTrending.data[i].id,
			'titulo': gifsTrending.data[i].title,
			'usuario': gifsTrending.data[i].username ,
		'url': gifsTrending.data[i].images.original.url };
		
		const clase = 'resultado_imagenes';
		if((numero < cantGif) && (numero >= 0)){
			listadoTrending.appendChild(getGifHtml(arrayTrending ,clase))
		}
		numero++;
	}
	
}

mostrarTrending(numero);


let listadoTrending = resultadoTrending;