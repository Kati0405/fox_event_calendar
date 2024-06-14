export const loadState = <T>(key: string): T | undefined => {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState) as T;
    } catch (err) {
        console.error('Error loading state from local storage', err);
        return undefined;
    }
};

export const saveState = <T>(key: string, state: T): void => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(key, serializedState);
    } catch (err) {
        console.error('Error saving state to local storage', err);
    }
};
