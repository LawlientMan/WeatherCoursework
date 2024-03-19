export function LocalStorageGetItem<T extends Object>(key: string, defaultValue: T) {
    try {
        const serializedState = localStorage.getItem(key);
        if (!serializedState) return defaultValue;
        return JSON.parse(serializedState);
    } catch (e) {
        console.log(e);
        return defaultValue;
    }
}

export function LocalStorageGetString(key: string, defaultValue: string | null = null) {
    const serializedState = localStorage.getItem(key);
    return serializedState ? serializedState : defaultValue;
}

export async function LocalStorageSetItem(key: string, state: any) {
    try {
        if (!state) {
            localStorage.removeItem(key);
        }
        else {
            const serializedState = JSON.stringify(state);
            localStorage.setItem(key, serializedState);
        }
    } catch (e) {
        console.log(e);
    }
}