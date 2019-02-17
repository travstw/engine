import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BusService } from './services/bus.service';
import { ComposerService } from './services/composer.service';
import { ConductorService } from './services/conductor.service';
import { EffectsService } from './services/effects.service';
import { EventService } from './services/event.service';
import { MediaService } from './services/media.service';
import { SchedulerService } from './services/scheduler.service';
import { MeterService } from './services/meter.service';
import { TrackService } from './services/track.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    BusService,
    ComposerService,
    ConductorService,
    EffectsService,
    MediaService,
    SchedulerService,
    MeterService,
    TrackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
