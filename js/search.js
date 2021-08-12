const searchWrapper = document.querySelector(".search-input");
const inputBox = document.querySelector("#search-input");
const suggBox = document.querySelector(".autocom-box");
const change = document.getElementById("change");
let searchUrl = "https://api.giphy.com/v1/gifs/search?api_key=bYQ1Vfn6G2NKpWha0cAgVmdsArrnZiSz&limit=12&offset=0&rating=g&lang=en&q=";

function select(element) {
    let selectUserData = element.textContent;
    let selectUserDataObject = element;
    inputBox.value = selectUserData;//passing the user selected list data in textfield
    searchWrapper.classList.remove("active");
    console.log(selectUserData);//el que escoje
    console.log(selectUserDataObject);
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


// if user press any key and release
inputBox.onkeyup = (e) => {
    let userData = e.target.value;//user entred data
    let emptyArray = [];
    let searchSuggestions = [];
    let searchIframes = [];
    let url = searchUrl+userData;
    //console.log(url);
    async function getFrames() {
        let response = await fetch(url);
        let responseJson = await response.json();
        let data = responseJson.data;

        data.forEach(e => {

            searchSuggestions.push(e.title)
            searchIframes.push(e.images.original.url);
       
        });
       /*  console.log(searchSuggestions);
        console.log(searchIframes); */
        //return searchSuggestions;

        if (userData) {
            emptyArray = searchSuggestions.filter((data) => {
                //filtering array value and user char to lowercase and return only those word sentc which are stars with user entered  word
                return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
                //console.log(emptyArray);
            });
            emptyArray = emptyArray.map((data) => {
                return data = `<li>${data}</li>`;
            });
            //console.log(emptyArray);
            searchWrapper.classList.add("active");//show autocomplete div
            showSuggestions(emptyArray);
            let allList = suggBox.querySelectorAll("li");
            for (let i = 0; i < allList.length; i++) {
                //ADDING ONCLICK ATTRIBUTE  IN ALL LI TAG 
                allList[i].setAttribute("onclick", "select(this)");
               
            }
        } else {
            searchWrapper.classList.remove("active");//hide autocomplete div
        }
    }
    getFrames();
    /* console.log(e.target.value); */
}