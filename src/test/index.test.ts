import ava, { TestInterface } from 'ava'
import request from 'supertest'
import api from '../api'

const test = ava as TestInterface<{ id: string }>

test.before('test add new todo', async t => {
  const res = await request(api)
    .post('/')
    .send({
      title: 'test todo',
      status: 'active'
    })

  const { id } = res.body
  t.is(res.status, 200)
  t.is(typeof id, 'string')
  t.is(id.length, 36)
  t.context.id = id
})

test('test get todos', async t => {
  const res = await request(api)
    .get('/')

  t.is(res.status, 200)
  t.true(Array.isArray(res.body))

  res.body.forEach((todo: any) => {
    const { id, title, createdAt, updatedAt, status } = todo
    t.is(typeof id, 'string')
    t.is(id.length, 36)
    t.is(typeof title, 'string')
    t.is(typeof createdAt, 'number')
    t.is(typeof updatedAt, 'number')
    t.true(['active', 'completed'].includes(status))
    t.true(updatedAt >= createdAt)
  })
})

test('test get existed todo', async t => {
  const res = await request(api)
    .get(`/${t.context.id}`)

  const { id, title, createdAt, updatedAt, status } = res.body


  t.is(res.status, 200)
  t.is(id, t.context.id)
  t.is(id.length, 36)
  t.is(typeof title, 'string')
  t.is(typeof createdAt, 'number')
  t.is(typeof updatedAt, 'number')
  t.true(['active', 'completed'].includes(status))
  t.true(updatedAt >= createdAt)

})

test('test get unexisted todo', async t => {
  const res = await request(api)
    .get(`/unexisted`)

  t.is(res.status, 404)
  t.is(res.body.message, 'not found')
})

test('test modify todo', async t => {
  const res = await request(api)
    .patch(`/${t.context.id}`)
    .send({
      title: 'modified title',
      status: 'completed'
    })

  t.is(res.status, 200)
  t.is(res.body.message, 'success')
})

test.after('test delete todo', async t => {
  const res = await request(api)
    .delete(`/${t.context.id}`)

  t.is(res.status, 200)
  t.is(res.body.message, 'success')
})
