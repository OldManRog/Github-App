/* This is the const that contains the API to fetch users. Notice it is missing the 
search term, or essentially the user name.*/


const APIURL = 'https://api.github.com/users/';


const main = document.getElementById('main');
console.log(main)

const form = document.getElementById('form');
console.log(form)

const search = document.getElementById('search');
console.log(search)


/* here I am calling the function getUserData in which it takes string, 
tbat being the searh.value (user name). This function is called here because we want to be able to display
the github data and card as soon as the page loads. */
getUserData('OldManRog');

/* this async function has a promise to return the data from the API.*/
async function getUserData(username) {
    /* Notice that it fetches the API url but it also adds the 'userName' string at as a search query parameter */
    const resp = await fetch(APIURL + username);

    const respData = await resp.json();

    console.log(respData);

    /* When I call getUserData, I get data, but then I also call 
    displayUserDataOnUserCard, which dislays the data on the card */
    displayUserDataOnUserCard(respData);

    /* When I call getUserData, I get data, but then I also call 
   getRepoData, which fetches the data from the repos*/
    getRepoData(username); 
}

/* This function grabs the repo data*/
async function getRepoData(username){
    const resp =  await fetch(APIURL + username + '/repos');
    const respData = await resp.json();

    console.log(respData)

    /* similar as to when I cal getUserData, when I cal getRepoData, I also
    want to call displayRepoDataOnUserCard, which will display the repos on the card */
    displayRepoDataOnUserCard(respData);
}


/* This function is used to display the github profile details on the card*/
function displayUserDataOnUserCard(user) {
 

    // We are tring a new way of adding dynamic HTML through JS
    /*const card = document.createElement('div')
    card.classList.add('card')*/

    /* this is not an array, so I can create a const which will equal to the HTML 
    I want to display dynamically.*/

    /* this funtion takes a string that could be called anything. 
    For it to makes sense we called it user. for each section that is dynamic
    I have to grab it from the API object as seen below as user._____ */
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

    /* I created a const that represents the main. on that main, the html inside the
    main, I want it to be the html from the cardHTML */
    main.innerHTML = cardHTML;
}


/* this function takes a string, and for it to make sense we calle it repo */
function displayRepoDataOnUserCard(repos) {
    /* we create const that represents the div which will hold the repos
    we need to include it down here because the element is created only after displayUserDataOnCard is called */
    const reposEl = document.getElementById('repos')
    console.log(reposEl)

    console.log(repos)

    /* we named the array within the object, repos, and for each repo in repos,
     we want to create an a tag in order to include a link. For each 
     a tag we also want to add the class repo. we do this by using a const called repoEl. 
     We then specify what is the HTML we want inside the repoEl. 
     Finally we can then append the repoEL which is the a tag that was created for each repo in the repos array,
     and append each one to the reposEl, which is the parent div */
    repos.forEach(repo => {
        const repoEl = document.createElement('a')
        repoEl.classList.add('repo')

        console.log(repoEl)

        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;
    
       reposEl.appendChild(repoEl) 
    })
   
}    
/* this is an event listner for the form. When I submit,
it prevents the default behavior. I then assing username to the search.valu. 
search.value will be the input that is subumitte. search comes from the variable that is
assign to the search element.*/
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = search.value;
    
    /* if there is a username, meaning an input value,
    the call getUserData with the username as the paramater. Rmb username is the input value
    once It cals getUserData, the next step is to clear the input*/
    if(username) {
        getUserData(username);

        search.value = ''
    }
})