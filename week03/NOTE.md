# 每周总结可以写在这里
有点懵，暂时还有些不是特别想明白了，大部分作业参考了网上的一些文章。

### 两种转化函数
```
// NumberToString

function convertNumberToString(number,x){

  let integer = Math.floor(number)
  let fraction = x === 10 ? ('' + number).match(/\.\d*/)[0]:number - integer
  let string = '';
  while(integer > 0){
    string += String(integer % x) +string;
    integer = Math.floor(integer / x);
  }

  return string + fraction;
}
// StringToNumber
function convertStringToNumber(string, radix = 10) {
  if (radix > 10) {
    return;
  }
  let flag = /e|E/.test(string);
  if (!flag) {
    let chars = string.split('');
    let number = 0;
    let i = 0;
    while (i < chars.length && chars[i] != '.') {
      number = number * radix;
      number += chars[i].codePointAt(0) - '0'.codePointAt(0);
      i++;
    }
    if (chars[i] === '.') {
      i++;
    }
    let fraction = 1;
    while (i < chars.length) {
      fraction /= radix;
      number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
      i++;
    }
    return number;
  } else {
    let logNumber = Number(string.match(/\d+$/)[0]);
    let number = string.match(/^[\d\.]+/)[0].replace(/\./, '');
    if (/e-|E-/.test(string)) {
      return Number(number.padEnd(logNumber + 1, 0));
    } else {
      return Number(number.padStart(logNumber + number.length, 0).replace(/^0/, '0.'));
    }
  }
}
```

### javascript 无法实现对象、其含有的特性

```
Bound Function Exotic Objects
特性 -- [[Call]] [[Construct]]
Array Exotic Objects
特性 -- [[DefineOwnProperty]] ArrayCreate(length[,proto]) ArraySpeciesCreate(originalArray,length) ArraySetLength(A,Desc)
String Exotic Objects
特性 -- [[GetOwnProperty]] [[DefineOwnProperty]] [[OwnPropertyKeys]] StringCreate(value,prototype) StringGetOwnProperty(S,P)
Arguments Exotic Objects
特性 -- [[GetOwnProperty]] [[DefineOwnProperty]] [[Get]] [[Set]] [[Delete]] CreateUnmappedArgumentsObject(argumentsList) CreateMappedArgumentsObject(func,formals,argumentsList,env)
Integer-Indexed Exotic Objects
特性 -- [[GetOwnProperty]] [[HasProperty]] [[DefineOwnProperty]] [[Get]] [[Set]] [[OwnPropertyKeys]] IntegerIndexedObjectCreate(prototype,internalSlotsList) IntegerIndexedElementGet(O,index) IntegerIndexedElementSet(O,index,value)
Module Namespace Exotic Objects
特性 -- [[SetPrototypeOf]] [[IsExtensible]] [[PreventExtensions]] [[GetOwnProperty]] [[DefineOwnProperty]] [[HasProperty]] [[Get]] [[Set]] [[Delete]] [[OwnPropertyKeys]] ModuleNamespaceCreate(module,exports)
Immutable Prototype Exotic Objects
特性 -- [[SetProtot
```