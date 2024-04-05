
export const isNotEmpty = (value) => {
    return value.trim() !== '';
};

export const isValidEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};