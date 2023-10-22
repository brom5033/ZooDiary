type CalcFunction = { readonly [key in string]: (time: number) => number };
type CheckFunction = { readonly [key in string]: (time: number) => boolean };

const calcTime: CalcFunction = {
    second: (time) => Math.floor(time / 1000),
    minute: (time) => Math.floor(time / 60000),
    hour: (time) => Math.floor(time / 3600000),
    day: (time) => Math.floor(time / 86400000),
};

const checkTime: CheckFunction = {
    isSecond: (time) => time < 60000,
    isMinute: (time) => time >= 60000 && time < 3600000,
    isHour: (time) => time >= 3600000 && time < 86400000,
    isDay: (time) => time >= 86400000 && time < 2592000000,
    isOverOneMonth: (time) => time >= 2592000000,
};

export const stringToDday = (time: string, lang = 'ko') => {
    const formatter = new Intl.RelativeTimeFormat(lang, {
        numeric: 'always',
    });
    const passed = new Date().getTime() - new Date(time).getTime();

    if (checkTime.isSecond(passed)) {
        // 초 단위
        return formatter.format(-calcTime.second(passed), 'second');
    }
    if (checkTime.isMinute(passed)) {
        // 분 단위
        return formatter.format(-calcTime.minute(passed), 'minute');
    }
    if (checkTime.isHour(passed)) {
        // 시간 단위
        return formatter.format(-calcTime.hour(passed), 'hour');
    }
    if (checkTime.isDay(passed)) {
        // 일 단위
        return formatter.format(-calcTime.day(passed), 'day');
    }
    // mm월 dd일
    return new Intl.DateTimeFormat(lang, {
        month: 'short',
        day: 'numeric',
    }).format(new Date(time));
};
