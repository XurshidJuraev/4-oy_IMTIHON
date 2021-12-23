//Select DOM elements!

//User
var elListTemplate = document.querySelector("#list-template").content
var elWrapper = document.querySelector("#user-wrapper");
var elResultWrapper = document.querySelector("#user-result");
var elUserNumber = document.querySelector("#user-numbers");

//Post
var elPostWrapperTemplate = document.querySelector("#post-wrapper").content
var elPostWrapper = document.querySelector("#post-wrap")
var elPostCard = document.querySelector("#post-id");
var elPostNumber = document.querySelector("#post-numbers");
var elPostList = document.querySelector("post-list");

//Comment
var elCommentWrapperTemplate = document.querySelector("#comment-wrapper").content
var elCommentWrapper = document.querySelector("#comment-wrap")
var elCommentCard = document.querySelector("#comment-id");
var elCommentNumber = document.querySelector("#comment-numbers");
var elCommentList = document.querySelector("comment-list");


//Render USER
function render(array, wrapper) {
    var listItem = document.createDocumentFragment()
    
    if(array){
        array.forEach(function(item) {
            var listTemplate = elListTemplate.cloneNode(true)
            listTemplate.querySelector("#user-name").textContent = item.name
            listTemplate.querySelector("#user-surname").textContent = item.email
            listTemplate.querySelector("#user-city").textContent = item.address.city
            listTemplate.querySelector("#user-company").textContent = item.company.name
            listTemplate.querySelector("#user-web").textContent = item.website
            listTemplate.querySelector("#user-name").dataset.userIdT = item.id
            
            listItem.appendChild(listTemplate)
        })
    wrapper.innerHTML = null
    wrapper.appendChild(listItem)
    }else {
        alert("Internet tarmog'ingizni tekshiring. Yoki Refresh bering. Agar unda ham ishlamasa chiqing va shu saytga boshqatdan kiring")
    }
    elUserNumber.textContent = `Count of users: ${array.length}`
}

fetch('https://jsonplaceholder.typicode.com/users')
.then((response) => response.json())
.then((json) => render(json, elWrapper));



//Render POST
function renderPost(postArray, postWrapper) {
    var postItem = document.createDocumentFragment()
    
    if(postArray){
        postArray.forEach(function(item) {
            var postTemplate = elPostWrapperTemplate.cloneNode(true)
            postTemplate.querySelector("#post-heading").textContent = item.title
            postTemplate.querySelector("#post-body").textContent = item.body
            postTemplate.querySelector("#post-heading"). dataset.idJon = item.userId
            postItem.appendChild(postTemplate)
        })
        postWrapper.innerHTML = null
        postWrapper.appendChild(postItem)
    }else {
        alert("Internet tarmog'ingizni tekshiring. Yoki Refresh bering. Agar unda ham ishlamasa chiqing va shu saytga boshqatdan kiring")
    }
    elPostNumber.textContent = `Count of users: ${postArray.length}`
}
elWrapper.addEventListener("click", (evt) => {
    let clickId = evt.target.dataset.userIdT
    fetch(`https://jsonplaceholder.typicode.com/user/${clickId}/posts`)
    .then((response) => response.json())
    .then((json) => renderPost(json, elPostWrapper))
})



// Render COMMENT
function renderComment(commentArray, commentWrapper) {
    var commentItem = document.createDocumentFragment()
    
    if(commentArray){
        commentArray.forEach(function(item) {
            var commentTemplate = elCommentWrapperTemplate.cloneNode(true)
            commentTemplate.querySelector("#comment-heading").textContent = item.name
            commentTemplate.querySelector("#comment-mail").textContent = item.email
            commentTemplate.querySelector("#comment-text").textContent = item.body
            
            commentItem.appendChild(commentTemplate)
        })
    commentWrapper.innerHTML = null
    commentWrapper.appendChild(commentItem)
    }else {
        alert("Internet tarmog'ingizni tekshiring. Yoki Refresh bering. Agar unda ham ishlamasa chiqing va shu saytga boshqatdan kiring")
    }
    elCommentNumber.textContent = `Count of users: ${commentArray.length}`
}
elPostWrapper.addEventListener("click" , (evt) => {
    let submitId = evt.target.dataset.idJon;
    fetch(`https://jsonplaceholder.typicode.com/posts/${submitId}/comments`)
    .then(response => response.json())
    .then(json => renderComment(json, elCommentWrapper));
})