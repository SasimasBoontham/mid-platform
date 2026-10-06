# Campus Equipment Booking API

## Base URL
`http://127.0.0.1:8787`

## How to Run
1. Install dependencies: `npm install`
2. Run local server: `npx wrangler dev --local --ip 127.0.0.1 --port 8787`

## ERD / Schema Overview
- **equipment**: `id` (TEXT, PK), `name` (TEXT), `location` (TEXT)
- **bookings**: `id` (TEXT, PK), `equipmentId` (TEXT, FK), `borrowerName` (TEXT), `startAt` (TEXT), `endAt` (TEXT), `purpose` (TEXT)