const redis = require("redis");
const { promisify } = require("util");
const configuration = require('../config');

const redisPassword = configuration.redisPassword;

const client = redis.createClient(
    configuration.redisPort,
    configuration.redishost,
    {
        auth_pass: redisPassword,
    }
);

const ROOM_KEY = "rooms";

client.on("error", function(error) {
  console.error(`Redis Error: ${error}`);
});

const lRangeSync = promisify(client.lrange).bind(client);
const lPushSync = promisify(client.lpush).bind(client);


exports.getAll = function(){

   return new Promise( function(resolve,reject){

        lRangeSync([ROOM_KEY, 0, -1]).then((res) => {
            console.log(`Redis Data: ${res}`);
            resolve(res);
        })
        .catch(error => {
            reject(error);
        })

    } );

}

exports.addRoom = function(newRoomName){
    return new Promise ( function(resolve, reject){

        if(newRoomName == null || newRoomName == "")
        {
            reject(`roomname cannot be empty`);
        }

        lPushSync([ROOM_KEY, newRoomName]).then((res) => {
            console.log(`lPush: ${ROOM_KEY}`);
            resolve(res);
        })
        .catch(error => {
            reject(error);
        })
    });
}

