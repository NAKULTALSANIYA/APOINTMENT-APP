# Multi-Vendor Service Booking Backend

## Roles
- `user`: browse services and create/manage own bookings
- `vendor`: register as service provider and manage own services + booking statuses
- `admin`: manage users/vendors and view all platform services/bookings

## Environment variables
Create `.env` in `backend`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/appointment_app
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Optional bootstrap admin
ADMIN_NAME=Platform Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

## Run
```bash
npm install
npm run start
```

## Auth APIs
- `POST /api/auth/register`
  - user register body:
    ```json
    { "name": "User", "email": "user@mail.com", "password": "123456", "role": "user" }
    ```
  - vendor register body:
    ```json
    {
      "name": "Vendor",
      "email": "vendor@mail.com",
      "password": "123456",
      "role": "vendor",
      "vendorProfile": {
        "businessName": "Diamond Smart City",
        "category": "salon",
        "city": "Surat",
        "address": "Main road"
      }
    }
    ```
- `POST /api/auth/login`
- `POST /api/auth/login-vendor`
  - vendor-only login body:
    ```json
    {
      "email": "vendor@mail.com",
      "password": "123456"
    }
    ```
- `POST /api/auth/login-admin`
  - admin-only login body:
    ```json
    {
      "email": "admin@example.com",
      "password": "admin123"
    }
    ```
- `POST /api/auth/register-vendor`
  - vendor-only register body:
    ```json
    {
      "name": "Vendor",
      "email": "vendor@mail.com",
      "password": "123456",
      "phone": "+91xxxxxxxxxx",
      "vendorProfile": {
        "businessName": "Diamond Smart City",
        "category": "salon",
        "city": "Surat",
        "address": "Main road"
      }
    }
    ```
- `GET /api/auth/me` (Bearer token)

## Service APIs
- `GET /api/services/categories`
- `GET /api/services?category=salon&city=Surat&vendor=<vendorId>&search=hair`
- `GET /api/services/:id`

Supported categories:
- `salon`
- `beauty-parlor`
- `doctor-appointment`
- `hospital`
- `home-service`
- `car-bike-service`
- `lawyer`
- `hotel-guest-room`
- `education`

## Booking APIs
- `POST /api/bookings` (user)
  - body:
    ```json
    {
      "serviceId": "<serviceId>",
      "scheduleAt": "2026-04-10T10:00:00.000Z",
      "contactPhone": "+91xxxxxxxxxx",
      "address": "User address",
      "notes": "Need quick service"
    }
    ```
- `GET /api/bookings/my-bookings` (user)
- `PATCH /api/bookings/my-bookings/:id/cancel` (user)

## Vendor APIs (Dedicated Module)
- `GET /api/vendor/me`
- `PATCH /api/vendor/me`
- `GET /api/vendor/services`
- `POST /api/vendor/services`
- `PATCH /api/vendor/services/:id`
- `DELETE /api/vendor/services/:id`
- `GET /api/vendor/bookings`
- `PATCH /api/vendor/bookings/:id/status`
  - body: `{ "status": "confirmed" }`
  - statuses: `confirmed`, `in-progress`, `completed`, `cancelled`

## Admin APIs
- `GET /api/admin/users`
- `GET /api/admin/vendors`
- `PATCH /api/admin/users/:id/role`
- `PATCH /api/admin/vendors/:id/approval`
- `GET /api/admin/services`
- `GET /api/admin/bookings`
