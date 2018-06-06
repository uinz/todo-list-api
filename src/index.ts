import api from './api'

const { PORT = 3030 } = process.env

api.listen(PORT, () => {
  console.log(`api start at http://localhost:${PORT}`)
})