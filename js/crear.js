
let grabacion = 0 ;
let grabador;
let grabando = false;

/* -------------------------
    OBTENGO VIDEO
--------------------------*/


function getVideoGrabacion () {
	
    navigator.mediaDevices.getUserMedia({
		audio: false,
		video: { 
			height: { max: 480 }
		}
	})
    .then(function(stream) {
		
		h1Crear.innerHTML= "";
		h3Crear.innerHTML= "";
		video.style.display = "block";
		botonCrear.style.display = "flex";
		botonCrear.innerHTML= "Grabar";
		video.srcObject = stream;
		video.play();
		grabacion=1;
		
		botonCrear.addEventListener('click', () => {
			
			if(grabacion == 1){
				
				grabando = !grabando;
				paso1.style.background="var(--background)";
				paso1.style.color="var(--color-texto)";
				paso2.style.background="var(--color-texto)";
				paso2.style.color="var(--background)";
				botonCrear.innerHTML= "Finalizar";
				
				
				if (grabando === true) {
					this.disabled = true;
					grabador = RecordRTC(stream, {
						type: 'gif',
						frameRate: 1,
						quality: 10,
						width: 360,
						hidden: 240,
						onGifRecordingStarted: function() {
							console.log('Comenzo a Grabar')
						},
					});
					
					grabador.startRecording();
					transcurrido()
					
					grabador.camera = stream; 
					
					} else {
					this.disabled = true;
					grabador.stopRecording(detenerGrabacion);
					grabando = false;  
					grabacion = 2 ;
					
					console.log('Termino de Grabar')
				}
				
			}
			
		});
		
		
	});
}

/* -------------------------
    DETENER GRABACION
--------------------------*/


function detenerGrabacion() {
	
	grabador.camera.stop();
	
	let form = new FormData();
	form.append("file", grabador.getBlob(), 'creado.gif');
	reloj.innerHTML="REPETIR CAPTURA";
	botonCrear.innerHTML= "Subir";	
	video.style.display = "none";
	previsualizar.style.display="flex";
	
	
	botonCrear.addEventListener('click', () => {
		if(grabacion == 2){
			subirGif(form)
			console.log('Subiendo Gif');
			
			overPrevisualizar.style.display="flex";
			overPrevisualizar.style.backgroundImage=" var(--cargando)";
			overPrevisualizar.style.backgroundRepeat = "no-repeat";
			overPrevisualizar.style.backgroundSize = "22px";
			overPrevisualizar.style.backgroundPosition = "50% 40%";
			
		}
	})
	
	objectURL = URL.createObjectURL(grabador.getBlob());
	previsualizar.src = objectURL;
	previsualizar.classList.remove('ocultar');
	
	grabador.destroy();
	grabador = null;
	
}

/* -------------------------
	INICIO PROCESO
--------------------------*/

botonCrear.addEventListener('click', () => {
	
	if(grabacion == 0){
		
		botonCrear.style.display = "none";
		luzCamara.style.display = "block";
		paso1.style.background="var(--color-texto)";
		paso1.style.color="var(--background)";
		h1Crear.innerHTML= "¿Nos das acceso a tu cámara?";
		h3Crear.innerHTML= "El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.";
		getVideoGrabacion();
		
		
	}
	
	
});


/* -------------------------
	REPETIR PROCESO
--------------------------*/

reloj.addEventListener('click', () => {
	
	location.reload();
	getVideoGrabacion()
	
	
})

/* -------------------------
	TIEMPO TRANSCURRIDO
--------------------------*/

function transcurrido() {
	let segundos = 0;
	let minutos = 0;
	let timer = setInterval(() => {
		if (grabando) {
			if (segundos < 60) {
				if (segundos <= 9) {
					segundos = '0' + segundos;
				}
				reloj.innerHTML=`00:00:0${minutos}:${segundos}`;
				segundos++;
				} else {
				minutos++;
				segundos = 0;
			}
		}
		else {
			clearInterval(timer)
		}
	}, 1000);
} 

/* -------------------------
	SUBO GIF
--------------------------*/

function subirGif(gif) {
	
	paso2.style.background="var(--background)";
	paso2.style.color="var(--color-texto)";
	paso3.style.background="var(--color-texto)";
	paso3.style.color="var(--background)";
	botonCrear.innerHTML= "Subiendo Gif";
	
	
	fetch('https://upload.giphy.com/v1/gifs?api_key=bYQ1Vfn6G2NKpWha0cAgVmdsArrnZiSz', {
		method: 'POST',
		body: gif,
		}).then(res => {
		console.log(res.status)
		if (res.status != 200 ) {}
		return res.json();  
		
		}).then(data => {  

		const gifId = data.data.id;		
		
		console.log("id del gif: ", gifId);
		botonCrear.innerHTML= "Subido !!";
		overPrevisualizar.style.backgroundImage=" var(--exito)";
		overPrevisualizar.innerHTML="GIFO subido con éxito";
		reloj.innerHTML= "CREAR NUEVO";
		guardarGif(gifId);
		console.log("Guardo el Gif en localStorage");
	})
	.catch(error => {
		console.error('Error al subir el Gif:', error)
	});
}

/* -------------------------
	GUARDO LOCALSTORAGE
--------------------------*/


async function guardarGif (id) {
	
	let url = 'https://api.giphy.com/v1/gifs/'+id+'?api_key=bYQ1Vfn6G2NKpWha0cAgVmdsArrnZiSz';	
	
	let gifCreado = await traerGif(url);
	
	arrayMisGifs = [];
	
	
	if (localStorage.getItem("misGifosLocalStorage") !== null){
		
		arrayMisGifs = JSON.parse(localStorage.getItem("misGifosLocalStorage"));		
		
	}	
	
	arrayGif = { 'id': id,
		'titulo': gifCreado.data.title,
		'usuario': gifCreado.data.username ,
	'url': gifCreado.data.images.original.url };
	
	arrayMisGifs.push(arrayGif);
	
	localStorage.setItem("misGifosLocalStorage", JSON.stringify(arrayMisGifs));
	
/* -------------------------
AGREGO BOTONES DESCARGA Y URL
--------------------------*/	
	
	const url_gif = gifCreado.data.images.original.url;
	
	link.style.opacity = 1;
	link.setAttribute("url_gif", url_gif);
	descargaGif.setAttribute("url_gif", url_gif);
	descargaGif.setAttribute("titulo_gif", "gif");
	descargaGif.style.opacity = 1;
	descargaGif.style.zIndex = 2;
	descargaGif.style.zIndex = 2;
	descargaGif.style.top = "25%";
	descargaGif.style.zIndex = 2;
	descargaGif.style.left = "60%";
	
	console.log("Proceso Terminado");
	
}


/* -------------------------
	ACCIONES EN BOTONES
--------------------------*/

descargaGif.addEventListener( "click", descargar);  


link.addEventListener('click', (evento) => {
	
	let url_gif = evento.target.attributes.getNamedItem('url_gif').value;
	let aux = document.createElement("input");
	aux.value =url_gif;
	document.body.appendChild(aux);
	aux.select();
	document.execCommand("copy");
	document.body.removeChild(aux);
	alert("Link del Gif Copiado al Portapapeles");
	
});
