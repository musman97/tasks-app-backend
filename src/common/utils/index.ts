export const safeParseNumber = (value: any, fallbackValue = -1) => {
  try {
    const parsedNumber = Number(value);
    return isNaN(parsedNumber) ? fallbackValue : parsedNumber;
  } catch (error) {
    console.log('Unable to parse value: ', value, error);
    return fallbackValue;
  }
};
