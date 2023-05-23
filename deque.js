/* 初始化双向队列 */
// JavaScript 没有内置的双端队列，只能把 Array 当作双端队列来使用
const deque = [];

/* 元素入队 */
deque.push(2);
deque.push(5);
deque.push(4);
// 请注意，由于是数组，unshift() 方法的时间复杂度为 O(n)
deque.unshift(3);
deque.unshift(1);
console.log("双向队列 deque = ", deque);

/* 访问元素 */
const peekFirst = deque[0];
console.log("队首元素 peekFirst = " + peekFirst);
const peekLast = deque[deque.length - 1];
console.log("队尾元素 peekLast = " + peekLast);

/* 元素出队 */
// 请注意，由于是数组，shift() 方法的时间复杂度为 O(n)
const popFront = deque.shift();
console.log("队首出队元素 popFront = " + popFront + "，队首出队后 deque = " + deque);
const popBack = deque.pop();
console.log("队尾出队元素 popBack = " + popBack + "，队尾出队后 deque = " + deque);

/* 获取双向队列的长度 */
const size = deque.length;
console.log("双向队列长度 size = " + size);

/* 判断双向队列是否为空 */
const isEmpty = size === 0;
console.log("双向队列是否为空 = " + isEmpty);

/* 双向链表节点 */
class ListNode {
    prev; // 前驱节点引用 (指针)
    next; // 后继节点引用 (指针)
    val; // 节点值

    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

/* 基于双向链表实现的双向队列 */
class LinkedListDeque {
    _front; // 头节点 front
    _rear; // 尾节点 rear
    _queSize; // 双向队列的长度

    constructor() {
        this._front = null;
        this._rear = null;
        this._queSize = 0;
    }

    /* 队尾入队操作 */
    pushLast(val) {
        const node = new ListNode(val);
        // 若链表为空，则令 front, rear 都指向 node
        if (this._queSize === 0) {
            this._front = node;
            this._rear = node;
        } else {
            // 将 node 添加至链表尾部
            this._rear.next = node;
            node.prev = this._rear;
            this._rear = node; // 更新尾节点
        }
        this._queSize++;
    }

    /* 队首入队操作 */
    pushFirst(val) {
        const node = new ListNode(val);
        // 若链表为空，则令 front, rear 都指向 node
        if (this._queSize === 0) {
            this._front = node;
            this._rear = node;
        } else {
            // 将 node 添加至链表头部
            this._front.prev = node;
            node.next = this._front;
            this._front = node; // 更新头节点
        }
        this._queSize++;
    }

    /* 队尾出队操作 */
    popLast() {
        if (this._queSize === 0) {
            return null;
        }
        const value = this._rear.val; // 存储尾节点值
        // 删除尾节点
        let temp = this._rear.prev;
        if (temp !== null) {
            temp.next = null;
            this._rear.prev = null;
        }
        this._rear = temp; // 更新尾节点
        this._queSize--;
        return value;
    }

    /* 队首出队操作 */
    popFirst() {
        if (this._queSize === 0) {
            return null;
        }
        const value = this._front.val; // 存储尾节点值
        // 删除头节点
        let temp = this._front.next;
        if (temp !== null) {
            temp.prev = null;
            this._front.next = null;
        }
        this._front = temp; // 更新头节点
        this._queSize--;
        return value;
    }

    /* 访问队尾元素 */
    peekLast() {
        return this._queSize === 0 ? null : this._rear.val;
    }

    /* 访问队首元素 */
    peekFirst() {
        return this._queSize === 0 ? null : this._front.val;
    }

    /* 获取双向队列的长度 */
    size() {
        return this._queSize;
    }

    /* 判断双向队列是否为空 */
    isEmpty() {
        return this._queSize === 0;
    }

    /* 打印双向队列 */
    print() {
        const arr = [];
        let temp = this._front;
        while (temp !== null) {
            arr.push(temp.val);
            temp = temp.next;
        }
        console.log('[' + arr.join(', ') + ']');
    }
}

/* 基于环形数组实现的双向队列 */
class ArrayDeque {
    _nums; // 用于存储双向队列元素的数组
    _front; // 队首指针，指向队首元素
    _queSize; // 双向队列长度

    /* 构造方法 */
    constructor(capacity) {
        this._nums = new Array(capacity);
        this._front = 0;
        this._queSize = 0;
    }

    /* 获取双向队列的容量 */
    capacity() {
        return this._nums.length;
    }

    /* 获取双向队列的长度 */
    size() {
        return this._queSize;
    }

    /* 判断双向队列是否为空 */
    isEmpty() {
        return this._queSize === 0;
    }

    /* 计算环形数组索引 */
    index(i) {
        // 通过取余操作实现数组首尾相连
        // 当 i 越过数组尾部后，回到头部
        // 当 i 越过数组头部后，回到尾部
        return (i + this.capacity()) % this.capacity();
    }

    /* 队首入队 */
    pushFirst(num) {
        if (this._queSize === this.capacity()) {
            console.log('双向队列已满');
            return;
        }
        // 队首指针向左移动一位
        // 通过取余操作，实现 front 越过数组头部后回到尾部
        this._front = this.index(this._front - 1);
        // 将 num 添加至队首
        this._nums[this.#front] = num;
        this._queSize++;
    }

    /* 队尾入队 */
    pushLast(num) {
        if (this._queSize === this.capacity()) {
            console.log('双向队列已满');
            return;
        }
        // 计算尾指针，指向队尾索引 + 1
        const rear = this.index(this._front + this._queSize);
        // 将 num 添加至队尾
        this._nums[rear] = num;
        this._queSize++;
    }

    /* 队首出队 */
    popFirst() {
        const num = this.peekFirst();
        // 队首指针向后移动一位
        this._front = this.index(this._front + 1);
        this._queSize--;
        return num;
    }

    /* 队尾出队 */
    popLast() {
        const num = this.peekLast();
        this._queSize--;
        return num;
    }

    /* 访问队首元素 */
    peekFirst() {
        if (this.isEmpty()) throw new Error('The Deque Is Empty.');
        return this._nums[this._front];
    }

    /* 访问队尾元素 */
    peekLast() {
        if (this.isEmpty()) throw new Error('The Deque Is Empty.');
        // 计算尾元素索引
        const last = this.index(this._front + this._queSize - 1);
        return this._nums[last];
    }

    /* 返回数组用于打印 */
    toArray() {
        // 仅转换有效长度范围内的列表元素
        const res = [];
        for (let i = 0, j = this._front; i < this._queSize; i++, j++) {
            res[i] = this._nums[this.index(j)];
        }
        return res;
    }
}
