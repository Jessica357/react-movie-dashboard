function ensureObject(input: {
  [key: string]: any;
}): {[key: string]: any} | null {
  if (input == null || typeof input !== 'object' || Array.isArray(input)) {
    return null;
  } else {
    return input;
  }
}

export default ensureObject;
