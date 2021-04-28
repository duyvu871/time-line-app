class RequestInit {
    constructor(){
    }
     async getReq(url,obj = undefined){
        if (obj){
            const response = await fetch(url)
            return response.json() 
        }else{

        }
    }
    async postReq(url,data){
        const headers = new Headers()
        headers.append(data.headers.type,data.headers.content)
        const body = new URLSearchParams()
        for (const key in data.body) {
           body.append(key,data.body[key])
        }
        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: body,
            redirect: 'follow'
        };
        return await fetch(url,requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
}
const getParent = (element,selector) => {
    while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
            return element.parentElement
        }
        element= element.parentElement
    }
 }
const newRequest = new RequestInit()
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const getFullDataFrom = node => ([...$$(`${node} [name]`)].reduce((acc,curr) => ({...acc,[curr.name]:curr.value}) ,{}))
const createElement = domString => new DOMParser().parseFromString(domString, 'text/html').body.firstChild;
const htmls = data => {
    return `
    <li>
        <div>
            <time>${data.time} - ${data['main-event']}</time> 
            <p>${data.horizontal}</p>
        </div>
    </li>
    `
}
const btn = $('.button-icon')
const input = $$('.container [name]')
const clickEvent = e => {
    const valueIsCheck = checkedForm()
    if (valueIsCheck.indexOf(false) !== -1) {
        valueIsCheck.forEach((v,i) => {
            const parentEl = getParent(input[i],'.adding')
            const onInputMode = e => {
                if(e.target.value !== ''){
                    parentEl.querySelector('.checked').innerText = ``
                    parentEl.querySelector('.checked').classList.remove('active')
                    input[i].classList.remove('active')
                }
            }
            if (!v) {
                parentEl.querySelector('.checked').innerText = `Mời nhập ${input[i].id}`
                parentEl.querySelector('.checked').classList.add('active')
                input[i].classList.add('active')
                input[i].addEventListener('input',onInputMode)
            }
        });
    }else{
      const data = getFullDataFrom('.section')
      const option = {
          headers:{
              type:"Content-Type",
              content:"application/x-www-form-urlencoded"
          },
          body:data
      }
      newRequest.postReq('http://localhost:3000/event',option)
    }
}
const checkedForm = () => {
    return ([...input].map(el => (el.value === '') ? false : true ))
}
btn.addEventListener('click',clickEvent)
document.addEventListener('DOMContentLoaded',()=>{
    newRequest.getReq('http://localhost:3000/evensdbt',{})
    .then(result => {
        datas.forEach(v =>  $('.timeline ol').appendChild(createElement(htmls(v))))
    })
})
