type QueueItem = {
  task: () => Promise<void>;
  priority?: number;
};

class ApiQueue {
  private queue: QueueItem[] = [];
  private isProcessing = false;

  add(item: QueueItem) {
    this.queue.push(item);
    this.process();
  }

  private async process() {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;
    const item = this.queue.shift();

    try {
      await item?.task();
    } catch (error) {
      console.error('Queue task failed:', error);
    } finally {
      this.isProcessing = false;
      this.process();
    }
  }
}

export const apiQueue = new ApiQueue();