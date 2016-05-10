/**
 * Created by sunghee on 2016. 5. 10..
 */
var DummyDB = (function () {

    var DummyDB = {};
    var storage = [];
    var count = 1;

    DummyDB.get = function (id) {
        if (id) {
            id = (typeof id == 'string') ? Number(id) : id;

            for (var i in storage) {
                if (storage[i].id == id) {
                    return storage[i];
                }
            }
        } else {
            return storage;
        }
    };

    DummyDB.insert = function (data) {
        data.id = count++;
        storage.push(data);
        return data;
    };

    DummyDB.remove = function (id) {
        id = (typeof id == 'string') ? Number(id) : id;

        for (var i in storage) {
            if (storage[i].id == id) {
                storage.splice(i, 1);

                return true;
            }
        }

        return false;
    };

    return DummyDB;

})();