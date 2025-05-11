const generateRandomUsername = () => {
    const prefix = 'testuser';
    const randomSuffix = Math.random().toString(36).substring(2, 10); // Generate a random string
    return `${prefix}${randomSuffix}`;
};

const stringToNumber = (string) => {
    const priceString = string.toString();
    //const cleanedString = string.toString.replace(/[$,]/g, "");
    const priceNumber = parseFloat(priceString.replace(/$/g, ""));
    console.log(priceString)
    return `${priceNumber}`;
}

module.exports = {
    generateRandomUsername,
    stringToNumber
};
