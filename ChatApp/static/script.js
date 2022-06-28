// 클라이언트에서 웹 소켓 객체를 만들면, 이를 이용해 웹 소켓 서버에 연결 가능!
const socket = new WebSocket("ws://127.0.0.1:3333/")    // 웹 소켓 접속 설정
const form = document.querySelector("form")
const chat = document.querySelector("#chat-line")
const ul = document.querySelector("ul")
const cbtn = document.querySelector(".line")

cbtn.addEventListener("click", function() {
    if(this.classList.contains("on")) {
        this.classList.remove("on")
        this.classList.add("off")
        this.innerHTML = "OFF"
    } else {
        this.classList.remove("off")
        this.classList.add("on")
        this.innerHTML = "ON"
    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const input = form.querySelector("input")
    socket.send(input.value)
    input.value = ""

    // 채팅 스크롤 아래로
    if(cbtn.classList.contains("on")) {
        chat.scrollTop = chat.scrollHeight
    }
})

socket.addEventListener("message", (message) => {
    const li = document.createElement("li")
    li.textContent = message.data
    ul.appendChild(li)

    // 채팅 스크롤 아래로
    if(cbtn.classList.contains("on")) {
        chat.scrollTop = chat.scrollHeight
    }
})