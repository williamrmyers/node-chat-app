// [{
//   id:
// }]


class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    let user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }
  getUser(id) {
    let users = this.users.filter((user) => {
      return user.id === id;
    });
    return users[0]
  }
  getUserList(room) {
    let users = this.users.filter((user) => {
      return user.room === room;
    });

    let namesArray = users.map((user) => {
      return user.name;
    });
    return namesArray;
  }
}


// let users = new Users();
// users.users = [{
//   id:1,
//   name:'Mike',
//   room:'Node Course'
// },{
//   id:2,
//   name:'Jen',
//   room:'React Course'
// },{
//   id:3,
//   name:'Dave',
//   room:'Node Course'
// }];

// let test = users.removeUser(1)
//
// console.log(test);


module.exports = {Users};





// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUsersDescription() {
//     return `${this.name} is ${this.age} years old.`
//   }
// }
//
// let me = new Person('William', 30)
// let description = me.getUsersDescription();
//
// console.log(description);
