# Vibe Coding API

REST API dibangun dengan **Bun**, **Elysia.js**, **Drizzle ORM**, dan **MySQL**.

## Tech Stack
- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [Elysia.js](https://elysiajs.com/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Database**: MySQL (`mysql2` driver)

---

## Struktur Direktori
```text
├── src/
│   ├── db/
│   │   ├── index.ts        # Inisialisasi koneksi MySQL pool & Drizzle instance
│   │   └── schema.ts       # Definisi schema database (Users table)
│   ├── modules/
│   │   ├── health/         # Healthcheck route
│   │   │   └── index.ts
│   │   └── users/          # Users CRUD routes
│   │       └── index.ts
│   └── index.ts            # Entry point aplikasi Elysia
├── drizzle/                # File migrasi SQL hasil generate
├── drizzle.config.ts       # Konfigurasi Drizzle Kit
├── .env.example            # Template environment variables
├── package.json
└── README.md
```

---

## Persiapan & Instalasi

### 1. Install Dependencies
```bash
bun install
```

### 2. Konfigurasi Environment
Salin `.env.example` ke `.env` dan sesuaikan kredensial MySQL Anda:
```bash
cp .env.example .env
```

Isi variabel berikut di `.env`:
```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=vibe_coding_db
DATABASE_URL=mysql://root:your_password@localhost:3306/vibe_coding_db
```

---

## Database Migration

1. **Generate Migration Files**:
   ```bash
   bun run db:generate
   ```
2. **Push Migration Langsung ke Database**:
   ```bash
   bun run db:push
   ```
3. **Buka Drizzle Studio (Database GUI Viewer)**:
   ```bash
   bun run db:studio
   ```

---

## Menjalankan Server

- **Development Mode** (auto-reload):
  ```bash
  bun run dev
  ```
- **Production Mode**:
  ```bash
  bun run start
  ```

Server default berjalan di `http://localhost:3000`.

---

## Endpoints

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/` | API status dan daftar route |
| `GET` | `/health` | Healthcheck server & status koneksi database |
| `GET` | `/users` | Mengambil seluruh user |
| `GET` | `/users/:id` | Mengambil detail user berdasarkan ID |
| `POST` | `/users` | Membuat user baru (`{ "name": "...", "email": "..." }`) |
| `DELETE` | `/users/:id` | Menghapus user berdasarkan ID |
