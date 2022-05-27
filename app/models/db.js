
module.exports = () => {
  return import('lowdb').then(mod => {
    return mod
  });
}
