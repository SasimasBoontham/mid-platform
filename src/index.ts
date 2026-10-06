import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors())

// หน้าแรก ( Root Path ) เพื่อไม่ให้ขึ้น 404
app.get('/', (c) => {
  return c.json({
    status: 'ok',
    message: 'Midterm API is running successfully!',
    timestamp: new Date().toISOString()
  })
})

export default app