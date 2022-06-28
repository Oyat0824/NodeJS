const express = require("express")
const WebSocket = require("ws")
const http = require("http")
const app = express()

app.set("views", __dirname + "/views")                        // 뷰 엔진 페이지 경로 설정
app.set("view engine", "pug")                                // 뷰 엔진 종류 설정
app.use("/static", express.static(__dirname + "/static"))   // static 경로를 추가해 뷰 엔진에서 불러올 수 있도록 설정
// 루트 경로에 렌더할 페이지 설정
app.get("/", (req, res) => {
    res.render("index")
})

const httpServer = http.createServer(app)                        // http 기반에 익스프레스 서버를 넣어둠
const wsServer = new WebSocket.Server({ server:httpServer })    // http 기반에 익스프레스 서버를 넣어둔 것을 웹 소켓 기반의 데이터 통신을 하게 됨

const clients = []  // 접속하는 클라이언트 정보를 모으는 배열 변수

// 웹소켓 서버에 연결이 되었을때 작동
wsServer.on("connection", (socket) => {
    let clinetNum = Math.floor((Math.random() * (100000 - 10000) + 10000))    // 입장 시 고유 난수 번호 부여
    clients.push(socket)                                                     // 클라이언트 접속 시 만들어둔 배열에 정보를 넣어둠
    socket["nickname"] = `익명 ${clinetNum}`                                 // 클라이언트 접속 한 사람에게 닉네임 부여
    // 웹소켓 서버에 메시지를 받았을때 작동
    socket.on("message", (msg) => {
        clients.forEach((aClient) => {
            aClient.send(`${socket.nickname} : ${msg}`)
        })
    })
})

httpServer.listen(3333, () => console.log("PortNum : 3333 ============> RUNNING..."))

