import { Observable } from 'rxjs';

export class AudioEvent {
    public type: 'tick' | 'tempo' | 'audio' | 'gain' | 'effect' | 'synth' | 'osc' | 'param';
    public eventTime: number;
    public onEnded$: Observable<Event>;
}
