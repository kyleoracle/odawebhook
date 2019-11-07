const request = require('request');
const crypto = require('crypto');

const channelSecretKey = "xxx";

const message = {
    "userId": "22343248763458761287",
    "userProfile": {
        "firstName": "Bob",
        "lastName": "Franklin",
        "age":45
        },
    "messagePayload": {
        "type": "text",
        "text": "hi"
    }
}

const body = Buffer.from(JSON.stringify(message), 'utf8');
const headers = {};
headers['Content-Type'] = 'application/json; charset=utf-8';
headers['X-Hub-Signature'] = buildSignatureHeader(body, channelSecretKey);


function buildSignatureHeader(buf, channelSecretKey) {
    return 'sha256=' + buildSignature(buf, channelSecretKey);
}

function buildSignature(buf, channelSecretKey) {
    const hmac = crypto.createHmac('sha256', Buffer.from(channelSecretKey, 'utf8'));
    hmac.update(buf);
    return hmac.digest('hex');
}

const options = {
    url: 'https://botsfb.ap.ngrok.io/connectors/v1/tenants/chatbot-tenant/listeners/webhook/channels/702bbdb3-1ce4-4578-ba9e-4567ae3361a3',
    headers: headers,
    body: body
};


request.post(options, function (error, response, body) {
    if(error){
        console.log(error);
    }
    console.log('response--------');
    console.log(JSON.stringify(response));
    console.log('error--------');
    console.log(JSON.stringify(error));

});


