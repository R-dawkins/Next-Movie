import { apiKey, baseUrl, ko, en, options, imgPaths, gradeColors, genreList,headers,accessToken } from "./api-data.js";
import { qySel, qySelAll, setPersonModal, showModal, sortArray, videoResize } from "./functions.js";

export const getMovies = (option,lang=ko,page=1) => {//영화들이 담긴 배열 가져오기 lang=ko와 query=''는 다른 값을 넣지 않으면 ko를 사용함 page=1을 디폴트로하려면 lang 값을 넣어줘야한다
  return new Promise(async (resolve) => {//다른함수들과 같이 쓸 때 다른 함수가 먼저 실행되는 일이 없도록 펜딩함수로 만들어 주었다
    let result = await fetch(`${baseUrl}${option}${apiKey}${lang}&page=${page}`, {
      method: 'GET',
      headers: headers
    })
    let data = await result.json() //json형태로 된 데이터를 js에 맞게 변환
    resolve(data)
  })//promise
}//getMovies


export const getMovie = (movieId,lang=ko) => {//영화 단 하나가 담긴 배열 가져오기
  return new Promise(async (resolve) => {
    let result = await fetch(`${baseUrl}/movie/${movieId}${apiKey}${lang}`)
    let data = await result.json()
    resolve(data)
  })//promise
}//getMovie

export const getVideos = (movieId,lang=ko) => {//youtube id가 담긴 객체 가져오기
  return new Promise(async (resolve) => {
    let result = await fetch(`${baseUrl}/movie/${movieId}/videos${apiKey}${lang}`)
    let data = await result.json()
    resolve(data)
  })//promise
}//getVideos

export const getImages = (movieId) => {
  return new Promise(async (resolve) => {
    let result = await fetch(`${baseUrl}/movie/${movieId}/images${apiKey}`)
    let data = await result.json()
    resolve(data)
  })//promise
}//getImages

export const getSimilarMovies = (movieId,lang=ko) => {
  return new Promise(async (resolve) => {
    let result = await fetch(`${baseUrl}/movie/${movieId}/similar${apiKey}${lang}`)
    let data = await result.json()
    resolve(data)
  })
}//getSimilarMovies

export const getCredits = (movieId) => {
  return new Promise(async (resolve) => {
    let result = await fetch(`${baseUrl}/movie/${movieId}/credits${apiKey}`)
    let data = await result.json()
    resolve(data)
  })
}//getCredits

export const displayMovies = (data, container, gridClassName='') => {
  if(data.length === 0){
    qySel(container).innerHTML = '<p class="no-data">관련 영화가 존재하지 않습니다</p>'
    return false
  }//if
    data.forEach(movie => {
      let {id,title,genre_ids,release_date,poster_path,vote_average} = movie
      let imgPath = (poster_path)? `${imgPaths.w500}${poster_path}`:'./img/no-image.jpg'
      vote_average = vote_average.toFixed(1)
      let gradeLevel = Math.floor(vote_average - 5)
      if(gradeLevel > 4) gradeLevel = 4
      if(gradeLevel < 0) gradeLevel = 0
      let gradeColor = gradeColors[gradeLevel]
      let genres = genre_ids.map(num => genreList[num]).join(' / ')
      qySel(container).insertAdjacentHTML('beforeend',`
      <figure class="${gridClassName}">
        <a href="./detail.php?id=${id}">
          <div class="imgbox">
              <img src="${imgPath}" alt="">
              <span style="background:${gradeColor}"></span>
              <small>${vote_average}</small>
          </div>
          <figcaption>
              <h3>${title}</h3>
              <p>${genres}</p>
              <p>${release_date}</p>
          </figcaption>
        </a>
      </figure>
      `)
    });//forEach
}//displayMovies

export const displayVideos = (data, container) => {
  if(data.length === 0){
    qySel(container).innerHTML = '<p class="no-data">관련 영상이 존재하지 않습니다</p>'
    return
  }//if
  data.forEach((video)=>{
    let {key} = video
    qySel(container).insertAdjacentHTML('beforeend',`
    <button value="${key}"><img src="https://img.youtube.com/vi/${key}/mqdefault.jpg" alt=''></button>
    `)
  })//forEach
  qySelAll(`${container} button`).forEach( btn =>{
    btn.addEventListener('click',e=>{
      showModal('.video-modal')
      let youtubeId = e.currentTarget.value //e.target.value를 쓰면 자식을 찾는다 중요포인트
      qySel('.video-modal iframe').src=`
      http://www.youtube-nocookie.com/embed/${youtubeId}?playlist=${youtubeId}&autoplay=1&loop=1&mute=1&playsinline=1`
      videoResize()
    })//click
  })//play-btn forEach
}//displayVideos

export const displayImages = (data, container) => {
  if(data.length === 0){
    qySel(container).innerHTML = '<p class="no-data">관련 이미지가 존재하지 않습니다</p>'
    return
  }//if
  data.forEach(img=>{
    let {file_path} = img
    let imgPathOriginal = `${imgPaths.original}${file_path}`
    let imgPathW500 = `${imgPaths.w500}${file_path}`

    qySel(container).insertAdjacentHTML('beforeend',`
    <a class="viewbox-btn" href="${imgPathOriginal}">
    <img src="${imgPathW500}" alt>
    </a>
    `)
  })//forEach

  $('.viewbox-btn').viewbox() //viewbox라이브러리가 깔려있어야 사용가능하다
}//displayImages

export const displayPeople = (data, container) => {
  if(data.length === 0){
    qySel(container).innerHTML = '<p class="no-data">관련 이미지가 존재하지 않습니다</p>'
    return
  }//if
  data.forEach(person => {
    let {name,id,character,profile_path} = person
    let photo = (profile_path)? `${imgPaths.w500}${profile_path}` : './img/no-image.jpg'
    qySel(container).insertAdjacentHTML('beforeend',`
      <figure>
        <a href="${id}">
          <img src="${photo}" alt="">
          <figcaption>
            <em>${name}</em>
            <b>'${character}'역</b>
          </figcaption>
        </a>
      </figure>
    `)
  })//forEach
  qySelAll(`${container} a`).forEach((anchor)=>{//forEach에서는 async 사용 불가
    anchor.addEventListener('click',async (e)=>{//하지만 forEach가 끝나고 click이벤트에서는 사용가능
      e.preventDefault()
      let id = e.currentTarget.getAttribute('href')
      let profile = await getProfile(id)
      let filmography = await getFilmography(id)
      displayProfile(profile)
      displayFilmography(filmography)
      showModal('.person-modal')
      setPersonModal()
    })//click
  })//forEach
}//dispalyPeople

export const getProfile = (personId,lang=en) => {
  return new Promise(async (resolve) => {
    let result = await fetch(`${baseUrl}/person/${personId}${apiKey}${lang}`)
    let data = await result.json()
    resolve(data)
  })//promise
}//getProfile

export const getFilmography = (personId,lang=ko) => {
  return new Promise(async (resolve) => {
    let result = await fetch(`${baseUrl}/person/${personId}/movie_credits${apiKey}${lang}`)
    let data = await result.json()
    resolve(data)
  })//promise
}//getFilmography

export const displayProfile = (profileData) => {
  let {profile_path,name,place_of_birth,birthday,deathday,known_for_department,biography} = profileData
    let personPhoto = (profile_path) ? `${imgPaths.w500}${profile_path}` : './img/no-image.jpg'
    name = (name) ? name : '관련 정보가 없습니다'
    known_for_department = (known_for_department) ? known_for_department: '관련 정보가 없습니다'
    place_of_birth = (place_of_birth) ? place_of_birth: '관련 정보가 없습니다'
    biography = (biography) ? biography: '관련 정보가 없습니다'
    deathday = (deathday) ? deathday : ''
    birthday = (birthday) ? `${birthday} ~ ${deathday}`: '관련 정보가 없습니다'
    
    qySel('.person-name').innerText = name
    qySel('.person-job').innerText = known_for_department
    qySel('.person-life').innerText = birthday
    qySel('.person-place').innerText = place_of_birth
    qySel('.person-biography').innerText = biography
    qySel('.person-photo').src = personPhoto
  }//displayProfile

export const displayFilmography = (filmographyData) => {
  let {cast, crew} = filmographyData
  let filmography = [...cast, ...crew] //배열을 복사하여 합치는 것
  sortArray(filmography, 'popularity', -1) //배열이 바뀜
  filmography = filmography.slice(0, 20) //리턴해주는것
  qySel('ul.filmography').innerHTML = ''
  sortArray(filmography, 'release_date', -1)
  filmography.forEach(movie => {
    let {id,release_date,title,job,character,} = movie
    job = (job)? job : `${character} 역`
    qySel('ul.filmography').insertAdjacentHTML('beforeend',`
      <li>
        <time>개봉일 : ${release_date}</time>
        <a href="./detail.php?id=${id}">
          <em>제목 : ${title}</em>
          <small>역할 : ${job}</small>
        </a>
      </li>
    `)
  })//forEach
  }//displayFilmography


export let controller = new AbortController()  
let signal = controller.signal
  export const searchByKeyword = (keyword, lang=ko) => {
    return new Promise(async (resolve) => {
      controller = new AbortController()
      signal = controller.signal
      try{const result = await fetch(`${baseUrl}/search/movie${apiKey}${lang}&query=${keyword}`,
      {signal})//{signal} 리액트에선 구조분해로 사용 fetch에서는 구조분해가 아님 그냥 객체로 넣는 것{signal:signal}
      const data = await result.json()
      resolve(data)
    }
    catch{
    }//catch
  })//promise
  }//searchByKeyword

export const searchByGenres = (genreId,page='1') => {
  return new Promise(async (resolve) => {
    controller = new AbortController()
    signal = controller.signal
    const result = await fetch(`${baseUrl}/discover/movie/${apiKey}&with_genres=${genreId}&page=${page}`,{signal}) //signal을 fetch에 객체로 넣어줘야 멈출 수 있다
    const data = await result.json()
    resolve(data)
  })
  }