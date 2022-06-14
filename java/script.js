var siteName = document.getElementById("sitename");
var siteUrl = document.getElementById("siteurl");
var submitBtn = document.getElementById("submitBtn");
var storedbookmark = JSON.parse(localStorage.getItem("bookmarkList"));
var bookmarkList;

if (storedbookmark != null) {
    bookmarkList = storedbookmark;
    displayBookmark();
} else {
    bookmarkList = [];
}

function addBookmark() {
    if ((/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(siteUrl.value) && siteName.value != "")) {
        var bookmark = {
            name: siteName.value,
            url: siteUrl.value,
        }
        bookmarkList.push(bookmark);
        addToLocalStorage();
        displayBookmark();
        clearUserInputs();
    }
    if (siteName.value != "" && siteUrl.value == "") {
        errorUrl(`<i class="fa-solid fa-circle-xmark"></i> Url is required`);
    }
    if (siteName.value == "" && siteUrl.value != "") {
        errorName(`<i class="fa-solid fa-circle-xmark"></i> Name is required`);
    }
}

function errorName(message) {
    var nameError = document.getElementById("nameError");
    nameError.innerHTML = message;
}

function errorUrl(message) {
    var urlError = document.getElementById("urlError");
    urlError.innerHTML = message;
}

function addToLocalStorage() {
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
}

function displayBookmark() {
    var content = "";
    for (i = 0; i < bookmarkList.length; i++) {
        content += `<div class=" row webwell" id="${bookmarkList[i].name}">
         <h2>${bookmarkList[i].name}</h2>
         <a href="${bookmarkList[i].url}" class=" btn btn-primary" target="_blank">Visit</a>
         <button onclick="deletebookmark(${i})" class=" btn btn-danger">Delete</button>
     </div>`
    }
    document.getElementById("bookmarkList").innerHTML = content;
}

function clearUserInputs() {
    siteName.value = "";
    siteUrl.value = "";
}

function deletebookmark() {
    bookmarkList.splice(bookmarkList[i], 1);
    displayBookmark(bookmarkList);
    addToLocalStorage();
}
siteName.addEventListener("keyup", function (e) { errorName("") });
siteUrl.addEventListener("keyup", function (e) { errorUrl("") });

//Check Duplicated Bookmark Name
function checkDuplicatedUrls() {

    for(var i = 0; i < bookmarkList.length; i++)
        {
          if(siteUrl.value == bookmarkList[i].url) 
          {
            errorUrl(`<i class="fa-solid fa-circle-xmark"></i> Bookmark Url Already Exists`);
            submitBtn.disabled = true;
          } 
        }
  };
  siteName.addEventListener("blur", checkDuplicatedUrls);