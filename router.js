var fs = require("fs");
var render = require("./renderer");
var http = require("http");

function home(request, response) {
    if (request.url === "/") {
        // fs.readFile("./templates/home.html", function(error, data) {
        //     response.write(data);
        //     response.end();
        // });
        // var baseContent = fs.readFileSync("./templates/base.html", "utf8");
        // var headerContent = fs.readFileSync("./templates/header.html", "utf8");
        // var contentContent = fs.readFileSync("./templates/content.html", "utf8");
        // var footerContent = fs.readFileSync("./templates/footer.html", "utf8");

        // baseContent = baseContent.replace("% HEADER %", headerContent);
        // baseContent = baseContent.replace("% CONTENT %", contentContent);
        // baseContent = baseContent.replace("% FOOTER %", footerContent);

        // response.write(baseContent);
        // response.end();

        render("home", response, {});

    }
}

function room(request, response) {
    var roomId = request.url.replace("/", "");
    if (roomId.length > 0) {
        // response.write(roomId);
        // response.end();
        http.get("http://api.zigbang.com/v1/items?detail=true&item_ids=" + roomId, function(apiResponse) {
            var data = "";
            //data를 한번에 받지 않고 stream 형태로 받아서 chunk단위로 받기 때문에
            //나중에 한 번에 묶어서 처리한다.
            apiResponse.on("data", function(chunk) {
                data += chunk;
            });

            apiResponse.on("end", function() {

                try {
                    var jsonData = JSON.parse(data);
                    var roomInformation = jsonData.items[0].item;

                    var deposit = roomInformation.deposit;
                    var rent = roomInformation.rent;
                    var agent_address1 = roomInformation.agent_address1;
                    var images_url = roomInformation.images[0].url;

                    var values = {
                        "deposit" : deposit,
                        "rent" : rent,
                        "agent_address1" : agent_address1,
                        "images_url" : images_url
                    }

                    console.log(deposit);
                    console.log(rent);
                    render("room", response, values);
                } catch (error) {
                    console.log(error.message);
                }

            });

        });

    }
}

module.exports.home = home;
module.exports.room = room;