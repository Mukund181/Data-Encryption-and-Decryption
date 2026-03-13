class Stack {
    constructor(size) {
        this.arr = [];
        this.maxSize = size;
    }

    push(val) {
        if (this.arr.length >= this.maxSize) {
            alert("Stack Overflow");
            return;
        }
        this.arr.push(val);
    }

    pop() {
        return this.arr.pop();
    }

    isEmpty() {
        return this.arr.length === 0;
    }
}

class Queue {
    constructor(size) {
        this.arr = [];
        this.maxSize = size;
    }

    enqueue(val) {
        if (this.arr.length >= this.maxSize) {
            alert("Queue Overflow");
            return;
        }
        this.arr.push(val);
    }

    dequeue() {
        return this.arr.shift();
    }

    isEmpty() {
        return this.arr.length === 0;
    }
}

function shiftChar(ch, shift) {
    if (/[a-zA-Z]/.test(ch)) {
        let base = (ch === ch.toLowerCase()) ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
        return String.fromCharCode((ch.charCodeAt(0) - base + shift) % 26 + base);
    }
    return ch;
}

function reverseShiftChar(ch, shift) {
    if (/[a-zA-Z]/.test(ch)) {
        let base = (ch === ch.toLowerCase()) ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
        return String.fromCharCode((ch.charCodeAt(0) - base - shift + 26) % 26 + base);
    }
    return ch;
}

function encrypt() {
    let message = document.getElementById("message").value;
    let shift = parseInt(document.getElementById("shift").value);

    let stack = new Stack(message.length);
    let encrypted = "";

    for (let ch of message) {
        stack.push(shiftChar(ch, shift));
    }

    while (!stack.isEmpty()) {
        encrypted += stack.pop();
    }

    document.getElementById("encrypted").innerText = encrypted;
}

function decrypt() {
    let encrypted = document.getElementById("encrypted").innerText;
    let shift = parseInt(document.getElementById("shift").value);

    let queue = new Queue(encrypted.length);
    let decrypted = "";

    for (let ch of encrypted) {
        queue.enqueue(ch);
    }

    while (!queue.isEmpty()) {
        decrypted += reverseShiftChar(queue.dequeue(), shift);
    }

    decrypted = decrypted.split("").reverse().join("");

    document.getElementById("decrypted").innerText = decrypted;
}
