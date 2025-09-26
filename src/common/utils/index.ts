import bcrypt from 'bcrypt';

export const safeParseNumber = (value: any, fallbackValue = -1) => {
  try {
    const parsedNumber = Number(value);
    return isNaN(parsedNumber) ? fallbackValue : parsedNumber;
  } catch (error) {
    console.log('Unable to parse value: ', value, error);
    return fallbackValue;
  }
};

export const hashString = async (str: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(str, salt);
};
