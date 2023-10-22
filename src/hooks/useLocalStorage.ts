type StateSetter<T> = (newData: T) => void;
type StateGetter = () => unknown;

export const useLocalStorage = <T>(key: string, initData?: T): [StateGetter, StateSetter<T>] => {
    if (initData) {
        localStorage.setItem(key, JSON.stringify(initData));
    }

    const state: StateGetter = () => {
        const result = localStorage.getItem(key);
        if (!result) {
            return null;
        }
        return JSON.parse(result);
    };

    const setState: StateSetter<T> = (newData: T) => {
        localStorage.setItem(key, JSON.stringify(newData));
    };

    return [state, setState];
};
