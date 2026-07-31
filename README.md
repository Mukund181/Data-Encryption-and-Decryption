# Data Encryption and Decryption (Web Frontend + C++ Logic Engine)

This project demonstrates a decoupled architecture where the **Frontend (HTML, CSS, JavaScript)** handles user interaction and delegates all cipher processing logic to a **C++ Core Engine (`cipher.cpp`)** running via **WebAssembly**.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      index.html                         │
│             (HTML5 Interface & CSS3 Styling)            │
└────────────────────────────┬────────────────────────────┘
                             │ DOM Input & Button Events
                             ▼
┌─────────────────────────────────────────────────────────┐
│                        script.js                        │
│             (Web Frontend & WebAssembly Loader)         │
└────────────────────────────┬────────────────────────────┘
                             │ Calls Exported C++ Functions
                             ▼
┌─────────────────────────────────────────────────────────┐
│                     C++ Core Engine                     │
│                       cipher.cpp                        │
│    (Custom Stack & Queue + Vigenère Cipher Algorithm)   │
└─────────────────────────────────────────────────────────┘
```

---

## Why Vigenère Cipher over Caesar Cipher?

| Feature | Caesar Cipher | Vigenère Cipher (Used Here) |
| :--- | :--- | :--- |
| **Shift Mechanism** | Single static integer shift (1-25) | Dynamic shift driven by a secret keyword |
| **Security** | Vulnerable to brute force (25 keys) or letter frequency analysis | Resistant to frequency analysis ($26^{\text{key\_length}}$ combinations) |
| **Data Structures** | Simple arrays | Custom C++ `Stack` (LIFO) & `Queue` (FIFO) |

---

## How to Run

Simply open `index.html` directly in any web browser!

1. Open the project folder.
2. Double-click `index.html` (or drag it into your browser).
3. Enter your message and secret key (e.g. `KEY`).
4. Click **Encrypt** or **Decrypt**.

---

## Re-compiling the C++ Engine (Optional)

If you modify `cipher.cpp` and want to recompile it:

### Native CLI Build:
```bash
g++ -std=c++17 cipher.cpp -o cipher
```

### WebAssembly (Emscripten) Build:
```bash
emcc cipher.cpp -O3 -s WASM=1 -s EXPORTED_FUNCTIONS="['_c_encrypt', '_c_decrypt']" -s EXTRA_EXPORTED_RUNTIME_METHODS="['cwrap']" -o cipher.js
```

---

## Project Structure

```
Data-Encryption-and-Decryption
│
├── cipher.cpp          # C++ Core Engine (Vigenère Cipher + Stack & Queue)
├── index.html          # Web Frontend Interface
├── style.css           # Modern Styling
├── script.js           # Frontend WebAssembly Bridge
└── README.md           # Documentation
```

---

## Author

**Mukund Fegade**
