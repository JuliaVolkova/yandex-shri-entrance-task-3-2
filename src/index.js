// module.exports = { range };

const mode = {
    day: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    night: [21, 22, 23, 0, 1, 2, 3, 4, 5, 6],
    allDay: range(0, 24)
};

function range(start, end, step = 1) {
 return Array.from({length: (end - start) / step}, (value, index) => start + index * step)
}

/**
 *
 * @param {Object} device
 * @param {Number} device.duration
 * @param {String} device.mode
 * @returns {Array.<Array>} schedule
 */
function createPossibleSchedules(device) {
    // массив всех возможных расписаний работы девайса
    const schedules = [];

    // промежуток времени, в который может работать устройство
    const period = mode[device.mode] || mode.allDay;

    for (let i = 0; i < period.length - device.duration + 1; i++) {

        // продолжительность цикла работы устройства, примененная к периоду
        const hours = period.slice(i, i + device.duration);

        // возможное расписание работы устройства
        const schedule = hours.reduce((acc, hour) => ({ ...acc,[hour]: device }), mode.allDay);
        schedules.push(schedule);
    }

   return schedules;
}
