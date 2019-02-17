import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AudioEvent } from '../event/event';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public dispatchEvent$: Subject<AudioEvent>;
  public endedEvent$: Subject<AudioEvent>;
  public scheduledEvents$: BehaviorSubject<AudioEvent[]>;
  public scheduleEvent$: Subject<AudioEvent>;
  public meterEvent$: Subject<AudioEvent>;
  public tick$: Subject<AudioEvent>;


  constructor() {
    this.dispatchEvent$ = new Subject();
    this.endedEvent$ = new Subject();
    this.scheduledEvents$ = new BehaviorSubject([]);
    this.scheduleEvent$ = new Subject();
    this.meterEvent$ = new Subject();
    this.tick$ = new Subject();
  }

  public fromDispatchedEvent(type) {
    return this.dispatchEvent$.pipe(
      filter(message => message.type === type),
    );
  }

  public fromEndedEvent(type) {
    return this.endedEvent$.pipe(
      filter(message => message.type === type),
    );
  }

}
