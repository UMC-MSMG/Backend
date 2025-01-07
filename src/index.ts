import express from 'express'          // -> ES Module

const app = express()
const port: number = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})