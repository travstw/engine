import { Injectable } from '@angular/core';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class MeterService {

  constructor(
    private events: EventService,
  ) {
    this.events.fromDispatchedEvent('meter').subscribe(
      (event) => this.calculateNewMeter(event)
    );

    this.events.fromEndedEvent('tick').subscribe(
      (tick) => this.emitNextTick(tick)
    );
  }

  private calculateNewMeter(event) {
    // TODO calculate new meter object
    this.events.meterEvent$.next(event);
  }

  private emitNextTick(tick) {
    this.events.tick$.next(tick);
  }
}
