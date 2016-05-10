/**
 * Created by sunghee on 2016. 5. 3..
 */

function Person(name) {
    this.name = name;
    this.introduce = function() {
        return 'My name is ' + this.name;
    }
}

var p1 = new Person('lee sung hee');
p1.introduce();

document.write(p1.introduce() + '<br />');

var p2 = new Person('kim');
p2.introduce();



var person = {};
person.name = 'lee sung hee';
person.introduce = function () {
    return "My name is " + this.name;
}


var person2 = {
    name : 'lee sung hee',
    introduce : function() {
        return 'My name is ' + this.name;
    }
}

person2.introduce();