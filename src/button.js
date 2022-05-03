/* holds button logic */

export function buttonLogic(a, b, event) {
    if (a.callback && event.name === 'collisionStart') {
        a.current_mass += b.mass;
        a.current_mass >= a.trigger_threshold && a.callback();
    }

    if (a.callback && event.name === 'collisionEnd') {
        a.current_mass -= b.mass;
        a.current_mass < a.trigger_threshold && a.endCallback();
    }

    if (b.callback && event.name === 'collisionStart') {
        b.current_mass += a.mass;
        b.current_mass >= b.trigger_threshold && b.callback();
    }

    if (b.callback && event.name === 'collisionEnd') {
        b.current_mass -= a.mass;
        b.current_mass < b.trigger_threshold && b.endCallback();
    }
}