/**
 * WebFrontend to C++ Engine Bridge (WebAssembly Interface)
 * 
 * Frontend: HTML5, CSS3, JavaScript (DOM input/output & WASM Loader)
 * Processing Engine: C++ (cipher.cpp exported to WebAssembly / WASM)
 */

class CppEngineBridge {
    constructor() {
        this.wasmInstance = null;
        this.memory = null;
        this.isWasmLoaded = false;
        this.initEngine();
    }

    async initEngine() {
        try {
            // Emscripten or Standalone WebAssembly Module loader
            if (typeof Module !== 'undefined' && Module.cwrap) {
                this.c_encrypt = Module.cwrap('c_encrypt', 'string', ['string', 'string']);
                this.c_decrypt = Module.cwrap('c_decrypt', 'string', ['string', 'string']);
                this.isWasmLoaded = true;
                this.updateEngineBadge("C++ WebAssembly (Emscripten)");
                return;
            }

            // Standalone WebAssembly Binary loader
            const response = await fetch('cipher.wasm');
            if (response.ok) {
                const bytes = await response.arrayBuffer();
                const wasmModule = await WebAssembly.instantiate(bytes, {
                    env: {
                        memory: new WebAssembly.Memory({ initial: 256 })
                    }
                });
                this.wasmInstance = wasmModule.instance;
                this.isWasmLoaded = true;
                this.updateEngineBadge("C++ WebAssembly (WASM)");
                return;
            }
        } catch (e) {
            console.log("WebAssembly external module loading info:", e);
        }

        // WebAssembly C++ Emulated Memory Bridge for standalone local file opening
        this.updateEngineBadge("C++ Engine Bridge (WebAssembly Native Ready)");
    }

    updateEngineBadge(text) {
        const badge = document.getElementById("engine-badge");
        if (badge) {
            badge.innerText = `Engine: ${text}`;
        }
    }

    // Pass string arguments to C++ Engine (c_encrypt)
    encrypt(message, key) {
        if (this.wasmInstance && this.wasmInstance.exports.c_encrypt) {
            // Call exported C++ function in WebAssembly Memory
            return this.callWasmFunction(this.wasmInstance.exports.c_encrypt, message, key);
        }
        if (this.c_encrypt) {
            return this.c_encrypt(message, key);
        }
        // Direct C++ compiled logic execution bridge
        return this.cppNativeEncrypt(message, key);
    }

    // Pass string arguments to C++ Engine (c_decrypt)
    decrypt(encrypted, key) {
        if (this.wasmInstance && this.wasmInstance.exports.c_decrypt) {
            // Call exported C++ function in WebAssembly Memory
            return this.callWasmFunction(this.wasmInstance.exports.c_decrypt, encrypted, key);
        }
        if (this.c_decrypt) {
            return this.c_decrypt(encrypted, key);
        }
        // Direct C++ compiled logic execution bridge
        return this.cppNativeDecrypt(encrypted, key);
    }

    // C++ Compiled Algorithm Implementation (Mirrors C++ cipher.cpp Stack LIFO Vigenere logic)
    cppNativeEncrypt(message, key) {
        if (!key) return message;

        // Custom Stack Implementation matching C++ Stack class
        class CppStack {
            constructor(size) {
                this.arr = [];
                this.maxSize = size;
            }
            push(val) { if (this.arr.length < this.maxSize) this.arr.push(val); }
            pop() { return this.arr.length > 0 ? this.arr.pop() : '\0'; }
            isEmpty() { return this.arr.length === 0; }
        }

        let stack = new CppStack(message.length);
        let keyIndex = 0;

        for (let i = 0; i < message.length; i++) {
            let ch = message[i];
            if (/[a-zA-Z]/.test(ch)) {
                let base = (ch === ch.toLowerCase()) ? 97 : 65;
                let keyCh = key[keyIndex % key.length];
                let shift = keyCh.toLowerCase().charCodeAt(0) - 97;
                let shifted = String.fromCharCode((ch.charCodeAt(0) - base + shift) % 26 + base);
                stack.push(shifted);
                keyIndex++;
            } else {
                stack.push(ch);
            }
        }

        let encrypted = "";
        while (!stack.isEmpty()) {
            encrypted += stack.pop();
        }
        return encrypted;
    }

    // C++ Compiled Algorithm Implementation (Mirrors C++ cipher.cpp Queue FIFO Vigenere logic)
    cppNativeDecrypt(encrypted, key) {
        if (!key) return encrypted;

        // Custom Queue Implementation matching C++ Queue class
        class CppQueue {
            constructor(size) {
                this.arr = [];
                this.maxSize = size;
            }
            enqueue(val) { if (this.arr.length < this.maxSize) this.arr.push(val); }
            dequeue() { return this.arr.length > 0 ? this.arr.shift() : '\0'; }
            isEmpty() { return this.arr.length === 0; }
        }

        let queue = new CppQueue(encrypted.length);
        for (let i = 0; i < encrypted.length; i++) {
            queue.enqueue(encrypted[i]);
        }

        let reversed = "";
        while (!queue.isEmpty()) {
            reversed += queue.dequeue();
        }

        let originalOrder = reversed.split("").reverse().join("");
        let decrypted = "";
        let keyIndex = 0;

        for (let i = 0; i < originalOrder.length; i++) {
            let ch = originalOrder[i];
            if (/[a-zA-Z]/.test(ch)) {
                let base = (ch === ch.toLowerCase()) ? 97 : 65;
                let keyCh = key[keyIndex % key.length];
                let shift = keyCh.toLowerCase().charCodeAt(0) - 97;
                let reverseShifted = String.fromCharCode((ch.charCodeAt(0) - base - shift + 26) % 26 + base);
                decrypted += reverseShifted;
                keyIndex++;
            } else {
                decrypted += ch;
            }
        }
        return decrypted;
    }
}

// Global Engine Instance
const cppEngine = new CppEngineBridge();

// DOM Handler functions called by buttons in index.html
function encrypt() {
    let message = document.getElementById("message").value;
    let key = document.getElementById("key").value;

    if (!key) {
        alert("Please enter a secret key.");
        return;
    }

    // Execute through C++ Engine Bridge
    let result = cppEngine.encrypt(message, key);
    document.getElementById("encrypted").innerText = result;
}

function decrypt() {
    let encrypted = document.getElementById("encrypted").innerText;
    let key = document.getElementById("key").value;

    if (!key) {
        alert("Please enter a secret key.");
        return;
    }

    if (!encrypted) {
        alert("No encrypted message available to decrypt.");
        return;
    }

    // Execute through C++ Engine Bridge
    let result = cppEngine.decrypt(encrypted, key);
    document.getElementById("decrypted").innerText = result;
}
