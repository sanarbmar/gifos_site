// DOM create GIFOs
const $createGifSection = document.querySelector('#createGifSection');
const $crearGifTitle = document.querySelector('#crearGif_title')
const $crearGifText = document.querySelector('#crearGif_text');
const $step1 = document.querySelector('#step-1');
const $step2 = document.querySelector('#step-2');
const $step3 = document.querySelector('#step-3');
const $buttonComenzar = document.querySelector('#button--comenzar');
const $buttonGrabar = document.querySelector('#button--grabar');
const $buttonFinalizar = document.querySelector('#button--finalizar');
const $buttonSubirGif = document.querySelector('#button--subirGif');
const $timer = document.querySelector('#timer-recording');
const $repeatBtn = document.querySelector('#repeatShot');
const $overlay = document.querySelector('#overlay')
const $overlayStatusIcon = document.querySelector('#overlay_status-icon');
const $overlayStatusText = document.querySelector('#overlay_status-text');
const $video = document.querySelector('#recording_video');
const $recordedGifo = document.querySelector('#recorded_gifo');
const $empty__container = document.querySelector('.empty__container');
const $misGifosMenu = document.querySelector('#misGifosMenu');
const $misGifosSection = document.querySelector('#misGifosSection');
const $misGifosContainer = document.querySelector('#misGifos-container');
const $noGifContainer = document.querySelector('#noGif_container');
const resultadob = document.querySelector(".resultado_imagenes_busqueda")
const $camera = document.querySelector('#camera');
const $celuloide = document.querySelector('#celuloide');

$buttonFinalizar.style.display = 'none';
$buttonSubirGif.style.display = 'none';
$overlay.style.display = 'none';
$buttonGrabar.style.display = 'none';
let recorder;
let blob;
let form = new FormData();
let arrMyGifos = [];

// seteo del timer
let timer;
let hours = '00';
let minutes = '00';
let seconds = '00';

// TODO función que ejecuta la cámara y se setea la API
const getStreamAndRecord = async () => {
    $crearGifTitle.innerHTML = `¿Nos das acceso <br> a tu cámara?`;
    $crearGifText.innerHTML = `El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.`;
    $buttonComenzar.style.visibility = 'hidden';
    $step1.classList.add('step-active');

    await navigator.mediaDevices
        .getUserMedia({
            audio: false,
            video: {
                height: { max: 480 }
            }
        })
        .then((mediaStreamObj) => {
            $crearGifTitle.classList.add('hidden');
            $crearGifText.classList.add('hidden');
            $step1.classList.remove('step-active');
            $step2.classList.add('step-active');
            $buttonComenzar.style.display = 'none';
            $buttonGrabar.style.display = 'block';
            $video.classList.remove('hidden');
            $video.srcObject = mediaStreamObj;
            $video.play();

            recorder = RecordRTC(mediaStreamObj, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function () {
                    console.log('started');
                }
            });
        })
        .catch((err) => console.log(err));
};



// TODO función para empezar
const createGifo = () => {
    console.log('está grabando');
    $buttonGrabar.style.display = 'none';
    $buttonFinalizar.style.display = 'block';
    $timer.classList.remove('hidden');
    $repeatBtn.classList.add('hidden');
    recorder.startRecording();
    timer = setInterval(timerActive, 1000);
};



// TODO función para parar la grabación
const stopCreatingGif = () => {
    $video.classList.add('hidden');
    $recordedGifo.classList.remove('hidden');
    recorder.stopRecording(() => {
        blob = recorder.getBlob();
        $recordedGifo.src = URL.createObjectURL(blob);

        form.append('file', recorder.getBlob(), 'myGif.gif');
        console.log(form);
    });

    $buttonFinalizar.style.display = 'none';
    $buttonSubirGif.style.display = 'block';
    $timer.classList.add('hidden');
    $repeatBtn.classList.remove('hidden');

    // acá debería limpiar y volver a setear el cronómetro
    clearInterval(timer);
    hours = '00';
    minutes = '00';
    seconds = '00';
    $timer.innerText = `${hours}:${minutes}:${seconds}`;
};



// TODO función para subir a Giphy y almacenar el gif en Mis gifos
const uploeadCreatedGif = async () => {
    $overlay.style.display = 'flex';
    $step2.classList.remove('step-active');
    $step3.classList.add('step-active');
    $repeatBtn.classList.add('hidden');
    $buttonSubirGif.style.visibility = 'hidden';

    await fetch(`https://upload.giphy.com/v1/gifs?api_key=bYQ1Vfn6G2NKpWha0cAgVmdsArrnZiSz`, {
        method: 'POST',
        body: form,
    })
        .then((response) => response.json())
        .then((myGif) => {

            let myGifoId = myGif.data.id
            console.log(myGif.data.id);
            $overlayStatusIcon.src = 'img/check.svg';
            $overlayStatusText.innerHTML = 'GIFO subido con éxito';
            $buttonFinalizar.display= "block";
            let buttonsMyGif = document.createElement('div');
            buttonsMyGif.classList.add('overlay__buttons');
            buttonsMyGif.innerHTML = `<div class="btns downloadOverlay" onclick="downloadCreatedGif('${myGifoId}')"></div> 
			<div class="btns linkOverlay" onclick="displayMisGifosSection(event)"></div>`;
            $overlay.appendChild(buttonsMyGif);

            arrMyGifos.push(myGifoId);
            console.log(arrMyGifos);

            let myGifos = localStorage.setItem('MyGifs', JSON.stringify(arrMyGifos));
            console.log(myGifos);
        })
        .catch((err) => {
            console.error(err);
        });
};



const displayMisGifosSection = (event) => {
    event.preventDefault();
    $misGifosSection.classList.remove('hidden');


    $createGifSection.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    displayMiGifos();

    if (arrMyGifos == 0 || arrMyGifos == null) {
        $noGifContainer.classList.remove('hidden');
        $misGifosContainer.classList.add('hidden');
    } else {
        $noGifContainer.classList.add('hidden');
        $misGifosContainer.classList.remove('hidden');
    }
};


const displayMiGifos = () => {
    $misGifosContainer.innerHTML = '';

    arrMyGifos = JSON.parse(localStorage.getItem('MyGifs'));

    console.log(arrMyGifos);
    if (arrMyGifos == null) {
        arrMyGifos = [];
    } else {
        for (let i = 0; i < arrMyGifos.length; i++) {
            fetch(
                `https://api.giphy.com/v1/gifs?ids=${arrMyGifos[i]}&api_key=bYQ1Vfn6G2NKpWha0cAgVmdsArrnZiSz`
            )
                .then((response) => response.json())
                .then((misGifosGiphy) => {
                    console.log(misGifosGiphy);
                    console.log(typeof misGifosGiphy.data[0].id);

                    const gifContainer = document.createElement('div');
                    gifContainer.classList.add('resultado_imagenes_busqueda');
                    gifContainer.innerHTML = `
				
                <img src="${misGifosGiphy.data[0].images.original.url}"
                    alt="Fashion Friends GIF by Fia Oruene" class="imagen" corazon_gif="corazon"
                    id_gif="khExkapMYhpvhO6F0c" usuario_gif="FiaOruene"
                    titulo_gif="Fashion Friends GIF by Fia Oruene "
                    url_gif="${misGifosGiphy.data[0].images.original.url}">
                <div class="overlay"></div>
                <div class="usuario">FiaOruene</div>
                <div class="titulo">Fashion Friends GIF by Fia Oruene</div>
                <div class="descarga" titulo_gif="Fashion Friends GIF by Fia Oruene "
                    url_gif="${misGifosGiphy.data[0].images.original.url}">
                </div>
                <div class="corazon" id="corazon" corazon_gif="corazon" id_gif="khExkapMYhpvhO6F0c"
                    usuario_gif="FiaOruene" titulo_gif="Fashion Friends GIF by Fia Oruene "
                    url_gif="${misGifosGiphy.data[0].images.original.url}">
                </div>
                <div class="ampliar"  id_gif="khExkapMYhpvhO6F0c" usuario_gif="FiaOruene"
                    titulo_gif="Fashion Friends GIF by Fia Oruene "
                    url_gif="${misGifosGiphy.data[0].images.original.url}">
                </div>
                <div class="url"
                    id_gif="${misGifosGiphy.data[0].images.original.url}">
                </div>
            
					`;
                    $misGifosContainer.appendChild(gifContainer);
                    console.log(gifContainer)
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }
};

// TODO función para repetir
const repeatRecordingGif = (event) => {
    event.preventDefault();
    recorder.clearRecordedData();
    $step2.classList.add('step-active');
    $repeatBtn.classList.add('hidden');
    $buttonGrabar.style.display = 'block';
    $buttonSubirGif.style.display = 'none';
    $video.classList.remove('hidden');
    $recordedGifo.classList.add('hidden');

    navigator.mediaDevices
        .getUserMedia({
            audio: false,
            video: {
                height: { max: 480 }
            }
        })
        .then((mediaStreamObj) => {
            $video.srcObject = mediaStreamObj;
            $video.play();

            recorder = RecordRTC(mediaStreamObj, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function () {
                    console.log('started');
                }
            });
        })
        .catch((err) => console.log(err));
};


// TODO función para descargar el gif creado
const downloadCreatedGif = async (myGifId) => {
    let blob = await fetch(
        `https://media.giphy.com/media/${myGifId}/giphy.gif`
    ).then((img) => img.blob());
    invokeSaveAsDialog(blob, 'My-Gif.gif');
};

// TODO función para el timer
function timerActive() {
    seconds++;

    if (seconds < 10) seconds = `0` + seconds;

    if (seconds > 59) {
        seconds = `00`;
        minutes++;

        if (minutes < 10) minutes = `0` + minutes;
    }

    if (minutes > 59) {
        minutes = `00`;
        hours++;

        if (hours < 10) hours = `0` + hours;
    }

    $timer.innerHTML = `${hours}:${minutes}:${seconds}`;
}
// Cuando clickea comenzar, se ejecuta la cámara y se setea la API
$buttonComenzar.addEventListener('click', getStreamAndRecord);

$buttonGrabar.addEventListener('click', createGifo);

$buttonFinalizar.addEventListener('click', stopCreatingGif);

$buttonSubirGif.addEventListener('click', uploeadCreatedGif);

$misGifosMenu.addEventListener('click', displayMisGifosSection);

$repeatBtn.addEventListener('click', repeatRecordingGif);

/* <img class="gif" src="${misGifosGiphy.data[0].images.original.url}" alt="Gif Creado por el usuario">

					<div class="gifActions">
						<div class="gifActions__btn">
							<div class="btn remove" onclick="removeMyGifos('${misGifosGiphy.data[0].id}')"></div>
							<div class="btn download" onclick="downloadGif('${misGifosGiphy.data[0].images.original.url}','Gif')"></div>
							<div class="btn maximize" onclick="maximizeFavoriteGif('${misGifosGiphy.data[0].images.original.url}','User','Gif')"></div>
						</div>
						<div class="gif__info">
							<p class="gif_user">User</p>
							<p class="gif_title">Gif</p>
						</div>
					</div> */