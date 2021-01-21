/* This is the const that contains the API to fetch users. Notice it is missing the 
search term, or essentially the user name.*/


const APIURL = 'https://api.github.com/users/';


const main = document.getElementById('main');
console.log(main)

const form = document.getElementById('form');
console.log(form)

const search = document.getElementById('search');
console.log(search)


/* here I am calling the function getUserData in which it takes string, tbat being the searh.value (user name) */
getUserData('OldManRog');

/* this async function has a promise to return the data from the API.*/
async function getUserData(username) {
    /* Notice that it fetches the API url but it also adds the 'userName' string at as a search query parameter */
    const resp = await fetch(APIURL + username);

    const respData = await resp.json();

    console.log(respData);

    displayUserDataOnUserCard(respData);

    getRepoData(username); 
}

async function getRepoData(username){
    const resp =  await fetch(APIURL + username + '/repos');
    const respData = await resp.json();

    console.log(respData)

    displayRepoDataOnUserCard(respData);
}


function displayUserDataOnUserCard(user) {
 

    // We are tring a new way of adding dynamic HTML through JS
    /*const card = document.createElement('div')
    card.classList.add('card')*/

    const cardHTML = `
    <div class="card">
    <div>
    <img class="avatar" src="${user.avatar_url}" alt="${user.name}">
    </div>
    <div class="user-info">
        <h2>${user.name}</h2> 
        <p>${user.bio} </p>

        <ul class="info">
            
            <li><i class="fas fa-people-arrows"></i> ${user.followers} </li>
           
            <li> <i class="fas fa-user-friends"></i> ${user.following} </li>
            
            <li><i class="fas fa-code"></i> ${user.public_repos} </li>            
        </ul>

        <div id="repos">  </div>
   </div>
   </div>
    `
    console.log(cardHTML);

    main.innerHTML = cardHTML;
}



function displayRepoDataOnUserCard(repos) {
    const reposEl = document.getElementById('repos')
    console.log(reposEl)

    console.log(repos)

    repos.forEach(repo => {
        const repoEl = document.createElement('a')
        repoEl.classList.add('repo')

        console.log(repoEl)

        repoEl.innerHTML = 
        ` 
        <h1> hello </h1>

        ` 
       reposEl.appendChild(repoEl) 
    })
   
}    

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = search.value;
    
    if(username) {
        getUserData(username);

        search.value = ''
    }
})