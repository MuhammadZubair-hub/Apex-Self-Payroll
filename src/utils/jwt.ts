const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const base64Decode = (input: string): string => {
  let output = '';
  let buffer = 0;
  let bits = 0;

  for (const char of input) {
    const value = BASE64_CHARS.indexOf(char);
    if (value === -1) continue;
    buffer = (buffer << 6) | value;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      output += String.fromCharCode((buffer >> bits) & 0xff);
    }
  }

  return output;
};

// Decodes a JWT's payload segment client-side (no signature verification) so we can read
// claims like FirstTimeLogged without waiting on a dedicated backend field.
export const decodeJwt = <T = any>(token: string): T | null => {
  try {
    const payloadSegment = token.split('.')[1];
    if (!payloadSegment) return null;

    const base64 = payloadSegment.replace(/-/g, '+').replace(/_/g, '/');
    const rawChars = base64Decode(base64);
    const utf8 = decodeURIComponent(
      rawChars
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );

    return JSON.parse(utf8);
  } catch {
    return null;
  }
};
