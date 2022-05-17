const webpush = require('web-push');
const vapidkey = {
    publicKey: 'BPSTO906RQvft9aGXxTE15CLji_xEVN2bCjYnk5bcr5cPm0EaDOs1NMlRzNVn9NZxHY2KIzpvx0bpPfAnP8ale8',
    privateKey: 'fER5Cn-VypUYwjLSmAzRFtMK3NpHK0bHr1hEkhVdG4I'
}
const mongodb = require("./mongodb")
class notify {
    // static subscriptionList=[]
    constructor() {

    }

    async register(body) {
        await mongodb.insertOne(body.subscription)
        console.log("register web", JSON.stringify(body.subscription))
        return true
    }
    async unregister(body) {
        await mongodb.deleteOne(body.subscription)
        return true
    }
    async pushMsg(body) {
        console.info("push message", body)
        webpush.setGCMAPIKey('AAAAE7EM338:APA91bHNziRBD3n5bAuxb2HdlQEco24sTiG3nGn4PJKfg1t4ObCcG2P3wAZAMBPscInAJGH1HMDUlESR_Ye4RYE61IEh9sV5O7aSZtV8gbxIRdHfFcf8KosiqNzixEkG2mBwZvn6gbg7')
        // 设置 VAPID
        webpush.setVapidDetails(
            'https://my-site.com/contact',
            vapidkey.publicKey,
            vapidkey.privateKey
        );
        let subscriptionList =await mongodb.getSub()
        for (let subscription of subscriptionList) {
            console.log("subscript", JSON.stringify(subscription))
            // 消息推送
            try {
                await webpush.sendNotification(
                    subscription,
                    JSON.stringify({
                        msg: body.message,
                        url: "www.baidu.com",
                        icon: ""
                    })
                );
                console.log("push success",subscription)
            } catch (e) {
                console.error(e)
            }
        }
    }
}

module.exports = new notify()