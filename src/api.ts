import bodyParser from 'body-parser'
import express from 'express'
import uuid from 'uuid'
import db from './db'
import cors from 'cors'

const api = express()
api.use(cors())
api.use(bodyParser.json())

const Todos = db
  .defaults({ todos: [] })
  .get('todos')


// 获取
api.get('/', (req, res) => {
  const todos = Todos.value()
  res.json(todos)
})

// 添加
api.post('/', (req, res) => {
  const { title, status } = req.body
  if (!title) {
    return res
      .status(400)
      .json({ message: '[title] is required' })
  }
  if (!['active', 'completed'].includes(status)) {
    return res
      .status(400)
      .json({ message: "[status] should be 'active' or 'completed'" })
  }
  const now = Date.now()
  const id = uuid()
  Todos
    .push({
      id,
      title,
      status,
      createdAt: now,
      updatedAt: now
    })
    .write()

  res.json({ id })
})

api.get('/:id', (req, res) => {
  const { id } = req.params
  const todo = Todos.find({ id }).value()
  if (!todo) {
    return res
      .status(404)
      .json({ message: 'not found' })
  }

  res.json(todo)
})

// 修改
api.patch('/:id', (req, res) => {
  const { id } = req.params
  const { title, status } = req.body
  const todo = Todos.find({ id }).value()
  if (!todo) {
    return res
      .status(404)
      .json({ message: 'not found' })
  }
  if (!title) {
    return res
      .status(400)
      .json({ message: '[title] is required' })
  }
  if (!['active', 'completed'].includes(status)) {
    return res
      .status(400)
      .json({ message: "[status] should be 'active' or 'completed'" })
  }

  Todos
    .find({ id })
    .assign({
      title,
      status,
      updatedAt: Date.now()
    })
    .write()

  res.json({ message: 'success' })
})

// 删除
api.delete('/:id', (req, res) => {
  const { id } = req.params
  const todo = Todos.find({ id }).value()
  if (!todo) {
    return res
      .status(404)
      .json({ message: 'not found' })
  }
  Todos
    .remove({ id })
    .write()

  res.json({ message: 'success' })
})

export default api

