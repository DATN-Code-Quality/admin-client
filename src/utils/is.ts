const getConstructor = (input: { constructor: any } | null) =>
  input !== null && typeof input !== 'undefined' ? input.constructor : null;

const instanceOf = (input: any, constructor: WeakMapConstructor) =>
  Boolean(input && constructor && input instanceof constructor);

const isNullOrUndefined = (input: null) =>
  input === null || typeof input === 'undefined';

const isObject = (input: any) => getConstructor(input) === Object;

const isNumber = (input: unknown) =>
  getConstructor(input) === Number && !Number.isNaN(input);

const isString = (input: any) => getConstructor(input) === String;

const isBoolean = (input: any) => getConstructor(input) === Boolean;

const isFunction = (input: any) => getConstructor(input) === Function;

const isArray = (input: any) => Array.isArray(input);

const isWeakMap = (input: any) => instanceOf(input, WeakMap);

const isNodeList = (input: any) => instanceOf(input, NodeList);

const isElement = (input: any) => instanceOf(input, Element);

const isTextNode = (input: any) => getConstructor(input) === Text;

const isEvent = (input: any) => instanceOf(input, Event);

const isCue = (input: any) =>
  instanceOf(input, window.TextTrackCue) || instanceOf(input, window.VTTCue);

const isTrack = (input: { kind: any }) =>
  instanceOf(input, TextTrack) ||
  (!isNullOrUndefined(input) && isString(input.kind));

const isEmpty = (input: string | any[]) =>
  isNullOrUndefined(input) ||
  ((isString(input) || isArray(input) || isNodeList(input)) && !input.length) ||
  (isObject(input) && !Object.keys(input).length);

const isUrl = (input: string) => {
  // Accept a URL object
  if (instanceOf(input, window.URL)) {
    return true;
  }

  // Add the protocol if required
  let string = input;
  if (!input.startsWith('http://') || !input.startsWith('https://')) {
    string = `http://${input}`;
  }

  try {
    return !isEmpty(new URL(string).hostname);
  } catch (e) {
    return false;
  }
};

const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export default {
  nullOrUndefined: isNullOrUndefined,
  object: isObject,
  number: isNumber,
  string: isString,
  boolean: isBoolean,
  function: isFunction,
  array: isArray,
  weakMap: isWeakMap,
  nodeList: isNodeList,
  element: isElement,
  textNode: isTextNode,
  event: isEvent,
  cue: isCue,
  track: isTrack,
  url: isUrl,
  empty: isEmpty,
  jsonString: isJsonString,
};
