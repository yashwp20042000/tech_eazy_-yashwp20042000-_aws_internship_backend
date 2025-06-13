
export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
export const pincodeRegex = /^[1-9][0-9]{5}$/;
export const trackingIdRegex = /^[A-Z0-9]{3}-[A-Z0-9]{6}-[A-Z0-9]{2}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
export const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
export const currencyRegex = /^\d+(\.\d{1,2})?$/;
export const testRegex = (value: string, pattern: RegExp): boolean => {
  return pattern.test(value);
};

export const regexErrors = {
  email: 'Must be a valid email address',
  phone: 'Must be a valid international phone number',
  pincode: 'Must be a 6-digit Indian pincode',
  trackingId: 'Must be in format XXX-XXXXXX-XX',
  password: 'Must contain 8+ chars with uppercase, lowercase, number and special character',
  url: 'Must be a valid http/https URL',
  date: 'Must be in YYYY-MM-DD format',
  currency: 'Must be a positive number with max 2 decimals'
};
