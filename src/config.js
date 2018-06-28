const isDebug = false;
export default (isDebug => {
  const prod = {
    debug: isDebug
  };
  const debug = {
    debug: isDebug
  };

  return isDebug ? debug : prod;
})(isDebug);