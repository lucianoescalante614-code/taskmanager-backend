# Reserva tu Cancha - Backend

API Node.js/Express para el TP final de Reserva de Canchas.

Requisitos básicos:
- Node.js + Express
- MongoDB (Mongoose)
- Autenticación con bcrypt + JWT
- Verificación por correo con nodemailer
- Arquitectura: routes → controllers → services → repositories

Instalación rápida:

1. Copiar `.env.example` a `.env` y completar variables (MONGO_URI, EMAIL_USER, EMAIL_PASS, JWT_SECRET, FRONTEND_URL)
2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar en desarrollo:

```bash
npm run dev
```

Endpoints importantes:
- POST /api/auth/register
- GET /api/auth/verify?token=...
- POST /api/auth/login

Notas:
- Uso Gmail para envío de correos en desarrollo (ver `.env.example`). Para producción recomendamos usar un servicio como SendGrid o configuraciones SMTP seguras.
- Postman collection en `postman_collection.json`.
