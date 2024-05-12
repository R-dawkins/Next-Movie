import { closeModal, qySel, qySelAll } from "./functions.js";

qySel('.person-modal .modal-close-btn').addEventListener('click',e=>{
  qySelAll('.person-modal ul').forEach((ul)=>{
    ul.style.height = '175px'
  })
closeModal('.person-modal')
})

qySelAll('.more-btn').forEach((btn)=>{
  btn.addEventListener('click',e=>{
    e.currentTarget.classList.toggle('active') //click이벤트의 선택자를 찾는다
    let ul = qySel(e.currentTarget.value)
    if(e.currentTarget.className.includes('active')){
      ul.style.height = ul.scrollHeight+'px'
    }
    else{
      ul.style.height = '175px'
    }
  })//click
})//forEach