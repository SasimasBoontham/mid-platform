# Campus Equipment Booking API - Midterm Practical Lab Test

Base API URL used for testing: `http://localhost:8787/api`

---

## How to Run

1. Clone repository and install dependencies:
   ```bash
   git clone [https://github.com/SasimasBoontham/mid-platform.git](https://github.com/SasimasBoontham/mid-platform.git)
   cd mid-platform
   npm install

   npx wrangler d1 execute <YOUR_D1_DATABASE_NAME> --local --file=./schema.sql
   npm run dev
   curl -X GET http://localhost:8787/api/equipment
   [
  { "id": "eq-1", "name": "Projector A", "location": "Building 1" },
  { "id": "eq-2", "name": "Camera B", "location": "Building 2" }
]
curl -X POST http://localhost:8787/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "equipmentId": "eq-1",
    "borrowerName": "Somchai Jaidee",
    "startAt": "2026-10-20T09:00:00.000Z",
    "endAt": "2026-10-20T11:00:00.000Z",
    "purpose": "Class presentation"
  }'
  {
  "id": "book-1",
  "equipmentId": "eq-1",
  "borrowerName": "Somchai Jaidee",
  "startAt": "2026-10-20T09:00:00.000Z",
  "endAt": "2026-10-20T11:00:00.000Z",
  "purpose": "Class presentation"
}
curl -X POST http://localhost:8787/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "equipmentId": "eq-1",
    "borrowerName": "Somchai Jaidee",
    "startAt": "2026-10-20T11:00:00.000Z",
    "endAt": "2026-10-20T09:00:00.000Z",
    "purpose": "Invalid time test"
  }'
  {
  "error": "startAt must be strictly before endAt"
}

curl -X POST http://localhost:8787/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "equipmentId": "eq-1",
    "borrowerName": "Somsak Rakเรียน",
    "startAt": "2026-10-20T10:00:00.000Z",
    "endAt": "2026-10-20T12:00:00.000Z",
    "purpose": "Overlapping request"
  }'

  {
  "error": "Equipment eq-1 is already booked during the selected time period"
}
curl -X GET http://localhost:8787/api/bookings/non-existent-id
{
  "error": "Booking not found"
}
