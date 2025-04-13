

let lib

export const getDataStorage = async (key) => {
    const data = lib.getItem(key);
    return data;
}

export const setDataStorage = async (key, data) => {
    lib.setItem(key, data);
}
