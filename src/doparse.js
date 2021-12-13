const OPEN = /\<[A-Z]\>/g;
const CLOSE = /\<[\/][A-Z]\>/g;
const TAG = /\<[\/]?[A-Z]\>/g;

const doparse = (text) => {
  if (!text) {
    //empty input, do not take any action
    return "";
  }
  var stack = [];
  var arr = text.match(TAG);
  if (!arr) return "Correctly tagged paragraph"; // the case without any tag is correctly tagged too.
  for (let i = 0; i < arr.length; i++) {
    let curTag = arr[i];
    if (curTag.match(OPEN)) {
      stack.push(curTag);
    } else {
      if (stack.length === 0) {
        return `Expected # found ${curTag}`;
      } else {
        let prevTag = stack.pop();
        let expectedCloseTagByPrev = [
          prevTag.slice(0, 1),
          "/",
          prevTag.slice(1),
        ].join("");
        if (expectedCloseTagByPrev !== curTag) {
          return `Expected ${expectedCloseTagByPrev} found ${curTag}`;
        }
      }
    }
  }
  if (stack.length === 0) {
    return "Correctly tagged paragraph";
  } else {
    let prevTag = stack.pop();
    let expected = [prevTag.slice(0, 1), "/", prevTag.slice(1)].join("");
    return `Expected ${expected} found #`;
  }
};

export default doparse;