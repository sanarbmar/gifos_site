/* quedo en ponerle el title al gifo */
const searchWrapper = document.querySelector(".search-input");
const inputBox = document.querySelector("#search-input");
const suggBox = document.querySelector(".autocom-box");
const resultados = document.getElementById("resultados");
const searchButton = document.getElementById("searchButton");
const closeButton = document.getElementById("closeButton");
const userTitle = document.getElementById("user-title");
let searchUrl = "https://api.giphy.com/v1/gifs/search?api_key=bYQ1Vfn6G2NKpWha0cAgVmdsArrnZiSz&limit=12&offset=0&rating=g&lang=en&q=";

async function getTitles(e) {
    let userData = e.target.value;//datos ingresados por el usuario
    let emptyArray = [];
    let searchSuggestions = [];
    let searchITitles = [];
    let url = searchUrl + userData;
    let response = await fetch(url);
    let responseJson = await response.json();
    let data = responseJson.data;

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
            return data = `<li>${data}</li>`;
        });
        //console.log(emptyArray);
        searchWrapper.classList.add("active");//mostrar div de autocompletar
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //AÑADIR UN ATRIBUTO DE ONCLICK EN TODAS LAS  LI
            allList[i].setAttribute("onclick", "select(this)");

        }
    } else {
        searchWrapper.classList.remove("active");//ocultar div de autocompletar
    }
};

async function getGifs() {
    let userData = inputBox.value;//datos ingresados por el usuario
    let searchSuggestions = [];
    let usersName = []
    let url = searchUrl + userData;
    let response = await fetch(url);
    let responseJson = await response.json();
    let data = responseJson.data;
    console.log(data);
    data.forEach(e => {

        searchSuggestions.push(e.images.original.url);
        usersName.push(e.username);
    });
    console.log(usersName);
    for (let i = 0; i < searchSuggestions.length; i++) {
        resultados.innerHTML += 
        `<div class="c-2">
            <img src="${searchSuggestions[i]}" alt="" id="gifo-slider">
        </div>`
        /* `<div id="card">
            <img src="${searchSuggestions[i]}" frameborder="0" id="iframe" >
        </div>` */
    }
    for (let j = 0; j < usersName.length; j++) {
       userTitle.innerHTML = `<h1 id="user-title">${usersName[j]}</h1>`;
       
        
    }
     //console.log(searchSuggestions);
    //return searchSuggestions;
};

function select(element) {
    let selectUserData = element.textContent;
    inputBox.value = selectUserData;//pasar los datos de la lista seleccionada por el usuario en el campo de texto
    searchWrapper.classList.remove("active");
    console.log(selectUserData);//el que escoje
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
    /* console.log(e.target.value); */
};

searchButton.addEventListener("click",e =>{
    getGifs();
    searchButton.style.display = "none";
    closeButton.style.display = "block";
});

closeButton.addEventListener("click", e => {
    resultados.innerHTML = " ";
    searchButton.style.display = "block";
    closeButton.style.display = "none"
});
