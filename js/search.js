/* quedo en ponerle el title al gifo */
const searchWrapper = document.querySelector(".search-input");
const inputBox = document.querySelector("#search-input");
const suggBox = document.querySelector(".autocom-box");
const resultado_search = document.querySelector(".resultado_search");
const searchButton = document.getElementById("searchButton");
const closeButton = document.getElementById("closeButton");
const lupaHidden = document.getElementById("lupa-hidden");
const userTitle = document.getElementById("user-title");
const verplus = document.getElementById("verplus");
let searchUrl = "https://api.giphy.com/v1/gifs/search?api_key=bYQ1Vfn6G2NKpWha0cAgVmdsArrnZiSz&limit=48&offset=0&rating=g&lang=en&q=";

async function getTitles(e) {
    let userData = e.target.value;//datos ingresados por el usuario
    let emptyArray = [];
    let searchSuggestions = [];
    let searchITitles = [];
    let url = searchUrl + userData;
    let response = await fetch(url);
    let responseJson = await response.json();
    let data = responseJson.data;
    userData.innerHTML += `<img src="img/icon-search.svg" alt="lupa" class="imagen-lupa">`
    data.forEach(e => {

        searchSuggestions.push(e.title)
        searchITitles.push(e.images.original.url);

    });
    /*  console.log(searchSuggestions);
     console.log(searchITitles); */
    //return searchSuggestions;

    if (userData) {
        emptyArray = searchSuggestions.filter((data) => {
            //filtrar el valor del array y el carácter del usuario a minúsculas y devolver solo las oraciones de palabras que son estrellas con la palabra ingresada por el usuario
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
            //console.log(emptyArray);
        });
        emptyArray = emptyArray.map((data) => {
            return data = `<li><i class="fas fa-search" id="imagen-lupa-2"></i>${data}</li>`;
        });
        //console.log(emptyArray);
        searchWrapper.classList.add("active");//mostrar div de autocompletar
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //AÑADIR UN ATRIBUTO DE ONCLICK EN TODAS LAS  LI
            allList[i].setAttribute("class", "lupa");
            allList[i].setAttribute("onclick", "select(this)");

        }
    } else {
        searchWrapper.classList.remove("active");//ocultar div de autocompletar
    }
};

async function getGifs() {
    let userData = inputBox.value;//datos ingresados por el usuario
    let searchSuggestions = [];
    let url = searchUrl + userData;
    let response = await fetch(url);
    let responseJson = await response.json();
    let data = responseJson.data;
    console.log(data);

    data.forEach(e => {
        resultado_search.innerHTML += `
        <div class="resultado_imagenes_busqueda">
                <img src="${e.images.original.url}"
                    alt="Fashion Friends GIF by Fia Oruene" class="imagen" corazon_gif="corazon"
                    id_gif="khExkapMYhpvhO6F0c" usuario_gif="FiaOruene"
                    titulo_gif="Fashion Friends GIF by Fia Oruene "
                    url_gif="${e.images.original.url}">
                <div class="overlay"></div>
                <div class="usuario">FiaOruene</div>
                <div class="titulo">Fashion Friends GIF by Fia Oruene</div>
                <div class="descarga" titulo_gif="Fashion Friends GIF by Fia Oruene "
                    url_gif="${e.images.original.url}">
                </div>
                <div class="corazon" id="corazon" corazon_gif="corazon" id_gif="khExkapMYhpvhO6F0c"
                    usuario_gif="FiaOruene" titulo_gif="Fashion Friends GIF by Fia Oruene "
                    url_gif="${e.images.original.url}">
                </div>
                <div class="ampliar"  id_gif="khExkapMYhpvhO6F0c" usuario_gif="FiaOruene"
                    titulo_gif="Fashion Friends GIF by Fia Oruene "
                    url_gif="${e.images.original.url}">
                </div>
                <div class="url"
                    id_gif="${e.images.original.url}">
                </div>
            </div>
    `

    });
    //console.log(searchSuggestions);
    //return searchSuggestions;
};

function select(element) {
    let selectUserData = element.textContent;
    inputBox.value = selectUserData;//pasar los datos de la lista seleccionada por el usuario en el campo de texto
    searchWrapper.classList.remove("active");
    //console.log(selectUserData);//el que escoje
    return selectUserData
};
function showSuggestions(list) {
    let listData;
    if (!list.length) {
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    } else {
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
};

// Si el usuario presiona cualquier tecla y suelta
inputBox.onkeyup = (e) => {
    getTitles(e);
    lupaHidden.style.display = "block";
    if (e.target.value === "") {
        lupaHidden.style.display = "none";
    }
    /* console.log(e.target.value); */
};

searchButton.addEventListener("click", e => {
    getGifs();
    searchButton.style.display = "none";
    closeButton.style.display = "block";
    lupaHidden.style.display = "none";
});


closeButton.addEventListener("click", e => {
    resultado_search.innerHTML = " ";
    searchButton.style.display = "block";
    closeButton.style.display = "none";
    lupaHidden.style.display = "none";
});

