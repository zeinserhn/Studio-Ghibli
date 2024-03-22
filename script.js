const mainElement = document.querySelector('main');
const navLinks=document.querySelectorAll('#mainNav ul li a');
let url='https://ghibliapi.vercel.app/films';
let dataSet='films';
async function getData(url) {
    const filmsPromise = await fetch(url);
    const data = await filmsPromise.json();
    if(dataSet=='films'){
        mainElement.innerHTML="";
        setSort(data);
        addCard(data);
        document.getElementById('s').style.visibility="visible";
    }
    else{
        mainElement.innerHTML="";
        addCard(data);
        document.getElementById('s').style.visibility="hidden";
    }
    //setSort(films);
    //addCard(films);
}
getData(url);
function addCard(array){
    array.forEach(eachItem =>{
        createCard(eachItem);
    });
}
navLinks.forEach(eachLink =>{
    eachLink.addEventListener('click',function(event){
        event.preventDefault();
        const thisLink=event.target.getAttribute('href').substring(1);
        url='https://ghibliapi.vercel.app/'+thisLink;
        dataSet=thisLink;
        getData(url);
    });
});
/*function createCard(data) {
    const card = document.createElement('article');
    const movieTitle = document.createElement('h2');
    const movieTitleText = document.createTextNode(data.title);
    movieTitle.appendChild(movieTitleText);

    const director = document.createElement('p');
    const directorTxt = document.createTextNode(`Director:${data.director}`);
    director.appendChild(directorTxt);

    const year = document.createElement('p');
    const yearTxt = document.createTextNode(`Released:${data.release_date}`);
    year.appendChild(yearTxt);

    const description = document.createElement('p');
    const descriptionTxt = document.createTextNode(data.description);
    description.appendChild(descriptionTxt);

    const score = document.createElement('p');
    const scoreTxt = document.createTextNode(`Rotten Tomatoes Score:${data.rt_score}`);
    score.appendChild(scoreTxt);

    card.appendChild(movieTitle);
    card.appendChild(director);
    card.appendChild(year);
    card.appendChild(description);
    card.appendChild(score);

    mainElement.appendChild(card);
}
*/
function createCard(data){
    const card=document.createElement('article');
    switch(dataSet){
        case 'films':card.innerHTML=filmContents(data);break;
        case 'people':card.innerHTML=peopleContents(data);break;
        case 'locations':card.innerHTML=locationContents(data);break;
        case 'species':card.innerHTML=speciesContents(data);break;
        case 'vehicles':card.innerHTML=vehiclesContents(data);break;  
    }
    mainElement.appendChild(card);
}
function filmContents(data){
    let html=`<h2>${data.title}</h2>`;
    html+=`<p>Director:${data.director}</p>`;
    html+=`<p>Released:${data.release_date}</p>`;
    html+=`<p>${data.description}</p>`;
    html+=`<p>score:${data.rt_score}</p>`;
    return html;
}
function peopleContents(data){
    let html=`<h2>${data.name}</h2>`;
    html+=`<p><strong>Details:</strong>gender ${data.gender},age ${data.age},eye color ${data.eye_color},hair color ${data.hair_color}</p>`;
    return html;
}
function locationContents(data){
    let html=`<h2>${data.name}</h2>`;
    html+=`<p>Climate:${data.climate}</p>`;
    html+=`<p>Terrain:${data.terrain}</p>`;
    html+=`<p>Surface Water:${data.surface_water}</p>`;
    return html;
}
function speciesContents(data){
    let html=`<h2>${data.name}</h2>`;
    html+=`<p>Classification:${data.classification}</p>`;
    html+=`<p>Eye Colors:${data.eye_colors}</p>`;
    html+=`<p>Hair Colors:${data.hair_colors}</p>`;
    return html;
}
function vehiclesContents(data){
    let html=`<h2>${data.name}</h2>`;
    html+=`<p>Description:${data.description}</p>`;
    html+=`<p>Vehicle Class:${data.vehicle_class}</p>`;
    html+=`<p>length:${data.length}</p>`;
    return html;
}
document.getElementById('s').addEventListener('change',function(){
    mainElement.innerHTML="";
    getData(url);
});
function setSort(array) {
    const order = document.getElementById('s').value;
    switch (order) {
        case 'Title': array.sort((a, b) => (a.title > b.title) ? 1 : -1);break;
        case 'Release Date': array.sort((a, b) => (a.release_date > b.release_date) ? 1 : -1);break;
        case 'Score': array.sort((a, b) => (parseInt(a.rt_score) > parseInt(b.rt_score)) ? -1 : 1);break;
    }
}
