import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { context } from '../audio-context/audio-context';
import { AudioEvent } from '../event/event';
import { EventService } from './event.service';

const SCHEDULER_INTERVAL = 20;
const LOOK_AHEAD_WINDOW = 100;

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  private isActive = false;

  constructor(
    private events: EventService,
  ) {
    this.startScheduler();
  }

  private startScheduler() {
    this.runNextSchedule();
  }

  private runNextSchedule() {
    setTimeout(() => {
      if (this.isActive) {
        this.scheduleEvents();
      }
      this.runNextSchedule();
    }, SCHEDULER_INTERVAL);
  }

  private scheduleEvents() {
    const events = this.events.scheduledEvents$.getValue();
    const length = events.length;
    const window = context.currentTime + LOOK_AHEAD_WINDOW;

    let i = length - 1;
    while (i >= 0 && events[i].eventTime < window) {
      this.dequeueEvent(events);
      i--;
    }
  }

  private dequeueEvent(events) {
    const event = events.pop();
    this.events.scheduledEvents$.next(events);
    this.events.dispatchEvent$.next(event);
  }

  public enqueueEvent(event: AudioEvent) {
    const events = this.events.scheduledEvents$.getValue();
    const index = events.findIndex(e => {
      return e.eventTime < event.eventTime;
    });

    if (index === -1) {
      events.push(event);
      this.events.scheduledEvents$.next(events);
      return;
    }
    events.splice(index, 0, event);
    this.events.scheduledEvents$.next(events);

  }

  public setActive(state) {
    this.isActive = state;
  }
}
