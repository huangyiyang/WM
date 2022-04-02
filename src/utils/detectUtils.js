const detectTableJson = (json, tables, paths) => {
  let tableHub = tables || [];
  let pathHub = paths || ['res'];
  let children = [];
  Object.keys(json).forEach(childName => {
    const child = json[childName];
    const childType = Object.prototype.toString.call(child).slice(8, -1);
    pathHub.push(childName);
    console.log(
      `%c nextDetectChild ${pathHub.join('.')} %c ${childName} %c ${childType} %c`,
      'background:#49c32bc4 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
      'background:#eab883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
      'background:#ca6873 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
      'background:transparent'
    )
    if (childType === 'Array') {
      let arrayChildren = child.filter(arrayChild => {
        const firstChildType = Object.prototype.toString.call(arrayChild).slice(8, -1);
        return firstChildType === 'Object'
      });

      let firstChild = arrayChildren[0];
      const firstChildType = Object.prototype.toString.call(firstChild).slice(8, -1);
      arrayChildren.length && tableHub.push({name: childName, path: pathHub.join('.'), json: arrayChildren});
      console.log(
        `%c ${paths.join('.')} %c first %c ${firstChildType} %c`,
        'background:#49c32bc4 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:#cab883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
        'background:#ca6873 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
        'background:transparent'
      )
    }
    children.push({path: pathHub.join('.'), val: json[childName]})
    pathHub.pop()
  })
  !tableHub.length && (children = children.map(nextDetect => {
    let {path, val} = nextDetect;
    let prefixpaths = path.split('.');
    const nextDetectType = Object.prototype.toString.call(val).slice(8, -1);

    if (nextDetectType === 'Object') {
      console.log(
        `%c nextDetect ${prefixpaths.join('.')} %c nextDetectType ${nextDetectType} %c`,
        'background:#49c32bc4 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
        'background:transparent'
      )
      let {tableHub: _tableHub, children: _children} = detectTableJson(val, tableHub, prefixpaths);
      tableHub.concat(_tableHub);
      return {path, val, children: _children}
    }
    return {path, val}
  }));
  return {tableHub, children}
}

export default {
  detectTableJson
}
