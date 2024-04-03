import { toNumber } from './number';
import $ from 'jquery';

export const Random = (min, max, floor = true) => {
    const r = Math.random() * max + min;
    return floor ? Math.floor(r) : r;
};

export const resultPopup = (game) => {
    const status = game.status.toLowerCase();
    const popup = $(`<div class='resultPopup resultPopup-${status}'>
            <div class='multiplier'>${Number(game.odds).toFixed(2)}x</div>
            <div class='divider'></div>
            <div class='profit'>${game.profit === 0 ? '0.00' : toNumber(game.profit)}</div>
        </div>
    `);
    $('.game-content').append(popup);
    popup.hide().fadeIn('fast');
    setTimeout(() => {
        // eslint-disable-next-line
        popup.fadeOut('fast', function () {
            $(this).remove();
        });
    }, 2000);
};

export const chain = (times, ms, cb) => {
    let i = 0;
    const next = () => {
        if (i < times) {
            setTimeout(() => {
                cb(i);
                next();
            }, ms);
            i += 1;
        }
    };
    next();
};
