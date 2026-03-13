class Stack:
    def __init__(self, size):
        self.arr = []
        self.maxSize = size

    def push(self, value):
        if len(self.arr) >= self.maxSize:
            print("Stack Overflow")
            return
        self.arr.append(value)

    def pop(self):
        if not self.arr:
            print("Stack Underflow")
            return ''
        return self.arr.pop()

    def is_empty(self):
        return len(self.arr) == 0


class Queue:
    def __init__(self, size):
        self.arr = []
        self.maxSize = size

    def enqueue(self, value):
        if len(self.arr) >= self.maxSize:
            print("Queue Overflow")
            return
        self.arr.append(value)

    def dequeue(self):
        if not self.arr:
            print("Queue Underflow")
            return ''
        return self.arr.pop(0)

    def is_empty(self):
        return len(self.arr) == 0


def shift_char(ch, shift):
    if ch.isalpha():
        base = 'a' if ch.islower() else 'A'
        return chr((ord(ch) - ord(base) + shift) % 26 + ord(base))
    return ch


def reverse_shift_char(ch, shift):
    if ch.isalpha():
        base = 'a' if ch.islower() else 'A'
        return chr((ord(ch) - ord(base) - shift + 26) % 26 + ord(base))
    return ch


def encrypt_message(message, shift):
    stack = Stack(len(message))
    encrypted = ""

    for ch in message:
        stack.push(shift_char(ch, shift))

    while not stack.is_empty():
        encrypted += stack.pop()

    return encrypted


def decrypt_message(encrypted, shift):
    queue = Queue(len(encrypted))
    decrypted = ""

    for ch in encrypted:
        queue.enqueue(ch)

    while not queue.is_empty():
        decrypted += reverse_shift_char(queue.dequeue(), shift)

    return decrypted[::-1]


message = input("Enter message: ")
shift = int(input("Enter shift (1-25): "))

encrypted = encrypt_message(message, shift)
print("Encrypted Message:", encrypted)

decrypted = decrypt_message(encrypted, shift)
print("Decrypted Message:", decrypted)