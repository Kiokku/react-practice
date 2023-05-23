/* 初始化队列 */
// JavaScript 没有内置的队列，可以把 Array 当作队列来使用
const queue = [];

/* 元素入队 */
queue.push(1);
queue.push(3);
queue.push(2);
queue.push(5);
queue.push(4);

/* 访问队首元素 */
const peek = queue[0];

/* 元素出队 */
// 底层是数组，因此 shift() 方法的时间复杂度为 O(n)
const pop = queue.shift();

/* 获取队列的长度 */
const size = queue.length;

/* 判断队列是否为空 */
const empty = queue.length === 0;


/* 基于链表实现的队列 */
class LinkedListQueue {
    _front; // 头节点 #front
    _rear; // 尾节点 #rear
    _queSize = 0;

    constructor() {
        this._front = null;
        this._rear = null;
    }

    /* 获取队列的长度 */
    get size() {
        return this._queSize;
    }

    /* 判断队列是否为空 */
    isEmpty() {
        return this.size === 0;
    }

    /* 入队 */
    push(num) {
        // 尾节点后添加 num
        const node = new ListNode(num);
        // 如果队列为空，则令头、尾节点都指向该节点
        if (!this._front) {
            this._front = node;
            this._rear = node;
        } else {
            // 如果队列不为空，则将该节点添加到尾节点后
            this._rear.next = node;
            this._rear = node;
        }
        this._queSize++;
    }

    /* 出队 */
    pop() {
        const num = this.peek();
        // 删除头节点
        this._front = this._front.next;
        this._queSize--;
        return num;
    }

    /* 访问队首元素 */
    peek() {
        if (this.size === 0) throw new Error('队列为空');
        return this._front.val;
    }

    /* 将链表转化为 Array 并返回 */
    toArray() {
        let node = this._front;
        const res = new Array(this.size);
        for (let i = 0; i < res.length; i++) {
            res[i] = node.val;
            node = node.next;
        }
        return res;
    }
}

/* 基于环形数组实现的队列 */
class ArrayQueue {
    _nums; // 用于存储队列元素的数组
    _front = 0; // 队首指针，指向队首元素
    _queSize = 0; // 队列长度

    constructor(capacity) {
        this._nums = new Array(capacity);
    }

    /* 获取队列的容量 */
    get capacity() {
        return this._nums.length;
    }

    /* 获取队列的长度 */
    get size() {
        return this._queSize;
    }

    /* 判断队列是否为空 */
    empty() {
        return this._queSize == 0;
    }

    /* 入队 */
    push(num) {
        if (this.size == this.capacity) {
            console.log('队列已满');
            return;
        }
        // 计算尾指针，指向队尾索引 + 1
        // 通过取余操作，实现 rear 越过数组尾部后回到头部
        const rear = (this._front + this.size) % this.capacity;
        // 将 num 添加至队尾
        this._nums[rear] = num;
        this._queSize++;
    }

    /* 出队 */
    pop() {
        const num = this.peek();
        // 队首指针向后移动一位，若越过尾部则返回到数组头部
        this._front = (this._front + 1) % this.capacity;
        this._queSize--;
        return num;
    }

    /* 访问队首元素 */
    peek() {
        if (this.empty()) throw new Error('队列为空');
        return this._nums[this._front];
    }

    /* 返回 Array */
    toArray() {
        // 仅转换有效长度范围内的列表元素
        const arr = new Array(this.size);
        for (let i = 0, j = this._front; i < this.size; i++, j++) {
            arr[i] = this._nums[j % this.capacity];
        }
        return arr;
    }
}

