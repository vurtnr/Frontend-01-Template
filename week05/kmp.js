const kmp = (patten, txt) => {
  const p_length = patten.length;
  const t_length = txt.length;
  const next = process(patten);
  for (let i = 0, j = 0; i < t_length; ) {
    if (txt[i] === patten[j]) {
      i++;
      j++;
    }
    if (j === p_length) return i - j;
    if (txt[i] !== patten[j]) {
      j > 0 ? (j = next[j - 1]) : i++;
    }
  }
  return -1;
};

//部分匹配表
const process = (patten) => {
  let j = 0;
  let i = 1;
  let next = new Array(patten.length).fill(0);
  while (i < patten.length) {
    if (patten[i] === patten[j]) {
      j++;
      next[i] = j;
      i++;
    } else if (j > 0) {
      j = 0;
    } else {
      next[i] = 0;
      i++;
    }
  }
  return next;
};

// process("ABCDABD");
console.log(kmp("ABCDFGEABCDFGS", "BBC ABCDAB ABCDABCDABDE"));
