# api-virtual-classroom-strativ

## Setup

Make sure to install the dependencies:
```bash
# npm
npm install
```

## Development Server

Start the development server on http://localhost:4000

```bash
npm start
```
## In .env file
```
APP_PORT=
JWT_SECRET=
JWT_EXPIRES_IN=
JWT_COOKIE_EXPIRES_IN=

```
## Routes
For Create Admin
```
http://localhost:4000/api/admin/create-admin (name,email,password) (method:POST)

```
For Admin Login
```
http://localhost:4000/api/admin/admin-login (email,password)(method:POST)

```
For Create Teacher
```
http://localhost:4000/api/admin/create-teacher (name,email,with admin json web token,password will be auto generated and show in the console) (method:POST)

```
For Teacher Login
```
http://localhost:4000/api/teacher/teacher-login (email, with auto generated password) (method:POST)

```

For Create Classroom
```
http://localhost:4000/api/classroom/create (name, subject_code, with teacher json web token ) (method:POST)

```
