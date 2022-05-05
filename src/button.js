/* holds button logic */

export function buttonLogic(a, b, event) {
    if (a.callback && event.name === 'collisionStart') {
        if (a.ballOnly && b.label === 'ball') {
            a.callback();
        } else if (!a.ballOnly) a.callback();
    }

    if (a.endCallback && event.name === 'collisionEnd') {
        if (a.ballOnly && b.label === 'ball') {
            a.endCallback();
        } else if (!a.ballOnly) a.endCallback();
    }

    if (b.callback && event.name === 'collisionStart') {
        if (b.ballOnly && a.label === 'ball') {
            b.callback();
        } else if (!b.ballOnly) b.callback();
    }

    if (b.endCallback && event.name === 'collisionEnd') {
        if (b.ballOnly && a.label === 'ball') {
            b.endCallback();
        } else if (!b.ballOnly) b.endCallback();
    }
}