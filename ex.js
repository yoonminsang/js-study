const person = {
  name: 'min',
  hi(callback) {
    callback.bind(this)();
  },
};

person.hi(function () {
  console.log(`my name is ${this.name}`);
});
