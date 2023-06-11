const express = require("express")
const app = express()

app.use("/", require("./router"))

const PORT = 3000
app.listen(PORT, () => {
console.log(`Running on :${PORT}`)
})
