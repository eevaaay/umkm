# Lapak.in

Frontend marketplace multi-toko (mirip Shopee/Tokopedia), React + Vite, **tersambung ke API
Laravel** — bukan lagi data statis. Data mock lama masih ada di `src/data/` sebagai referensi
struktur field saja, tapi semua halaman sekarang fetch dari backend lewat `src/api/`.

## Menjalankan secara lokal

```bash
npm install
cp .env.example .env      # lalu sesuaikan VITE_API_URL kalau perlu
npm run dev
```

Buka `http://localhost:5173`. Pastikan backend Laravel-mu sudah jalan di alamat yang
ditulis di `.env` (default `http://localhost:8000/api`).

## Struktur folder

```
src/
  api/           satu file per resource: auth, stores, products, orders, admin
                 (fungsi fetch() ke Laravel — lihat komentar di tiap file untuk
                 kontrak endpoint yang diharapkan)
  utils/         visuals.js (ikon/gradient turunan dari category & id),
                 pricing.js (hitung harga setelah diskon)
  data/          taksonomi kategori (tetap statis) + contoh data lama untuk referensi
  context/       AppContext — tema, keranjang, sesi login (token disimpan di localStorage)
  components/    Header, Footer, komponen UI kecil yang dipakai berulang
  pages/         satu file per halaman
  pages/admin/   panel admin (dashboard, kelola toko/produk/pesanan/pengguna)
```

## Menyambungkan ke backend Laravel

### 1. Autentikasi — pakai Laravel Sanctum (token, bukan cookie)

ERD kamu sudah punya tabel `personal_access_tokens`, jadi tinggal pasang Sanctum:

```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

Tambahkan `HasApiTokens` ke model `User`, dan tambah kolom `role` (enum:
`admin`, `store_owner`, `customer`) di migration `users` — ERD lama belum punya kolom ini.

Contoh route (`routes/api.php`):

```php
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn (Request $r) => $r->user());
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'myOrders']);

    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('/stats', [AdminController::class, 'stats']);
        Route::get('/stores', [AdminController::class, 'stores']);
        Route::patch('/stores/{store}/verify', [AdminController::class, 'verifyStore']);
        Route::get('/products', [AdminController::class, 'products']);
        Route::get('/orders', [AdminController::class, 'orders']);
        Route::patch('/orders/{order}', [AdminController::class, 'updateOrderStatus']);
        Route::get('/users', [AdminController::class, 'users']);
    });
});

Route::get('/stores', [StoreController::class, 'index']);
Route::get('/stores/{store}', [StoreController::class, 'show']);
Route::get('/stores/{store}/products', [StoreController::class, 'products']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
```

Contoh `AuthController@login`:

```php
public function login(Request $request)
{
    $request->validate(['email' => 'required|email', 'password' => 'required']);

    $user = User::where('email', $request->email)->first();
    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Email atau kata sandi salah.'], 422);
    }

    return [
        'user' => ['id' => $user->id, 'name' => $user->name, 'email' => $user->email, 'role' => $user->role],
        'token' => $user->createToken('lapakin')->plainTextToken,
    ];
}
```

### 2. CORS

Izinkan origin frontend-mu di `config/cors.php` (`paths => ['api/*']`,
`allowed_origins => ['http://localhost:5173']` untuk dev).

### 3. Bentuk data (JSON shape)

Lihat komentar di masing-masing file `src/api/*.js` — di situ tertulis persis field
apa yang diharapkan frontend untuk tiap endpoint (produk, toko, pesanan, dst),
supaya kamu tinggal bikin `API Resource` di Laravel yang mengembalikan bentuk yang sama.

Kolom tambahan yang perlu kamu tambahkan di luar ERD dasar (karena murni kebutuhan
tampilan marketplace, bukan data transaksional):

- `stores`: `category`, `rating`, `sold`, `followers`, `verified`, `joined`, `description`
- `products`/`product_details`: `category`, `discount`, `rating`, `sold`
- `users`: `role` (`admin` | `store_owner` | `customer`)

### 4. Setelah backend siap

Cukup jalankan `npm run dev` lagi — semua halaman (beranda, produk, toko, keranjang,
checkout, login, panel admin) otomatis fetch dari API, tidak perlu ubah kode frontend lagi
selama bentuk JSON-nya sesuai kontrak di `src/api/`.

## Build untuk produksi

```bash
npm run build
npm run preview
```
