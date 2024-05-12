import { genreList } from "./api-data.js";
import { controller, displayMovies, searchByGenres, searchByKeyword } from "./api-functions.js";
import { qySel, qySelAll, setSlide } from "./functions.js";


setSlide([])

let timeoutId
let page
let totalPages
let isPending = true //true면 데이터를 받고 있다는 뜻, false면 데이터를 받고 있지 않는 상태니 데이터를 받아도 된다는 뜻 처음에 false로 해두면 바로 데이터를 불러오다 에러가 날 수 있음 처음엔 무한스크롤 막아두는것
let genreNumbers =  []

const setDatalist = () => {
  if(! localStorage.getItem('keywordsStorage')) return false
  let keywords = JSON.parse(localStorage.getItem('keywordsStorage'))
  keywords.forEach(keyword=>{
    qySel('#keyword-list').insertAdjacentHTML('beforeend',`
      <option>${keyword}</option>
      `)
  })
}//setDatalist

setDatalist()


qySel('.search-input').addEventListener('input',async e=>{
  clearTimeout(timeoutId) //clearTimeout을 가장 먼저 하는것이 이상적
  page = 1
  isPending = true
  genreNumbers =  []
  qySelAll('.genre-btn').forEach(button=>{
    button.classList.remove('active')
  })//forEach

  qySel('.search-result-section .grid-container').innerHTML = ''
  if(e.target.value==='')return false

  timeoutId = setTimeout(async() => {//사용자 ui를 위해 1초정도 기다려준다
    controller.abort() // signal이 연결된 이전의 fetch를 취소하겠다는 뜻 fetch기능을 영원히 막아버리기때문에 다시 fetch를 살려야한다 fetch누적을 막는것
    let movieData = await searchByKeyword(e.target.value)
    let movies = movieData.results
    
    displayMovies(movies,'.search-result-section .grid-container')
    
    let keywords = localStorage.getItem('keywordsStorage')
    ? JSON.parse(localStorage.getItem('keywordsStorage'))
    : []
    if(movies.length === 0 || keywords.includes(e.target.value)) return
    keywords.unshift(e.target.value)//반환을 해주는 것이 아니기 때문에 slice할 수 없음
    keywords = keywords.slice(0, 10)
    localStorage.setItem('keywordsStorage', JSON.stringify(keywords))
    qySel('#keyword-list').innerHTML = ''
    keywords.forEach(keyword=>{
      qySel('#keyword-list').insertAdjacentHTML('beforeend',`
      <option>${keyword}</option>
      `)
    })//forEach
    //사용자가 버튼을 클릭하거나 입력을 할땐 클리어 해주고 fetch해야함 과다한 fetch방지, 마지막 fetch만 하게 만들기 abort controller
  }, 500);
})//input

qySel('.delete-btn').addEventListener('click',e=>{
  if(!confirm('검색 기록을 삭제하시겠습니까'))return
  localStorage.removeItem('keywordsStorage')
  qySel('#keyword-list').innerHTML = ''
})

qySel('.search-form').addEventListener('submit',e=>{
  e.preventDefault()
})

///////////////////////////

const setGenreBtns = () => {
  for (let genreNumber in genreList) { //객체를 여러개 뽑아내고싶을때는 for in
    qySel('.genre-btns').insertAdjacentHTML('beforeend',`
    <button class="genre-btn" value="${genreNumber}">
    ${genreList[genreNumber]}
    </button>
    `)//insertAdjacentHTML
  }//for in
}//setGenreBtns

const genreBtnsHandler = () => {
  qySelAll('.genre-btn').forEach(button=>{
    button.addEventListener('click',async e=>{
      clearTimeout(timeoutId)
      isPending = true
      e.target.classList.toggle('active')
      qySel('.search-input').value = ''
      qySel('.grid-container').innerHTML = ''

      page = 1
      let idx = genreNumbers.indexOf(e.target.value)
      if(idx === -1){genreNumbers.push(e.target.value)}
      else{genreNumbers.splice(idx,1)}
      if(genreNumbers.length===0){return false}

      
      timeoutId = setTimeout(async () => {
        controller.abort()
        let movieData = await searchByGenres(genreNumbers.join(','))
        totalPages = movieData.total_pages
        let movies = movieData.results
        displayMovies(movies,'.search-result-section .grid-container')
        isPending = false
      }, 500);//setTimeout
    })//click
  })//forEach
}//genreBtnsHandler

setGenreBtns()
genreBtnsHandler()

////////////////////////////////////
let observer =  new IntersectionObserver(async ([entry])=>{//특정객체가 화면에 들어오는지 안들어오는지 실시간 감시하는 것 원래 배열(qySelAll 등)로 넣을때는 []를 쓰지 않고 그냥 적는다 그리고 forEach등으로 해야한다
  if(entry.intersectionRatio > .1 && isPending === false){ //.1은 화면 아래서부터 10%를 뜻함 .5면 화면 50% 즉 절반
    isPending = true
    page ++
    if(page > totalPages || page > 10)return false
    let movieData = await searchByGenres(genreNumbers, page)
    let movies = movieData.results
    displayMovies(movies,'.search-result-section .grid-container')
    isPending = false
  }//if
})//IntersectionObserver
observer.observe(qySel('div.trigger'))
