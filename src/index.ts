import { Hono } from 'hono'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// GET /equipment (และ /equipments)
app.get('/equipment', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM equipment').all()
  return c.json(results)
})
app.get('/equipments', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM equipment').all()
  return c.json(results)
})

// GET /bookings - List all bookings
app.get('/bookings', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM bookings').all()
  return c.json(results)
})

// GET /bookings/:id - Get one booking
app.get('/bookings/:id', async (c) => {
  const id = c.req.param('id')
  const booking = await c.env.DB.prepare('SELECT * FROM bookings WHERE id = ?').bind(id).first()
  if (!booking) return c.json({ error: 'Booking not found' }, 404)
  return c.json(booking)
})

// POST /bookings - Create booking
app.post('/bookings', async (c) => {
  try {
    const { equipmentId, borrowerName, startAt, endAt, purpose } = await c.req.json()

    if (!equipmentId || !borrowerName || !startAt || !endAt || !purpose) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    const start = new Date(startAt).getTime()
    const end = new Date(endAt).getTime()
    if (isNaN(start) || isNaN(end) || start >= end) {
      return c.json({ error: 'startAt must be earlier than endAt' }, 400)
    }

    const eq = await c.env.DB.prepare('SELECT id FROM equipment WHERE id = ?').bind(equipmentId).first()
    if (!eq) return c.json({ error: 'Equipment not found' }, 404)

    const overlap = await c.env.DB.prepare(
      'SELECT id FROM bookings WHERE equipmentId = ? AND startAt < ? AND endAt > ?'
    ).bind(equipmentId, endAt, startAt).first()

    if (overlap) return c.json({ error: 'Equipment is already booked for the selected time range' }, 409)

    const id = `bk-${Date.now()}`
    await c.env.DB.prepare(
      'INSERT INTO bookings (id, equipmentId, borrowerName, startAt, endAt, purpose) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(id, equipmentId, borrowerName, startAt, endAt, purpose).run()

    return c.json({ id, equipmentId, borrowerName, startAt, endAt, purpose }, 201)
  } catch (err: any) {
    return c.json({ error: err.message || 'Internal Server Error' }, 500)
  }
})

// PATCH /bookings/:id - Update booking
app.patch('/bookings/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const current = await c.env.DB.prepare('SELECT * FROM bookings WHERE id = ?').bind(id).first() as any
  if (!current) return c.json({ error: 'Booking not found' }, 404)

  const equipmentId = body.equipmentId || current.equipmentId
  const borrowerName = body.borrowerName || current.borrowerName
  const startAt = body.startAt || current.startAt
  const endAt = body.endAt || current.endAt
  const purpose = body.purpose || current.purpose

  const start = new Date(startAt).getTime()
  const end = new Date(endAt).getTime()
  if (start >= end) return c.json({ error: 'startAt must be earlier than endAt' }, 400)

  const overlap = await c.env.DB.prepare(
    'SELECT id FROM bookings WHERE equipmentId = ? AND startAt < ? AND endAt > ? AND id != ?'
  ).bind(equipmentId, endAt, startAt, id).first()

  if (overlap) return c.json({ error: 'Equipment is already booked for the selected time range' }, 409)

  await c.env.DB.prepare(
    'UPDATE bookings SET equipmentId=?, borrowerName=?, startAt=?, endAt=?, purpose=? WHERE id=?'
  ).bind(equipmentId, borrowerName, startAt, endAt, purpose, id).run()

  return c.json({ id, equipmentId, borrowerName, startAt, endAt, purpose })
})

// DELETE /bookings/:id - Delete booking
app.delete('/bookings/:id', async (c) => {
  const id = c.req.param('id')
  const current = await c.env.DB.prepare('SELECT * FROM bookings WHERE id = ?').bind(id).first()
  if (!current) return c.json({ error: 'Booking not found' }, 404)

  await c.env.DB.prepare('DELETE FROM bookings WHERE id = ?').bind(id).run()
  return c.body(null, 204)
})

export default app