# CRUD Laravel API

Aplikasi API CRUD sederhana menggunakan Laravel dengan manajemen user. API ini mendukung operasi dasar seperti Create, Read, Update, dan Delete untuk entitas user.

## Teknologi yang Digunakan

-   Laravel 12
-   PostgreSQL
-   Docker
-   Swagger untuk dokumentasi API
-   Mocha & Chai untuk unit testing

## Fitur

-   Manajemen User CRUD (Create, Read, Update, Delete)
-   Validasi input
-   Response format JSON standar
-   Dokumentasi API dengan Swagger
-   Unit testing untuk semua endpoint

## Prasyarat

-   PHP 8.2+
-   Composer
-   Node.js & NPM
-   Docker dan Docker Compose (opsional)

## Instalasi

### Cara 1: Instalasi Manual

1. Clone repository:

    ```bash
    git clone https://github.com/yogaprasetya22/test-laravel
    cd test-crud-laravel
    ```

2. Install dependencies:

    ```
    composer install
    npm install
    ```

3. Salin file .env.example:

    ```
    cp .env.example .env
    ```

4. Genereate app key:

    ```
    php artisan key:generatephp artisan key:generate
    ```

5. Konfigurasi database di file .env:

    ```
    DB_CONNECTION=pgsql
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_DATABASE=crud-laravel-db
    DB_USERNAME=username
    DB_PASSWORD=password
    ```

6. Jalankan migrasi:

    ```
    php artisan migrate
    ```

7. Jalankan server:

    ```
    php artisan serve
    ```

8. Akses aplikasi di
- http://localhost:8000 
- http://localhost:8000/api/documentation 

# Cara 2: Instalasi dengan Docker

1. Clone repository:

    ```
    git clone https://github.com/yogaprasetya22/test-laravel
    cd test-crud-laravel
    ```

2. Salin file .env.example:

    ```
    cp .env.example .env
    ```

3. Ubah konfigurasi database di file .env:

    ```
    DB_CONNECTION=pgsql
    DB_HOST=db
    DB_PORT=5432
    DB_DATABASE=crud-laravel-db
    DB_USERNAME=jagres
    DB_PASSWORD=Jagres112.
    ```

4. Build dan jalankan container:
   
    `docker-compose up -d --build
` /  `docker compose up -d --build
`

5. Masuk ke container dan lakukan setup:

    ```
     docker-compose exec app composer install
     docker-compose exec app php artisan key:generate
     docker-compose exec app php artisan migrate
     docker-compose exec app php artisan l5-swagger:generate
    ```

6. Akses aplikasi di http://localhost:8000

## Menjalankan Unit Test

```
npm test
```

Dokumentasi API
Dokumentasi API tersedia di http://localhost:8000/api/documentation setelah aplikasi dijalankan.

Endpoint yang tersedia:

- GET /api/users - Mendapatkan semua users
- GET /api/users/{uuid} - Mendapatkan detail user
- POST /api/users - Membuat user baru
- PATCH /api/users/{uuid} - Memperbarui user
- DELETE /api/users/{uuid} - Menghapus user
- GET /api/db-check - Memeriksa koneksi database

# Struktur Proyek

````
test-crud-laravel/
├── app/                        # Kode aplikasi utama
│   ├── Console/                # Console commands
│   ├── Exceptions/             # Exception handlers
│   ├── Http/                   # HTTP layer
│   │   ├── Controllers/        # Controllers
│   │   ├── Middleware/         # Request middleware
│   │   └── Requests/           # Form requests
│   └── Models/                 # Eloquent models
├── bootstrap/                  # Bootstrap files
├── config/                     # Configuration files
├── database/                   # Database files
│   ├── factories/              # Model factories
│   ├── migrations/             # Database migrations
│   └── seeders/                # Database seeders
├── public/                     # Public files
├── resources/                  # Resources
├── routes/                     # Route definitions
│   ├── api.php                 # API routes
│   └── web.php                 # Web routes
├── storage/                    # Storage
├── tests/                      # Test files
│   ├── Feature/                # Feature tests
│   ├── Unit/                   # Unit tests
│   └── js/                     # JavaScript tests
├── .dockerignore              # Docker ignore file
├── .env                        # Environment config
├── .env.example                # Environment example
├── .gitignore                  # Git ignore file
├── composer.json               # Composer dependencies
├── docker-compose.yml          # Docker compose config
├── Dockerfile                  # Docker config
├── package.json                # NPM dependencies
└── README.md                   # README file
````
