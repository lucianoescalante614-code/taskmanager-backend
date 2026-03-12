# Task Manager API

Backend del trabajo final Full-Stack desarrollado con **Node.js + Express**.

## Tecnologías

* Node.js
* Express
* SQLite
* JWT Authentication
* bcrypt
* nodemailer
* dotenv

## Instalación

Clonar el repositorio:

```
git clone https://github.com/lucianoescalante614-code/taskmanager-backend.git
```

Entrar en la carpeta:

```
cd taskmanager-backend
```

Instalar dependencias:

```
npm install
```

Crear archivo `.env` basado en `.env.example`.

Iniciar el servidor:

```
node src/index.js
```

Servidor disponible en:

```
http://localhost:4000
```

## API Deployada

https://taskmanager-api-tjqj.onrender.com

---

# Endpoints

## Auth

### Registro

POST `/api/auth/register`

Body:

```
{
"name": "Luciano",
"email": "test@email.com",
"password": "123456"
}
```

---

### Login

POST `/api/auth/login`

Body:

```
{
"email": "test@email.com",
"password": "123456"
}
```

Devuelve JWT.

---

## Courts

### Obtener canchas

GET `/api/courts`

---

### Crear cancha

POST `/api/courts`

Requiere token JWT.

---

### Actualizar cancha

PUT `/api/courts/:id`

---

### Eliminar cancha

DELETE `/api/courts/:id`

---

## Reservations

### Obtener reservas

GET `/api/reservations`

---

### Crear reserva

POST `/api/reservations`

---

### Eliminar reserva

DELETE `/api/reservations/:id`
