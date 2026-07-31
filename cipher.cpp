#include <iostream>
#include <string>
#include <vector>
#include <cctype>
#include <algorithm>
#include <cstring>
#include <cstdlib>

#ifdef __EMSCRIPTEN__
#include <emscripten/emscripten.h>
#else
#define EMSCRIPTEN_KEEPALIVE
#endif

// Custom Stack Implementation (LIFO) - C++ Engine
class Stack {
private:
    std::vector<char> arr;
    size_t maxSize;

public:
    Stack(size_t size) : maxSize(size) {}

    void push(char value) {
        if (arr.size() < maxSize) {
            arr.push_back(value);
        }
    }

    char pop() {
        if (arr.empty()) return '\0';
        char val = arr.back();
        arr.pop_back();
        return val;
    }

    bool isEmpty() const {
        return arr.empty();
    }
};

// Custom Queue Implementation (FIFO) - C++ Engine
class Queue {
private:
    std::vector<char> arr;
    size_t maxSize;

public:
    Queue(size_t size) : maxSize(size) {}

    void enqueue(char value) {
        if (arr.size() < maxSize) {
            arr.push_back(value);
        }
    }

    char dequeue() {
        if (arr.empty()) return '\0';
        char val = arr.front();
        arr.erase(arr.begin());
        return val;
    }

    bool isEmpty() const {
        return arr.empty();
    }
};

// Helper: Shift character using Vigenère Cipher key character
char shiftChar(char ch, char keyCh) {
    if (std::isalpha(ch)) {
        char base = std::islower(ch) ? 'a' : 'A';
        int shift = std::tolower(keyCh) - 'a';
        return static_cast<char>((ch - base + shift) % 26 + base);
    }
    return ch;
}

// Helper: Reverse shift character for decryption
char reverseShiftChar(char ch, char keyCh) {
    if (std::isalpha(ch)) {
        char base = std::islower(ch) ? 'a' : 'A';
        int shift = std::tolower(keyCh) - 'a';
        return static_cast<char>((ch - base - shift + 26) % 26 + base);
    }
    return ch;
}

// C++ Core Encrypt Logic using Stack (LIFO)
std::string encryptMessage(const std::string& message, const std::string& key) {
    if (key.empty()) return message;

    Stack stack(message.length());
    size_t keyIndex = 0;

    for (char ch : message) {
        if (std::isalpha(ch)) {
            char keyCh = key[keyIndex % key.length()];
            stack.push(shiftChar(ch, keyCh));
            keyIndex++;
        } else {
            stack.push(ch);
        }
    }

    std::string encrypted = "";
    while (!stack.isEmpty()) {
        encrypted += stack.pop();
    }

    return encrypted;
}

// C++ Core Decrypt Logic using Queue (FIFO)
std::string decryptMessage(const std::string& encrypted, const std::string& key) {
    if (key.empty()) return encrypted;

    Queue queue(encrypted.length());
    for (char ch : encrypted) {
        queue.enqueue(ch);
    }

    std::string reversedEncrypted = "";
    while (!queue.isEmpty()) {
        reversedEncrypted += queue.dequeue();
    }

    std::string originalOrder = reversedEncrypted;
    std::reverse(originalOrder.begin(), originalOrder.end());

    std::string decrypted = "";
    size_t keyIndex = 0;

    for (char ch : originalOrder) {
        if (std::isalpha(ch)) {
            char keyCh = key[keyIndex % key.length()];
            decrypted += reverseShiftChar(ch, keyCh);
            keyIndex++;
        } else {
            decrypted += ch;
        }
    }

    return decrypted;
}

// Exported C functions for WebAssembly / JS bridge execution
extern "C" {

EMSCRIPTEN_KEEPALIVE
const char* c_encrypt(const char* message, const char* key) {
    static std::string result;
    result = encryptMessage(message ? message : "", key ? key : "");
    return result.c_str();
}

EMSCRIPTEN_KEEPALIVE
const char* c_decrypt(const char* encrypted, const char* key) {
    static std::string result;
    result = decryptMessage(encrypted ? encrypted : "", key ? key : "");
    return result.c_str();
}

}

#ifndef __EMSCRIPTEN__
int main() {
    std::string message, key;

    std::cout << "=== Vigenere Cipher Encryption & Decryption (C++) ===\n";
    std::cout << "Enter message: ";
    std::getline(std::cin, message);

    std::cout << "Enter secret key: ";
    std::getline(std::cin, key);

    std::string encrypted = encryptMessage(message, key);
    std::cout << "\nEncrypted Message: " << encrypted << "\n";

    std::string decrypted = decryptMessage(encrypted, key);
    std::cout << "Decrypted Message: " << decrypted << "\n";

    return 0;
}
#endif
