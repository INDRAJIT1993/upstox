const fs = require('fs');
const path = require('path');
const socketoject=require('./../bin/www');

let rawdata = fs.readFileSync(path.resolve(__dirname, 'trades.json'));
let student = JSON.parse(rawdata);
let startTime = student[0].TS;
let endTime = startTime + 15;


let unique = [];
let list = [];

for (i = 0; i < student.length; i++) {
    if (student[i].sym == "XXBTZUSD") {
        if (student[i].TS > endTime) {
            startTime = endTime;
            endTime = endTime + 15;
            list.push(unique);
            unique = [];
        }
        unique.push(student[i]);
    }

}

Fetch = ((req, res) => {
    var barData;
    var open = 0;
    var high = 0;
    var low = 0;
    var close = 0;
    var volume;
    var barcount;
    var socket = socketoject.socketinstance
    var olhcdata;
    for (var k = 0; k < list.length; k++) {
        console.log("data");
        volume = 0;
        barcount = k + 1;
        if (list[k].length == 0) {
            open = close;
            high = close;
            low = close;
            olhcdata = { "event": "olhc_notify", "symbol":"XXBTZUSD", "bar_num": `${barcount}` };
            console.log('output',olhcdata);
            socket.emit('join', olhcdata)
        }
        else {
            barData = list[k]
            open = barData[0].P;
            high = barData[0].P
            low = barData[0].P
            for (var j = 0; j < barData.length; j++) {
                volume = volume + barData[j].Q
                if (barData[j].P > high) {
                    high = barData[j].P
                }
                if (barData[j].P < low) {
                    low = barData[j].P
                }
                if (j == barData.length - 1) {
                    close = barData[j].P
                    olhcdata = { "o": open, "h": high, "l": low, "c": close, "volume": volume, "event": "olhc_notify", "symbol": "XXBTZUSD", "bar_num": `${barcount}` };
                    console.log('output', olhcdata);
                    socket.emit('join', olhcdata)
                } else {
                    olhcdata = { "o": open, "h": high, "l": low, "c": close, "volume": volume, "event": "olhc_notify", "symbol": "XXBTZUSD", "bar_num": `${barcount}` };
                    console.log('output', olhcdata);
                    socket.emit('join', olhcdata)
                }

            }

        }
        if(k==list.length-1){
            socket.emit('close', {msg:"completed"});
        }

    }
    return res.status(200).send({success:true,msg:"completeed"});
});

module.exports = {Fetch}









