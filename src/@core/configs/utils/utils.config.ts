const checkLastBar = (value: string) => {
    value = value.trim();
    const lastCharacter = value[value.length - 1];
    return lastCharacter !== '/' ? `${value}/` : value;
};

export {checkLastBar}