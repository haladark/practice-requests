
const sidebar = document.getElementById("sidebar");
let content = document.getElementById("content");
let main = document.getElementById("main");



function requestPosts(userId){

    let request = new XMLHttpRequest();
    let url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;

    request.open("GET", url);
    request.responseType = "json";
    request.send();
    request.onload = ()=>{

        let content = document.getElementById("content")
        if(!content==""){
            content.remove()
        }
        
        content = document.createElement("div");
        content.setAttribute("id","content");
        main.appendChild(content);
      
        if(request.status>=200 && request.status<300){
            let posts = request.response;

            for (let post of posts){
                content.innerHTML += `<h4>${post.title}</h4>
                <p>${post.body}</p><br><br>`;
            }
        }
    }

}

function getUserPosts (){
    let users = document.getElementsByClassName("userInfo");

    for(let el of users){
        el.addEventListener('click',(e)=>{
        let id = e.currentTarget.dataset.userid; //using currentTarget helps when clicking on h4 or p or li will all get the target which has the eventlistener attached to which is the li item.
        //displayPosts(id);
        requestPosts(id);
        })
    }


}


(function displayUsers(){
    
    let request = new XMLHttpRequest();
    let url = `https://jsonplaceholder.typicode.com/users`;
    request.open('GET',url)
    request.responseType="json";
    request.send()
    request.onload = ()=>{
        if(request.status>=200 && request.status<300){

            let users = document.getElementById("users")
            let requestedUsers = request.response;
            

             for (let user of requestedUsers){
                let  userInfo= document.createElement('li')
                userInfo.classList.add('userInfo')
                userInfo.setAttribute('data-userid',`${user.id}`)
                userInfo.innerHTML=`<h4>${user.name}</h4><p>${user.email}</p>`
                users.appendChild(userInfo)
            }
            getUserPosts();
        }else{
            alert("display users response status error")
        }
    }
})();


(function clearPosts(){
    let clearBtn = document.getElementById("clear-btn")
    clearBtn.addEventListener('click',()=>{
        content=document.getElementById("content")
        if(!content==""){
            content.remove();

    }
})
})();

