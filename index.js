const http = require("http");

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        res.end("Welcome to Amazon Clone");
    }

    else if (req.url === "/products") {
        res.end("All Products");
    }

    else if (req.url === "/cart") {
        res.end("Your Cart");
    }

    else if (req.url === "/login") {
        res.end("Login Page");
    }

    else {
        res.end("Page Not Found");
    }

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});