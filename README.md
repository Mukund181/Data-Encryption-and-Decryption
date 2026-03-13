# Data-Encryption-and-Decryption

This project demonstrates a simple **data encryption and decryption system** using the **Caesar Cipher technique** along with basic **data structures (Stack and Queue)**.

The application includes:

* A **Python implementation** of the encryption and decryption logic.
* A **web-based frontend** using **HTML, CSS, and JavaScript** to interactively encrypt and decrypt messages.

---

## Project Overview

The project works in two stages:

**Encryption**

* Each character in the message is shifted using a **Caesar Cipher shift value**.
* The shifted characters are pushed onto a **Stack**.
* Characters are popped from the stack to produce the **encrypted message (reversed order)**.

**Decryption**

* Encrypted characters are inserted into a **Queue**.
* Characters are dequeued and shifted back to recover the original message.

This demonstrates how **linear data structures like Stack and Queue** can be applied in practical applications such as simple cryptography.

---

## Technologies Used

* **Python** – Core encryption/decryption logic
* **HTML** – Structure of the web interface
* **CSS** – Styling the user interface
* **JavaScript** – Client-side encryption and decryption logic

---

## Project Structure

```
Data-Encryption-and-Decryption
│
├── caesarCipher.py     # Python implementation
├── index.html          # Web interface
├── style.css           # Styling
└── script.js           # Encryption & decryption logic
```

---

## How to Run

### Run Python Program

1. Open terminal in the project folder.
2. Run the file:

```
python caesarCipher.py
```

3. Enter a message and shift value when prompted.

---

### Run Web Version

1. Open the project folder.
2. Double-click **index.html** or open it in a browser.

The web interface allows users to:

* Enter a message
* Provide a shift value
* Encrypt or decrypt the message instantly

---

## Example

**Input Message**

```
Hello World
Shift = 3
```

**Encrypted Output**

```
gourZ roohK
```

**Decrypted Output**

```
Hello World
```

---

## Learning Concepts

This project demonstrates:

* Caesar Cipher encryption
* Stack (LIFO) data structure
* Queue (FIFO) data structure
* Basic frontend development
* Integration of algorithms with web UI

---

## Author

**Mukund Fegade**
