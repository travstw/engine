import { AudioEvent } from './event';
import { context } from '../audio-context/audio-context';
import { Observable, fromEvent } from 'rxjs';
import { first } from 'rxjs/operators';

export class Tick extends AudioEvent {
    private duration: number;
    private node: AudioScheduledSourceNode;

    constructor(obj) {
        super();
        Object.keys(obj).forEach(key => {
            switch (key) {
            case 'duration':
                // convert ms to seconds
                this.duration = obj[key] / 1000;
                break;
            default:
                this[key] = obj[key];
            }
        });

        this.node = new ConstantSourceNode(context, { offset: 0 });
        this.node.connect(context.destination);
        this.onEnded$ = fromEvent(this.node, 'onended').pipe(first());
    }

    dispatch() {
        this.node.start(context.currentTime + this.eventTime);
        this.node.stop(context.currentTime + this.eventTime + this.duration);
    }
}
