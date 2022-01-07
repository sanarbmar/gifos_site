/* -------------------------
	SUGERENCIAS
--------------------------*/

const traerSugerencias = async letras => {
	const url = `https://api.giphy.com/v1/tags/related/${letras}?api_key=bYQ1Vfn6G2NKpWha0cAgVmdsArrnZiSz&lang=es`;
	const response = await fetch(url);
	const jsonRes = await response.json();
	return jsonRes;
}

const traerSugerenciasElementos = (sugerencias) =>{
	const arraySugerencias = []
	sugerencias.data.forEach(sug => {
		const elementoDiv = document.createElement('div');
		elementoDiv.innerHTML = `<li class="icono_busqueda">${sug.name}</li>`;
		elementoDiv.addEventListener('click',(ev)=>{
			let input = inputBusqueda ;
			input.value =ev.target.textContent;
			let evento = document.createEvent('Event');
			evento.initEvent('keypress');
			evento.which = evento.keyCode = 13;
			input.dispatchEvent(evento);
			contenedorSugerencias.innerHTML = ''; 
			
		})
		arraySugerencias.push(elementoDiv)
	})
	return arraySugerencias;
}

const actualizarSugerencias = async (ev)=>{
	
	const terms = ev.target.value;
	
	if (terms == "") {
		contenedorSugerencias.innerHTML = '';
		inputBusqueda.style.borderBottom ='0px solid #9CAFC3';
		contenedorBusqueda.innerHTML = '';
		contenedorBusqueda.style.margin = '0';
		textoBusqueda.innerHTML ='';
		botonVerMas.style.display = "none";
		trending.style.display = "block";
	}
	
	if (terms.length <= 3) return;
	inputBusqueda.style.borderBottom ='1px solid #9CAFC3';
	const sugerenciasJson = await traerSugerencias(terms);
	const sugerenciaElementos = traerSugerenciasElementos(sugerenciasJson);
	contenedorSugerencias.innerHTML = '';
	sugerenciaElementos.forEach(elem => {
		contenedorSugerencias.appendChild(elem)
	})
}

/* -------------------------
	BUSCAR GIF
--------------------------*/


if(inputBusqueda){
	
	inputBusqueda.addEventListener('input',actualizarSugerencias);
	
	inputBusqueda.addEventListener('keypress' ,busqueda);
	
}


function busqueda(e) {
	
	if ((e.key === 'Enter') || (e.keyCode === 13)) {
		
		const texto = inputBusqueda.value;
		if (texto==''){return;}
		
		funcionMostarBusqueda(texto);
		mostrarBusqueda(texto);
		
	}
}



async function mostrarBusqueda(texto){
	
	let url = 'https://api.giphy.com/v1/gifs/search?api_key=bYQ1Vfn6G2NKpWha0cAgVmdsArrnZiSz&q='+texto+'&limit=&offset=0&rating=g&lang=es'
	
	let gifsBusqueda = await traerGif(url);
	
	const cantGif =gifsBusqueda.data.length;
	
	let listadoBusqueda = contenedorBusqueda;
	
	if ( cantGif == 0 ){
		
		textoBusqueda.innerHTML ="Lorem ipsum";
		const errorImg = document.createElement("img");
		const errorP = document.createElement("p");
		errorP.style.fontSize="22px";
		errorP.style.color="#50E3C2";
		errorP.innerHTML="Intenta con otra Cosa";
		errorImg.setAttribute('src', "imagenes/icon-busqueda-sin-resultado.svg");
		errorImg.style.width='150px';
		errorImg.style.height='150px';
		errorImg.style.display='flex';
		errorImg.style.justifyContent= 'center';
		errorImg.style.paddingTop='150px';
		errorImg.style.marginLeft='auto';
		errorImg.style.marginRight='auto';
		textoBusqueda.appendChild(errorImg);
		textoBusqueda.appendChild(errorP);
		
		} else{
		
		if ( cantGif > 12 ){botonVerMas.style.display = "block";}
		
		const clase = 'resultado_imagenes_busqueda';			
		
		for (i = 0; i < cantGif; i++){
			
			arrayBusqueda = { 'id': gifsBusqueda.data[i].id,
				'titulo': gifsBusqueda.data[i].title,
				'usuario': gifsBusqueda.data[i].username ,
			'url': gifsBusqueda.data[i].images.original.url };
			
			listadoBusqueda.appendChild(getGifHtml(arrayBusqueda , clase))		
			
		}
		
		let items = Array.from(document.querySelectorAll(".resultado_imagenes_busqueda"));
		
		cantidad = 12;
		
		items.forEach(function (item, index) {
			
			if (index > cantidad - 1) {
				item.classList.add('ocultar');
			}
			
			
		});
		
		
	}
	
}


function funcionMostarBusqueda(titulo){
	
	textoBusqueda.innerHTML = titulo;
	trending.style.display = "none";	
	contenedorBusqueda.style.margin = "70px 0 ";	
	contenedorBusqueda.innerHTML = '';
	contenedorSugerencias.innerHTML = '';
	
}
