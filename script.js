
const main_url = {
   API_KEY : 'api_key=0edef9b705c12c877d6bf5da93d4242d',
   BASE_URL : 'https://api.themoviedb.org/3',
   IMG_URL : 'https://image.tmdb.org/t/p/w500',
 };

 const popularity_url = {
   pop_url : main_url.BASE_URL + '/discover/movie?sort_by=popularity.desc&' + main_url.API_KEY,  
 };

 const rating_url = {
  rate_url : main_url.BASE_URL + '/discover/movie?sort_by=rating.desc&' + main_url.API_KEY,
 }

 const search_url = {
   searchURL : main_url.BASE_URL + `/search/movie?` + main_url.API_KEY,
 };

  const genre = [
    {
      "id": 28,
      "name": "Action"
    },
    
    {
      "id": 12,
      "name": "Adventure"
    },
    
    {
      "id": 16,
      "name": "Animation"
    },
    
    {
      "id": 35,
      "name": "Comedy"
    },
    
    {
      "id": 80,
      "name": "Crime"
    },
    
    {
      "id": 99,
      "name": "Documentary"
    },
    
    {
      "id": 18,
      "name": "Drama"
    },
    
    {
      "id": 10751,
      "name": "Family"
    },
    
    {
      "id": 14,
      "name": "Fantasy"
    },
    
    {
      "id": 36,
      "name": "History"
    },
    
    {
      "id": 27,
      "name": "Horror"
    },
    
    {
      "id": 10402,
      "name": "Music"
    },
    
    {
      "id": 9648,
      "name": "Mystery"
    },
    
    {
      "id": 10749,
      "name": "Romance"
    },
    
    {
      "id": 878,
      "name": "Science Fiction"
    },
   
    {
      "id": 10770,
      "name": "TV Movie"
    },
    
    {
      "id": 53,
      "name": "Thriller"
    },
   
    {
      "id": 10752,
      "name": "War"
    },
    
    {
      "id": 37,
      "name": "Western"
    }
  ];

 const mainTag = document.querySelector('#main');
 const formTag = document.querySelector('#form');
 const searchBar = document.querySelector('.search');
 const tagsEl = document.querySelector('#tags');
 

 const options = document.querySelector('select-list');
 const movie_sorted = document.querySelector('#select-movies');
 const optionPop = document.querySelector('#op-1');
 const optionRate = document.querySelector('#op-2');



const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const current = document.querySelector('#current');

let prevPage = 1;
let nextPage = 2;
let currentPage = 3;
let lastURL = '';
let totalPages = 100;





let selectedGenre = [];

 function setGenre(){
  
  tagsEl.innerHTML = '';

  //selecting the Genre
  genre.forEach( (genre) => {
    console.log(genre);

  const t = document.createElement('div');
        t.classList.add('tag');
        t.id = genre.id;
        t.innerText = genre.name;

   
   
   //listeing event if clciked then  i have to push id into array if doubled clicked then i have to remove the ID
 t.addEventListener('click' , () =>{
     
    if(selectedGenre.length == 0){
       selectedGenre.push(genre.id);
    }
    else{
  
       if(selectedGenre.includes(genre.id)){
        selectedGenre.forEach( (id ,idx) => {
          
          // removing dupicate genre id's
          if(id == genre.id){
            selectedGenre.splice(idx ,1);
          }

        });
       
      }

      else {
        selectedGenre.push(genre.id);
      }

    }

    //showing content based on Genre
  //agar click hoga to call jayegi
   
    getMovies(popularity_url.pop_url + '&with_genres=' + encodeURI(selectedGenre.join(',')));
    
    highlight_selected_Genre();

   });

///////event ends


  tagsEl.append(t);
 
  });
  

 }


function highlight_selected_Genre(){

  const tag =  document.querySelectorAll('.tag');
  
  tag.forEach( (tag) => {
   tag.classList.remove('highlight-selected-genre');
  })

 clear_button();

 if(selectedGenre.length != 0) {
 selectedGenre.forEach( (id) =>{
  //jinke pass ye id hogi usko class assign kar do aur use class ke basis pe use color do
   const highlightTag = document.getElementById(id);
   highlightTag.classList.add('highlight-selected-genre');

 })
}

}



function clear_button(){

let clearbtn = document.querySelector('#clear')

 if(clearbtn) {
  clearbtn.classList.add('highlight-selected-genre');
  
 }
 else{
  
  let clear = document.createElement('div');
  clear.classList.add('tag' , 'highlight-selected-genre');
  clear.id = 'clear';
  clear.innerText = 'clear X';

  clear.addEventListener('click' , () =>{
 
   selectedGenre = [];
   setGenre();
   getMovies(popularity_url.pop_url);

  });

  tagsEl.append(clear);

 }

}



 
//  function getMovies(url){
   
//  try{

//   fetch(url).then( (res) => {
     
//     res.json()

//     .then( (data) => {
      
//       showMovies(data.results);
//       console.log(data.results);

//     });

//   });

// }
// catch(error){
//   document.body.innerHTML = ``
//   console.log('hi');
// }

//  }




function getMovies(url) {

  lastURL = url;

  fetch(url)
      .then((res) => {
          if (!res.ok) {
              throw new Error('Network response was not ok');
          }
          console.log(res);
          return res.json();
      })
      .then((data) => {
        console.log(data);
        if(data.results.length !== 0){

          showMovies(data.results);
          console.log(data.results);

          currentPage = data.page;
          nextPage = currentPage + 1;
          prevPage = currentPage - 1;
          totalPages = data.total_pages;

          current.innerText = currentPage;

          if(currentPage <= 1){
            prev.classList.add('disabled');
            next.classList.remove('disabled');
          }
          else if(currentPage >= totalPages){
            prev.classList.remove('disabled');
            next.classList.add('disabled');
          }
          else{
            prev.classList.remove('disabled');
            next.classList.remove('disabled');
          }
         
         
         document.querySelector('header').scrollIntoView({behavior : 'smooth'})

        }
     
        else{
          mainTag.innerHTML = `<h2 class="no-result">No selected Result Found</h2>`;

          options.style.display = 'none';

        }


      })
      .catch((error) => {
          // Display a sorry message in case of error
          document.body.innerHTML = `<div class="sorry-msg">Sorry, something went wrong. Please try again later. API is not responding
          <h1>
          please use VPN
          <h1>
          </div>`;
          console.error('Error fetching movies:', error);
      });
}




 function showMovies(data){

  
  mainTag.innerHTML = '';

  
  data.forEach( (movie_cart) => {

    console.log(movie_cart);

   const {title,poster_path,vote_average,overview} = movie_cart;
    
   const movieEl = document.createElement('div');
   movieEl.classList.add('movie-cart');

   movieEl.innerHTML = `
   <img src="${poster_path ? main_url.IMG_URL + poster_path : "broken-img.png"}" alt='imgage of ${title}'>

   
   <div class="movie-info">
     <h3 class="movie-name">${title}</h3>
     <span class="${checkVoting(vote_average)}">${Math.floor((vote_average) * 10) / 10}</span>
   </div>


 <div class="movie-overview">
   <h3>Overview</h3>
   ${overview}
 </div> `;


 mainTag.appendChild(movieEl);

  });

  

 }


 function checkVoting(vote){
   
   if(vote >= 8){
    return 'green';
   }
   else if(vote >= 5){
    return 'orange';
   }
   else{
    return 'red';
   }

 }


 formTag.addEventListener('submit' , (e) => {
   e.preventDefault();
   const searchTerm = searchBar.value;
 
   selectedGenre = [];
   setGenre();

   console.log(searchTerm);

   if(searchTerm){
    getMovies(search_url.searchURL + `&query=` + searchTerm);
   }
  else{
    getMovies(popularity_url.pop_url)
  }

 })






 prev.addEventListener('click' , () => {

  if(prevPage > 0){
  
    pageCall(prevPage);
  }
  
  });


next.addEventListener('click' , () => {

if(nextPage <= totalPages){

  pageCall(nextPage);
}

});


function pageCall(page){

let urlSplit = lastURL.split('?');
console.log(urlSplit , 'urlsplit');

let queryParams = urlSplit[1].split('&');
console.log(queryParams , 'quryparam');

let key = queryParams[queryParams.length -1].split('=');
console.log(key  ,'key');

if(key[0] != 'page'){
  let url = lastURL + '&page=' + page;
  getMovies(url);
  console.log(url);
}
else{
  key[1] = page.toString();
  let a = key.join('=');
  queryParams[queryParams.length -1] = a;
  console.log(queryParams);

  let b = queryParams.join('&');
  let url = urlSplit[0] + '?' + b;
  getMovies(url);
  console.log(url);
}


}


movie_sorted.addEventListener('change' , function () {
  
  let selectedOption = this.options[this.selectedIndex].value;;
  console.log(selectedOption);

  if(selectedOption === 'pop'){
     
    if(selectedGenre){
      getMovies(popularity_url.pop_url + '&with_genres=' + encodeURI(selectedGenre.join(',')));
     }else{

    getMovies(popularity_url.pop_url);
     }



  }
  else if(selectedOption === 'rate'){

   if(selectedGenre){
    getMovies(rating_url.rate_url + '&with_genres=' + encodeURI(selectedGenre.join(',')));
    console.log('hi');
   }
    
    else{
      getMovies(rating_url.rate_url)
    }

  }
  

});




function option_select(){

 

}



function onLoad(){
  getMovies(popularity_url.pop_url);
  setGenre();
}
onLoad();
