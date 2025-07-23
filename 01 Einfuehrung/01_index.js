const http = require("http");

const requestListener = (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, World!\ntest");
};
const port = 8080;
const server = http.createServer(requestListener);
server.listen(port);
console.log(`Server is running on http://localhost:${port}`);

module.exports.getData = function getData() {
    let aesTime = new Date().toLocaleTimeString();
    return asesTime;
};

// function assTwo(num){
//     return num + 4;
// }
// export{assTwo};
