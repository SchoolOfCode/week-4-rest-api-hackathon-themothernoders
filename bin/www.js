// local host is here so dont message with it! This is more of a warning for me that for you to be honest

import app from "../app.js"

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(` IT'S ALIVE!! http://localhost:${PORT}`)
})