const compose = (...args) => (value) => args.reduceRight((acc, fn) => fn(acc), value);

const ToArray = (s) => Array.from(s);
const Reverse = (arr) => arr.reverse();
const Join = (arr) => arr.join('');
const ReplaceOne = (s) => {
  console.log(s)
  let reg = new RegExp('\\]\\d+\\['),
    rep = 'pam.';
  return s.replace(reg, rep)
};
const DelLastOne = (s) => (/^pam\./.test(s) ? ReplaceOne(s.replace(/^pam\./, '')) : s);
const ReplaceOneexeca = (s, mapFildName) => {
  console.log(s)
  let reg = new RegExp('(' + mapFildName + ')(\\[\\d+\\])'),
    rep = '.map';
  return s.replace(reg, ($0, $1) => `${$1}${rep}`)
};

const transLastArrpath2map = compose(Join, Reverse, ToArray, DelLastOne, ReplaceOne, Join, Reverse, ToArray);

const datatype = (s) => Object.prototype.toString.call(s);
function execpath2json (json, path, limit) {
  let paths = [], mapItemPaths = [];
  function execpath (_res, path) {
    /String/.test(datatype(path)) && (paths = path.split('.').slice(1));
    /Array/.test(datatype(path)) && (mapItemPaths = path);

    if (mapItemPaths.length) {
      let _subRes = _res;
      mapItemPaths.map((curpath) => {
        console.log(`nextInMap:${curpath}`, `nextInMap-paths:${mapItemPaths}`);
        _subRes = _res[curpath]
      });

      return _subRes
    }

    if (paths.length) {
      let curpath = paths.shift();

      if (curpath.indexOf('[') !== -1) {
        let muitpath = curpath.split('[');
        curpath = muitpath[0];
        paths.unshift(muitpath[1].slice(0, -1));
      }
      console.log(`next:${curpath}`, `next-paths:${paths}`);
      if (curpath === 'map') {
        curpath = paths.shift();
        paths.length && (mapItemPaths = [...paths]);
        return limit ? _res.slice(0, limit).map(item => execpath(item[curpath])) : _res.map(item => execpath(item[curpath]))
      }
      return execpath(_res[curpath])
    }

    return _res
  }
  return execpath(json, transLastArrpath2map(path))
}

export default execpath2json
