/* 列表类简易实现 */
class MyList {
    _nums = new Array(); // 数组（存储列表元素）
    _capacity = 10; // 列表容量
    _size = 0; // 列表长度（即当前元素数量）
    _extendRatio = 2; // 每次列表扩容的倍数

    /* 构造方法 */
    constructor() {
        this._nums = new Array(this._capacity);
    }

    /* 获取列表长度（即当前元素数量）*/
    size() {
        return this._size;
    }

    /* 获取列表容量 */
    capacity() {
        return this._capacity;
    }

    /* 访问元素 */
    get(index) {
        // 索引如果越界则抛出异常，下同
        if (index < 0 || index >= this._size) throw new Error('索引越界');
        return this._nums[index];
    }

    /* 更新元素 */
    set(index, num) {
        if (index < 0 || index >= this._size) throw new Error('索引越界');
        this._nums[index] = num;
    }

    /* 尾部添加元素 */
    add(num) {
        // 如果长度等于容量，则需要扩容
        if (this._size === this._capacity) {
            this.extendCapacity();
        }
        // 将新元素添加到列表尾部
        this._nums[this._size] = num;
        this._size++;
    }

    /* 中间插入元素 */
    insert(index, num) {
        if (index < 0 || index >= this._size) throw new Error('索引越界');
        // 元素数量超出容量时，触发扩容机制
        if (this._size === this._capacity) {
            this.extendCapacity();
        }
        // 将索引 index 以及之后的元素都向后移动一位
        for (let j = this._size - 1; j >= index; j--) {
            this._nums[j + 1] = this._nums[j];
        }
        // 更新元素数量
        this._nums[index] = num;
        this._size++;
    }

    /* 删除元素 */
    remove(index) {
        if (index < 0 || index >= this._size) throw new Error('索引越界');
        let num = this._nums[index];
        // 将索引 index 之后的元素都向前移动一位
        for (let j = index; j < this._size - 1; j++) {
            this._nums[j] = this._nums[j + 1];
        }
        // 更新元素数量
        this._size--;
        // 返回被删除元素
        return num;
    }

    /* 列表扩容 */
    extendCapacity() {
        // 新建一个长度为 size 的数组，并将原数组拷贝到新数组
        this._nums = this._nums.concat(
            new Array(this.capacity() * (this._extendRatio - 1))
        );
        // 更新列表容量
        this._capacity = this._nums.length;
    }

    /* 将列表转换为数组 */
    toArray() {
        let size = this.size();
        // 仅转换有效长度范围内的列表元素
        const nums = new Array(size);
        for (let i = 0; i < size; i++) {
            nums[i] = this.get(i);
        }
        return nums;
    }
}
