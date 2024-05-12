import { closeModal, qySel,videoResize } from "./functions.js";
//export하는 파일에서는 EventListener를 바로 사용하면 안된다 다른문서에서 바로실행되서 대상을 찾다가 에러가 날 수 있다 함수로 만들거나 해야한다
qySel('.video-modal .modal-close-btn').addEventListener('click',e=>{
  qySel('.video-modal iframe').src = ''
  closeModal('.video-modal')
})//click

window.addEventListener('resize',e=>{
  videoResize()
})