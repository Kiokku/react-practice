class MaxHeap {
  /* 构造方法，建立空堆或根据输入列表建堆 */
  constructor(nums) {
    // 将列表元素原封不动添加进堆
    this.#maxHeap = nums === undefined ? [] : [...nums];
    // 堆化除叶节点以外的其他所有节点
    for (let i = this.#parent(this.size() - 1); i >= 0; i--) {
      this.#siftDown(i);
    }
  }

  /* 获取左子节点索引 */
  #left(i) {
    return 2 * i + 1;
  }

  /* 获取右子节点索引 */
  #right(i) {
    return 2 * i + 2;
  }

  /* 获取父节点索引 */
  #parent(i) {
    return Math.floor((i - 1) / 2); // 向下整除
  }

  /* 访问堆顶元素 */
  peek() {
    return this.#maxHeap[0];
  }

  /* 元素入堆 */
  push(val) {
    // 添加节点
    this.#maxHeap.push(val);
    // 从底至顶堆化
    this.#siftUp(this.size() - 1);
  }

  /* 从节点 i 开始，从底至顶堆化 */
  #siftUp(i) {
    while (true) {
      // 获取节点 i 的父节点
      const p = this.#parent(i);
      // 当“越过根节点”或“节点无需修复”时，结束堆化
      if (p < 0 || this.#maxHeap[i] <= this.#maxHeap[p]) break;
      // 交换两节点
      this.#swap(i, p);
      // 循环向上堆化
      i = p;
    }
  }
  /* 元素出堆 */
  pop() {
    // 判空处理
    if (this.isEmpty()) throw new Error("堆为空");
    // 交换根节点与最右叶节点（即交换首元素与尾元素）
    this.#swap(0, this.size() - 1);
    // 删除节点
    const val = this.#maxHeap.pop();
    // 从顶至底堆化
    this.#siftDown(0);
    // 返回堆顶元素
    return val;
  }

  /* 从节点 i 开始，从顶至底堆化 */
  #siftDown(i) {
    while (true) {
      // 判断节点 i, l, r 中值最大的节点，记为 ma
      const l = this.#left(i),
        r = this.#right(i);
      let ma = i;
      if (l < this.size() && this.#maxHeap[l] > this.#maxHeap[ma]) ma = l;
      if (r < this.size() && this.#maxHeap[r] > this.#maxHeap[ma]) ma = r;
      // 若节点 i 最大或索引 l, r 越界，则无需继续堆化，跳出
      if (ma == i) break;
      // 交换两节点
      this.#swap(i, ma);
      // 循环向下堆化
      i = ma;
    }
  }

}

class Heap {
  #heap;
  #cmp;
  constructor(nums, cmp) {
      // 将列表元素原封不动添加进堆
      this.#heap = nums === undefined ? [] : [...nums];
      this.#cmp = typeof cmp === 'function' ? cmp : (a, b) => a - b;
      // 对所有非叶节点“自下向上”堆化，建堆
      for (let i = this.#parent(this.size() - 1); i >= 0; i--) {
          this.#siftDown(i);
      };
  };

  #left(i) {
      return 2 * i + 1;
  };

  #right(i) {
      return 2 * i + 2;
  };

  #parent(i) {
      return Math.floor((i - 1) / 2);
  };

  #swap(i, j) {
      const temp = this.#heap[i];
      this.#heap[i] = this.#heap[j];
      this.#heap[j] = temp;
  };

  size() {
      return this.#heap.length;
  };

  isEmpty() {
      return this.#heap.length === 0;
  }

  peek() {
      return this.#heap[0];
  };

  push(num) {
      this.#heap.push(num);
      this.#siftUp(this.size() - 1);
  };

  pop() {
      if (this.isEmpty()) throw new Error("堆为空");
      this.#swap(0, this.size() - 1);
      const val = this.#heap.pop();
      this.#siftDown(0);
      return val;
  };

  #siftUp(i) {
      let child = i;
      while (true) {
          const p = this.#parent(child);
          if (p < 0 || this.#cmp(this.#heap[child], this.#heap[p]) <= 0) break;

          this.#swap(child, p);
          child = p;
      };
  };

  #siftDown(i) {
      let root = i;

      while (true) {
          const left = this.#left(root);
          const right = this.#right(root);

          let max = root;
          if (left < this.size() && this.#cmp(this.#heap[max], this.#heap[left]) < 0) max = left;
          if (right < this.size() && this.#cmp(this.#heap[max], this.#heap[right]) < 0) max = right;
          if (max === root) break;
          this.#swap(root, max);
          root = max;
      };
  }
}