/* 基于链表实现的栈 */
class LinkedListStack {
    #stackPeek; // 将头节点作为栈顶
    #stkSize = 0; // 栈的长度

    constructor() {
        this.#stackPeek = null;
    }

    /* 获取栈的长度 */
    get size() {
        return this.#stkSize;
    }

    /* 判断栈是否为空 */
    isEmpty() {
        return this.size === 0;
    }

    /* 入栈 */
    push(num) {
        const node = new ListNode(num);
        node.next = this.#stackPeek;
        this.#stackPeek = node;
        this.#stkSize++;
    }

    /* 出栈 */
    pop() {
        const num = this.peek();
        this.#stackPeek = this.#stackPeek.next;
        this.#stkSize--;
        return num;
    }

    /* 访问栈顶元素 */
    peek() {
        if (!this.#stackPeek) throw new Error('栈为空');
        return this.#stackPeek.val;
    }

    /* 将链表转化为 Array 并返回 */
    toArray() {
        let node = this.#stackPeek;
        const res = new Array(this.size);
        for (let i = res.length - 1; i >= 0; i--) {
            res[i] = node.val;
            node = node.next;
        }
        return res;
    }
}

/* 基于数组实现的栈 */
class ArrayStack {
    #stack;
    constructor() {
        this.#stack = [];
    }

    /* 获取栈的长度 */
    get size() {
        return this.#stack.length;
    }

    /* 判断栈是否为空 */
    empty() {
        return this.#stack.length === 0;
    }

    /* 入栈 */
    push(num) {
        this.#stack.push(num);
    }

    /* 出栈 */
    pop() {
        if (this.empty()) throw new Error('栈为空');
        return this.#stack.pop();
    }

    /* 访问栈顶元素 */
    top() {
        if (this.empty()) throw new Error('栈为空');
        return this.#stack[this.#stack.length - 1];
    }

    /* 返回 Array */
    toArray() {
        return this.#stack;
    }
}
