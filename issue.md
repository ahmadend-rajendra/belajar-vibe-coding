# Project Setup: REST API with Bun, Elysia.js, Drizzle ORM, and MySQL

## 1. Overview
Inisialisasi dan konfigurasi proyek REST API baru pada direktori ini menggunakan runtime **Bun**, framework **Elysia.js**, ORM **Drizzle**, dan database **MySQL**. Proyek ini ditujukan sebagai pondasi backend service yang ringan, cepat, dan modular.

---

## 2. Tech Stack
- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **Web Framework**: [Elysia.js](https://elysiajs.com/)
- **ORM & Migrations**: [Drizzle ORM](https://orm.drizzle.team/) + `drizzle-kit`
- **Database Driver**: `mysql2` (koneksi ke MySQL Database)
- **Environment Management**: Bun native environment support / `.env`

---

## 3. High-Level Implementation Steps

### Phase 1: Project Initialization
- Inisialisasi package project menggunakan Bun (`bun init` atau konfigurasi `package.json`).
- Install dependencies utama:
  - `elysia`
  - `drizzle-orm`
  - `mysql2`
- Install development dependencies:
  - `drizzle-kit`
  - Type definitions (misal `@types/bun`)
- Konfigurasi `tsconfig.json` standar untuk Bun dan Elysia.

### Phase 2: Environment & Database Configuration
- Buat file template environment (`.env.example` dan `.env`) yang memuat koneksi database:
  - `DATABASE_URL` atau host, port, user, password, dan database name.
- Setup file koneksi database:
  - Konfigurasi connection pool menggunakan `mysql2/promise`.
  - Inisialisasi client Drizzle instance untuk digunakan di seluruh aplikasi.
- Konfigurasi `drizzle.config.ts` untuk migrasi schema MySQL.

### Phase 3: Project Structure & Schema Design
- Susun struktur direktori proyek yang rapi dan modular, contohnya:
  ```text
  ├── src/
  │   ├── db/              # Inisialisasi koneksi DB dan schema
  │   │   ├── index.ts
  │   │   └── schema.ts
  │   ├── modules/         # Domain/feature modules (routes, services, handlers)
  │   └── index.ts         # Entry point aplikasi Elysia
  ├── drizzle/             # Direktori hasil migrasi (drizzle-kit)
  ├── drizzle.config.ts
  ├── .env.example
  └── package.json
  ```
- Buat schema contoh/dasar (misal: tabel `users` atau healthcheck/items) menggunakan Drizzle MySQL types.
- Siapkan scripts migrasi di `package.json` (generate & push/migrate).

### Phase 4: Elysia Application & Routes
- Buat entry point server Elysia di `src/index.ts`.
- Tambahkan endpoint dasar:
  - `GET /` atau `GET /health`: Cek status server dan konektivitas database.
  - CRUD dasar untuk schema contoh guna memverifikasi integrasi Elysia + Drizzle + MySQL.
- Terapkan validasi schema Elysia (`t` schema builder) untuk request body/query.

### Phase 5: Verification & Quality Check
- Jalankan migrasi database (`bun run drizzle-kit generate` / `migrate`).
- Jalankan server development (`bun run dev`).
- Uji endpoint menggunakan cURL, HTTP client, atau Elysia Swagger documentation plugin (opsional).

---

## 4. Definition of Done (DoD)
1. Project dapat dijalankan tanpa error menggunakan perintah `bun dev` atau `bun run src/index.ts`.
2. Koneksi ke MySQL berhasil diverifikasi via Drizzle.
3. Migrasi schema dapat di-generate dan diaplikasikan ke database.
4. Minimal 1 set endpoint (Healthcheck atau CRUD sederhana) merespons request dengan status dan data yang sesuai.
5. Dokumentasi singkat (`README.md`) tersedia mengenai cara setup environment dan menjalankan server.
