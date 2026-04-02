export const formatPhoneNumber = (phone: string, countryPrefix = '+212'): string => {
  return `${countryPrefix}${phone.replace(/^0+/, '')}`;
};
