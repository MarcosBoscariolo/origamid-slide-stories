export default class Timeout {
    id;
    handler;
    start;
    timeLeft;
    constructor(handler: TimerHandler, timer: number) {
        this.id = setTimeout(handler, timer);
        this.handler = handler;
        this.start = Date.now();
        this.timeLeft = timer;
    }
    clear() {
        clearTimeout(this.id);
    }

    pause() {
        const tempPassed = Date.now() - this.start;
        this.timeLeft = this.timeLeft - tempPassed;
        this.clear();
    }

    continue() {
        this.clear();
        this.id = setTimeout(this.handler, this.timeLeft);
        this.start = Date.now();
    }
}