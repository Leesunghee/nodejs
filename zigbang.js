var http = require("http");

function getRoomInformation(roomId) {
    http.get("http://api.zigbang.com/v1/items?detail=true&item_ids=" + roomId, function(response) {
        var data = "";
        //data를 한번에 받지 않고 stream 형태로 받아서 chunk단위로 받기 때문에
        //나중에 한 번에 묶어서 처리한다.
        //4463886
        response.on("data", function(chunk) {
            data += chunk;
            //console.log(chunk);

        });

        response.on("end", function() {
            console.log(data);
            try {
                var jsonData = JSON.parse(data);
                var roomInformation = jsonData.items[0].item;

                var deposit = roomInformation.deposit;
                var rent = roomInformation.rent;

                //console.log(deposit);
                //console.log(rent);
            } catch (error) {
                console.log(error.message);
            }

        });

    });
}

var roomIds = process.argv.slice(2);

// roomIds.forEach(function(roomId) {
//     getRoomInformation(roomId);
// });

roomIds.forEach(getRoomInformation);

