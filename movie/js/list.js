import { imgPaths, ko, options } from "./api-data.js";
import { displayMovies, getMovies } from "./api-functions.js";
import { qySel, qySelAll } from "./functions.js";
let url = new URL(location.href)
let params= new URLSearchParams(url.search)
let list = params.get('list')
let page = parseInt(params.get('page'))
console.log(list,page);
let option

if(list === 'playing'){
  option = options.playing
  qySel('.list-title').innerText = '현재 상영작'
  
}
else if(list === 'popular'){
  option = options.popular
  qySel('.list-title').innerText = '인기 영화'
}
else if(list === 'upcoming'){
  option = options.upcoming
  qySel('.list-title').innerText = '최신/개봉 예정작'
}

let movieData = await getMovies(option,ko,page)
let movies = movieData.results
///////////////////무비 슬라이드 뒷배경
let images = movies.slice(0,5).map(v=>{ return `${imgPaths.original}${v.backdrop_path}` })
export const setSlideMenu = (images) => {
    images.forEach((imgInfo, i)=>{
      let imgPath = `${imgInfo}`
        qySel('.slide').insertAdjacentHTML('beforeend',`
        <img class="slide-img${i + 1}" src="${imgPath}" alt="">
        `)
    })//images.forEach
    //이미지가 없을때 no image 가져와야함 (숙제)
  let n = 1
  setTimeout(() => {
    qySel('.slide-img1').classList.add('active')
    setInterval(() => {
      n ++
      if(n > qySelAll('.slide img').length) n = 1
      qySelAll('.slide img').forEach(img=>{
        img.classList.remove('active')
      })
      qySel(`.slide-img${n}`).classList.add('active')
    }, 5000);
    
  }, 10);//setTimeout
}//setSlideMenu

setSlideMenu(images)
///////////////////
let totalPages = parseInt(movieData.total_pages)
totalPages = (totalPages > 100) ? 100 : totalPages
let startPaging = (page % 5 !== 0) ? Math.floor(page/5) * 5 + 1 : Math.floor(page/5) * 5 - 4//page 현재페이지 / 5 보여주고싶은 페이지 버튼 갯수
//page를 5로 나눴을 때 나머지가 있다면(0이 아니라면) Math.floor(현재페이지/보여주고싶은 페이지 버튼 갯수) * 5 + 1 : 나머지가 없다면  Math.floor(page/5) * 5 - 4
let endPaging = startPaging + 4
endPaging = (endPaging < totalPages) ? endPaging : totalPages
let finishPaging = Math.ceil(totalPages /5) * 5 - 4
//마지막페이지를 5로 나누고 올림한 후 5를 곱하여 가상의 마지막 페이지를 구하여서 4를 빼서 마지막페이지들 전 페이지들만 다음이 보이게 설정
//

if(page > 5){
  qySel('nav.paging').insertAdjacentHTML('beforeend',`
  <a href="./list.php?list=${list}&page=${startPaging-5}">이전</a>
  `)
}//if

for(let i = startPaging; i <= endPaging; i++){
  qySel('nav.paging').insertAdjacentHTML('beforeend',`
  <a class="paging-btn${i}" href="./list.php?list=${list}&page=${i}">${i}</a>
  `)
}//for
qySel(`.paging-btn${page}`).classList.add('active')

if(page <= finishPaging){
  qySel('nav.paging').insertAdjacentHTML('beforeend',`
  <a href="./list.php?list=${list}&page=${endPaging+5}">다음</a>
  `)
}

displayMovies(movies,'.list-section .grid-container')