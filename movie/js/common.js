import { qySel, qySelAll } from "./functions.js";
export let scrollY = window.scrollY

const setTopbtn = () => {
  if(scrollY > 300){
    qySel('.top-btn').classList.add('active')
  }else{
    qySel('.top-btn').classList.remove('active')
  }
}//setTopbtn

qySel('.top-btn').addEventListener('click',e=>{
  window.scrollTo({
    top:0,
    behavior : 'smooth'
  })
})

setTopbtn()
window.addEventListener('resize',e=>{
  scrollY = window.scrollY
  setTopbtn()
})
window.addEventListener('scroll',e=>{
  scrollY = window.scrollY
  setTopbtn()
})

qySel('.toggle-btn').addEventListener('click',e=>{
  qySel('.menu-list ul').classList.toggle('active')
})