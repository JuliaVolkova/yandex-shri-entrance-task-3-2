// module.exports = { range };
// import {devices, rates, maxPower} from '../data/input';
const devices = [
    {
        "id": "F972B82BA56A70CC579945773B6866FB",
        "name": "Посудомоечная машина",
        "power": 950,
        "duration": 3,
        "mode": "night"
    },
    {
        "id": "C515D887EDBBE669B2FDAC62F571E9E9",
        "name": "Духовка",
        "power": 2000,
        "duration": 2,
        "mode": "day"
    },
    {
        "id": "02DDD23A85DADDD71198305330CC386D",
        "name": "Холодильник",
        "power": 50,
        "duration": 24
    },
    {
        "id": "1E6276CC231716FE8EE8BC908486D41E",
        "name": "Термостат",
        "power": 50,
        "duration": 24
    },
    {
        "id": "7D9DC84AD110500D284B33C82FE6E85E",
        "name": "Кондиционер",
        "power": 850,
        "duration": 1
    }
];

const rates = [
    {
        "from": 7,
        "to": 10,
        "value": 6.46
    },
    {
        "from": 10,
        "to": 17,
        "value": 5.38
    },
    {
        "from": 17,
        "to": 21,
        "value": 6.46
    },
    {
        "from": 21,
        "to": 23,
        "value": 5.38
    },
    {
        "from": 23,
        "to": 7,
        "value": 1.79
    }
];

const maxPower = 2100;

const mode = {
    day: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    night: [21, 22, 23, 0, 1, 2, 3, 4, 5, 6],
    allDay: range(0, 24)
};

/**
 * @typedef {Object} Rate
 * @property {Number} from
 * @property {Number} to
 * @property {Number} value
 */

/**
 * @typedef {Object} Device
 * @property {String} id
 * @property {String} name
 * @property {Number} power
 * @property {Number} duration
 * @property {String} [mode]
 */

/**
 * @typedef {Object} Schedule
 * @property {Array.<Device>} 0
 */

/**
 * Create array of numbers in given range.
 *
 * @param {Number} start
 * @param {Number} end
 * @param {Number} step
 * @returns {Array.<Number>}
 */
function range(start, end, step = 1) {
 return Array.from({length: (end - start) / step}, (value, index) => start + index * step);
}

/**
 * Implementation of sliding windows algorithm.
 *
 * [a, b, c, d, e] of 3 =>
 * [a, b, c]
 *    [b, c, d]
 *       [c, d, e]
 * @example sliding([a, b, c, d, e], 3) => [[a, b, c], [b, c, d], [c, d, e]]
 * @template T
 * @param {Array.<T>} array
 * @param {Number} size
 * @returns {Array.<Array.<T>>}
 */
function sliding(array, size) {
    const starts = range(0, array.length - size + 1);
    const toWindow = start => array.slice(start, start + size);
    return starts.map(toWindow);
}

/**
 * Compares two elements of type {@code T} for sorting (in ascending order).
 *
 * @template T
 * @param {T} left
 * @param {T} right
 * @returns {number}
 */
function defaultCompare(left, right) {
    return left < right ? -1 : left === right ? 0 : 1;
}

/**
 * Decorates passed comparison function with reversing its result.
 *
 * @template T
 * @param {Function.<T, T, Number>} compare
 * @returns {Function.<T, T, Number>}
 */
function reversed(compare = defaultCompare) {
    return function(left, right) {
        return compare(right, left);
    }
}

/**
 * Builds comparison function using extract function to get property from two elements
 * and comparison function that compares them.
 *
 * @template T, R
 * @param {Function.<T, R>} extract
 * @param {Function.<R, R, Number>} [compare = defaultCompare]
 * @returns {Function.<T, T, Number>}
 */
function comparing(extract, compare = defaultCompare) {
    return function (left, right) {
        return compare(extract(left), extract(right));
    }
}

/**
 * Generates possible schedule for passed device
 *
 * @param {Device} device
 * @returns {Array.<Schedule>} schedule
 */
function createPossibleSchedules(device) {
    const periods = sliding(mode[device.mode] || mode.allDay, device.duration);
    const toSchedule = (schedule, hour) => ({ ...schedule, [hour]: device });
    return periods.map(period => period.reduce(toSchedule, {}));
}

/**
 * @param {Array.<Device>} devices
 * @param {Array.<Rate>} rates
 * @param {Number} maxPower
 * @returns {Schedule} schedule
 */
function superFunction(devices, rates, maxPower) {
    return devices
        .slice()
        .sort(comparing(({duration}) => duration, reversed()))
        .map(createPossibleSchedules)
}
