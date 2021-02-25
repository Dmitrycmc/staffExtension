const sleep = timeout => new Promise(res => setTimeout(res, timeout));

export const polling = async (getter, period, attempts) => {
    let result;
    for (let i = 0; i < attempts; i++) {
        result = getter();
        if (result) return result;
        await sleep(period);
    }
};
