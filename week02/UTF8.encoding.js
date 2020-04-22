const encodeUtf8 = (str) => {
  const code = encodeURIComponent(text);
  const bytes = [];
  for (let i = 0; i < code.length; i++) {
    const c = code.charAt(i);
    if (c === "%") {
      const hex = code.charAt(i + 1) + code.charAt(i + 2);
      const hexVal = parseInt(hex, 16);
      bytes.push(hexVal);
      i += 2;
    } else {
      bytes.push(c.charCodeAt(0));
    }
  }
};

const decodeUtf8 = (bytes) => {
  let encoded = "";
  for (let i = 0; i < bytes.length; i++) {
    encoded += "%" + bytes[i].toString(16);
  }
  return decodeURIComponent(encoded)
};
