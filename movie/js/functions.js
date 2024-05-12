import { imgPaths } from "./api-data.js"

export const qySel = (el) =>{
  return document.querySelector(el)
}//qySel

export const qySelAll = (el) =>{
  return document.querySelectorAll(el)
}//qySel

export const setSwiper = (el,sec=false,breakpoint=false) => {
  const swiper = new Swiper(el, {
    //autoplay:false,
    autoplay: (!sec) ? false : { //sec이 false값이라면 false true값이라면 뒤의 값 적용
      delay: sec,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    },//navigation
    pagination: {
      el: '.pagination',
      type: 'bullets',
      clickable: true,
    }, //pagination

    slidesPerView: 1,
    slidesPerGroup : 1,
    breakpoints:(breakpoint) && { //breakpoint에 어떤 값이든 true인 값을 넣었다면 뒤의 값이 리턴 (조건) && {값} 이항연산자 조건이 true면 값을 리턴하고 조건이 false면 조건을 리턴한다
      300:{
        slidesPerView: 2,
        slidesPerGroup : 2,
      },
      600: {
        slidesPerView: 3,
        slidesPerGroup : 3,
      },
      900: {
        slidesPerView: 4,
        slidesPerGroup : 4,
      },
      1200: {
        slidesPerView: 5,
        slidesPerGroup : 5,
      },
      1500: {
        slidesPerView: 6,
        slidesPerGroup : 6,
      },
    }//breakpoints
  });//swiper
}//setSwiper

export const videoResize = ()=>{
  let videoWidth = qySel('.youtube-ratio').clientWidth
  let videoHeight = qySel('.youtube-ratio').clientHeight
  qySel('.video-modal iframe').style.width = `${videoWidth}px`
  qySel('.video-modal iframe').style.height = `${videoHeight}px`
  }//videoResize

export const setSlide = (images) => {
  if(images.length < 2){ 
    for(let i=1;i <= 4;i++){//for를 쓸 땐 항상 i 설정 조심 부하를 줄 수 있음
      qySel('.slide').insertAdjacentHTML('beforeend',`
      <img class="slide-img${i}" src="./img/film${i}.jpg" alt="">
      `)
    }//for
  }else{
    images.forEach((imgInfo, i)=>{
      let {file_path} = imgInfo
      let imgPath = `${imgPaths.original}${file_path}`
      qySel('.slide').insertAdjacentHTML('beforeend',`
      <img class="slide-img${i+1}" src="${imgPath}" alt="">
      `)
    })//images.forEach
  }//else 
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
}//setSlide 이미지 src는 그 js를 쓰는 php경로로 해야한다

export const sortArray = (arr, sortby, asc) => {
  arr.sort((a,b)=>{
    if(a[sortby] > b[sortby]) return asc
    else if(a[sortby] < b[sortby]) return -asc
    else return 0
  })//sort
}//sortArray

export const showModal = (modal) => {
  qySel(modal).style.display = 'block'
  document.body.style.overflow = 'hidden'
}

export const closeModal = (modal) => {
  qySel(modal).style.display = 'none'
  document.body.style.overflow = 'auto'
}

export const setPersonModal = () => {
  qySelAll('.person-modal ul').forEach((ul)=>{
    if(ul.clientHeight >= ul.scrollHeight){//clientHeight 박스 크기 scrollHeight 실제 내용(문서)의 길이
      ul.nextElementSibling.style.display = 'none'
    }else{
      ul.nextElementSibling.style.display = 'inline-block'
    }
  })//forEach
  qySelAll('.person-modal .more-btn').forEach((btn)=>{
    btn.classList.remove('active')
    
  })//forEach
  
}//setPersonModal

