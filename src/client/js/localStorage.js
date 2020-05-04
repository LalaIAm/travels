const saveData = (data) => {
    localStorage('trip', JSON.stringify(data));
}

const getData = () => {
    const data = localStorage.getItem('trip');
    return JSON.parse(data);
}

export { saveData, getData };