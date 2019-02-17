context = new AudioContext();
osc = context.createConstantSource(0);
osc.onended = function(e) {
   console.log(e);
}

osc.connect(context.destination);

/* Schedule the start and stop times for the oscillator */
console.log(osc);

function start() {
    osc.start(context.currentTime + 1);
    osc.stop(context.currentTime + 4);
}

