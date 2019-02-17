import { Injectable } from '@angular/core';
import { AudioEvent } from '../event/event';
import { SchedulerService } from './scheduler.service';
import { MeterService } from './meter.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { EventService } from './event.service';


@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  private dispatchedEvent$: Subject<AudioEvent>;

  constructor(
    private events: EventService,
    private scheduler: SchedulerService,
    private meter: MeterService,
  ) {

    this.events.dispatchEvent$.subscribe(
      (event) => this.dispatchEvent(event)
    );

    this.events.scheduleEvent$.subscribe(
      (event) => this.addScheduledEvent(event)
    );

    // this.meter.tempoChange$.subscribe(
    //   (tempo) => {
    //     this.rescheduleEvents(tempo);
    //   }
    // )
  }

  private addScheduledEvent(event) {
    event.onEnded$.subscribe(
      () => {
        this.events.endedEvent$.next(event);
      }
    );
    this.scheduler.enqueueEvent(event);
  }

  private dispatchEvent(event) {
    event.dispatch();
  }

  private rescheduleEvents(tempo) {
    const events: AudioEvent[] = this.events.scheduledEvents$.getValue();
    const rescheduledEvents: AudioEvent[] = events.map(event => {
      // TODO recalculate eventTimes here...
      return event;
    }).sort((a: AudioEvent, b: AudioEvent) => {
      // sort in desc order
      return b.eventTime - a.eventTime;
    });

    this.events.scheduledEvents$.next(rescheduledEvents);
  }

}
