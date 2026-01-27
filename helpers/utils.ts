import * as bcrypt from "bcryptjs";

/**
 * Hashes a password using bcrypt
 * @param password - Plain text password to hash
 * @returns Promise that resolves to the hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Capitalizes all words in a string or array of strings
 * @param strings - String or array of strings to capitalize
 * @param separator - Separator to use between words
 * @returns Capitalized string or array of strings
 */
export const capitalizeAll = (strings: string[] | string, separator: string = ' '): string => {
  if (Array.isArray(strings)) {
    return strings.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(separator);
  }
  return strings.charAt(0).toUpperCase() + strings.slice(1);
};
