import { en, gradeColors, imgPaths } from "./api-data.js";
import { displayImages, displayMovies, displayVideos, getCredits, getImages, getMovie, getSimilarMovies, getVideos, displayPeople } from "./api-functions.js";
import { qySel, qySelAll, setSlide, sortArray,} from "./functions.js";

let url = new URL(location.href)
let params = new URLSearchParams(url.search) //id말고도 다양한 parameter가 있다
let id = params.get('id') //query string을 이용하여 사이트에 있는 id 받아오기
let imageData = await getImages(id)
let {backdrops,posters} = imageData // let backdrops = imageData.backdrops 같은 의미
let images = backdrops.slice(0, 15)
let posterPath = (posters.length) ? `${imgPaths.w500}${posters[0].file_path}` : `./img/no-image.jpg`
let movieData = await getMovie(id)
let {title,vote_average,vote_count,runtime,release_date,genres,overview,original_title,production_companies} = movieData

vote_average = vote_average.toFixed(1)
let gradeLevel = Math.floor(vote_average - 5)
if(gradeLevel > 4) gradeLevel = 4
if(gradeLevel < 0) gradeLevel = 0
let gradeColor = gradeColors[gradeLevel]

let hour = parseInt(runtime / 60)// 최종가공물
let min = runtime % 60// 최종가공물

release_date = (release_date) ? release_date : '출시일 정보가 없습니다'

if(!overview){
  let enMovieData = await getMovie(id,en)
  overview = (enMovieData.overview)? enMovieData.overview : '영화 개요가 없습니다'
}

genres = (genres.length) ? genres.map(genre=>genre.name).join(' / ') : '장르 정보가 없습니다'// 최종가공물

let company = (production_companies.length) ? production_companies.map(company=>company.name).join(', ') : '제작사 정보가 없습니다'// 최종가공물

let credits = await getCredits(id)
let {cast,crew} = credits
cast = cast.slice(0,10)
let Directors =crew.filter(v=>v.job==='Director').map(v=>v.name).join(', ') //최종가공물
Directors = Directors ? Directors : '감독 정보가 없습니다'
let Producers =crew.filter(v=>v.job==='Producer').map(v=>v.name).join(', ') //최종가공물
Producers = Producers ? Producers : '제작자 정보가 없습니다'

let videoData = await getVideos(id)
let videos = videoData.results
if(videos.length === 0){
  videoData = await getVideos(id, en)
  videos = videoData.results
}

//////////////////////////////////////
setSlide(images.slice(0,4))
//////////////////////////////////////
qySel('.poster').src = posterPath
qySel('.title').innerText = title
qySel('.average').innerText = vote_average
qySel('.average').style.color = gradeColor
qySel('.progress').style.strokeDashoffset = 10 - vote_average + 'px'
qySel('.progress').style.stroke = gradeColor
qySel('.vote-cnt').innerText = `(${vote_count})`
qySel('.hour').innerText = hour
qySel('.min').innerText = min
qySel('.date').innerText = release_date
qySel('.genre').innerText = genres
qySel('.overview').innerText = overview
qySel('.original-title').innerText = original_title
qySel('.production').innerText = company
qySel('.producer').innerText = Producers
qySel('.director').innerText = Directors
//////////////////////////////////////
const setSimilarSection = () => {
return new Promise(async (resolve) => {
  let movieData = await getSimilarMovies(id)
  let movies = movieData.results
  sortArray(movies,'popularity',-1)
  movies.slice(0,15)
  displayMovies(movies, '.similar-section .grid-container',)
  resolve()
})//promise
}//setSimilarSection

displayVideos(videos,'.video-section .grid-container')
displayImages(images,'.img-section .grid-container')
displayPeople(cast, '.people-section .grid-container')
await setSimilarSection()