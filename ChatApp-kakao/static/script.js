// 클라이언트에서 웹 소켓 객체를 만들면, 이를 이용해 웹 소켓 서버에 연결 가능!
const socket = new WebSocket("ws://127.0.0.1:3333/")    // 웹 소켓 접속 설정
const chat = document.getElementById("chat-line")
const form = document.querySelector("form")
const cbtn = document.getElementById("line")

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

socket.addEventListener("message", (message) => {
    const row = document.createElement("div")
    const data = JSON.parse(message.data)
    row.classList.add("chatbox")
    row.classList.add(data.my ? "my" : "you")
    const nick = document.createElement("span")
    const text = document.createElement("div")
    nick.innerText = data.nick
    text.innerText = data.msg
    chat.append(row)
    row.append(nick)
    row.append(text)

    if(cbtn.classList.contains("on")) chat.scrollTop = chat.scrollHeight
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const input = form.querySelector("input")
    socket.send(input.value)
    input.value = ""
})
