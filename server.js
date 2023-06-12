const express = require("express");
const app = express();

app.use('/', require("./routes"));

const PORT = 3000;
app.listen(PORT, () => {
console.log(`Web Server is listening at port :${PORT}`)
});

