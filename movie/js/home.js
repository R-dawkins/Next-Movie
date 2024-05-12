import { options, ko, en, imgPaths } from "./api-data.js";
import { getMovies, getMovie,getVideos, displayMovies } from "./api-functions.js";
import { qySel,qySelAll,setSwiper,showModal,videoResize } from "./functions.js";
//script를 모듈로 호출하면 await를 함수 밖에서 쓸 수 있다


const setVisual = () => {
return new Promise(async (resolve) => {
  let movieData = await getMovies(options.playing)
  let movies = movieData.results
  movies = movies.slice(0,5)
  // console.log(movies);
  //for of를 쓴 이유 await를 쓰기위해 foreach,map,등 일부 문법안에서는 못씀
  for (let movie of movies) {//for in - 객체 for of 배열
    let {title, original_title, overview, backdrop_path, id} = movie
    //console.log(getMovie(id,en)); promise함수는 await와 값을 받지 않으면 제대로 나오지 않는다
    if(!overview){
      let movieEn = await getMovie(id,en)//한글로 된 정보가 없으면 영어로 된 영화정보를 가져온다
      overview = movieEn.overview//기존 overview를 영어 overview로 대체
    }//if !overview
    overview = overview.slice(0,200) +'...'

    let imgPath = `${imgPaths.original}${backdrop_path}` //imgPaths.original+backdrop_path 템플릿 리터럴을 붙이지 않고 이렇게도 가능
    let videoData = await getVideos(id)
    if(videoData.results.length === 0){
      videoData = await getVideos(id,en)
    }
    let videoKey = videoData.results[0].key//videoData객체의 0번째 배열의 key객체만 가져오는 것

    qySel('section.home-visual .swiper-wrapper').insertAdjacentHTML('beforeend',`
      <figure class="swiper-slide">
        <img src="${imgPath}" alt="">
        <figcaption>
          <small class="original-title">${original_title}</small>
          <h6 class="title">${title}</h6>
          <p class="overview">${overview}</p>
          <button class="play-btn" value="${videoKey}"><i class="fa-brands fa-google-play"></i>재생</button>
          <button class="detail-btn" value="${id}"><i class="fa-solid fa-circle-info"></i>상세정보</button>
        </figcaption>
      </figure>
    `)//insertAdjacentHTML
  }//for of
  qySelAll('.home-visual .play-btn').forEach( btn =>{
    btn.addEventListener('click',e=>{
      showModal('.video-modal')
      qySel('.video-modal iframe').src=`
      http://www.youtube-nocookie.com/embed/${e.target.value}?playlist=${e.target.value}&autoplay=1&loop=1&mute=1&playsinline=1`
      videoResize()
    })//click
  })//play-btn
  qySelAll('.home-visual .detail-btn').forEach( btn =>{
    btn.addEventListener('click',e=>{
      location.href = `./detail.php?id=${e.target.value}`
    })//click
  })//detail-btn
  setSwiper('.home-visual',10000,)
  resolve()
})//promise
}//setVisual

const setHomeSection = (option,section) => {
  return new Promise(async (resolve) => {
    const moviesData = await getMovies(option)
    let movies = moviesData.results.slice(0,10)
    displayMovies(movies,`${section} .carousel .swiper-wrapper`,'swiper-slide')
    setSwiper(`${section} .carousel`, false, true)
    resolve()
  })//RNP
}//setHomeSection

await setVisual()
await setHomeSection(options.popular,'.popular-section')
await setHomeSection(options.upcoming,'.upcoming-section')
await setHomeSection(options.rated,'.rated-section')
await setHomeSection(options.trend,'.trend-section')

const scrollToSection = () => {

    //$('body,html').animate({'scrollTop:$('.popular-section').offset().top}) jquery로 했을 때
  let offsetTop = qySel('.popular-section').getBoundingClientRect().y + window.scrollY
  let headerH = matchMedia('screen and (min-width:1000px)').matches ? 80 : 60
  let scrollTargetY = offsetTop - headerH
  window.scrollTo({
    top: scrollTargetY,
    behavior : 'smooth'
  })
}//scrollToSection

qySel('.home-visual').addEventListener('mousewheel',e=>{
  e.preventDefault()
  let delta = (e.wheelDelta) < 0 ? 1 : -1
  if(delta === -1) return false
  scrollToSection()
  
},{passive:false})//마우스나 키보드에서 e.preventDefault를 사용하려면 브라우저 자체에서 막기때문에 passive:false를 해줘야 한다.

qySel('.wheel-btn').addEventListener('click',e=>{
scrollToSection()
})