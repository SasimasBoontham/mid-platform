# API Contract & Specification

Base URL: `http://localhost:8787/api`

## Endpoints Summary

| Method | Endpoint | Success Status | Description |
|---|---|---|---|
| GET | `/equipment` | 200 OK | Retrieve all registered equipment |
| GET | `/bookings` | 200 OK | Retrieve all active bookings |
| GET | `/bookings/:id` | 200 OK | Get details of a specific booking |
| POST | `/bookings` | 201 Created | Create a new booking |
| PATCH | `/bookings/:id` | 200 OK | Update an existing booking |
| DELETE | `/bookings/:id` | 204 No Content | Delete a booking |

## Error Status Codes & Assumptions

- **400 Bad Request**: Returned when required JSON fields are missing, JSON is malformed, or `startAt` is not strictly before `endAt`.
- **404 Not Found**: Returned when a booking ID does not exist, or the specified `equipmentId` is not found in the database.
- **409 Conflict**: Returned when the requested booking time window overlaps with an existing reservation for the same equipment.

## Standard Error Response Schema
```json
{
  "error": "Reason for the failure"
}