const webpush = require('web-push');
const vapidkey = {
    publicKey: 'BPSTO906RQvft9aGXxTE15CLji_xEVN2bCjYnk5bcr5cPm0EaDOs1NMlRzNVn9NZxHY2KIzpvx0bpPfAnP8ale8',
    privateKey:'fER5Cn-VypUYwjLSmAzRFtMK3NpHK0bHr1hEkhVdG4I'
}
class notify {
    static subscriptionList=[]
    constructor() {
        
    }

    register(body) {
        for (sub of notify.subscriptionList) {
            if (sub.endpoint == body.subscription.endpoint) {
                return true
            }
        }
        notify.subscriptionList.push(body.subscription)
        console.log("register web", JSON.stringify(body.subscription))
        return true
    }
    unregister(body) {
        for (let i = 0; i < notify.subscriptionList.length; ++i) {
            if (notify.subscriptionList[i].endpoint == body.subscription.endpoint) {
                console.log("delete ", body.subscription.endpoint)
                notify.subscriptionList.splice(i, 1)
            }
        }
        return true
    }
    pushMsg(body) {
        console.log("push message", body)
        webpush.setGCMAPIKey('AAAAE7EM338:APA91bHNziRBD3n5bAuxb2HdlQEco24sTiG3nGn4PJKfg1t4ObCcG2P3wAZAMBPscInAJGH1HMDUlESR_Ye4RYE61IEh9sV5O7aSZtV8gbxIRdHfFcf8KosiqNzixEkG2mBwZvn6gbg7')
        // 设置 VAPID
        webpush.setVapidDetails(
            'https://my-site.com/contact',
            vapidkey.publicKey,
            vapidkey.privateKey
        );
        for (let subscription of notify.subscriptionList) {
            console.log("subscript", JSON.stringify(subscription))
            // 消息推送
            webpush
                .sendNotification(
                    subscription,
                    JSON.stringify({
                        msg: body.message,
                        url: "www.baidu.com",
                        icon: ""
                    })

                )
                .then(result => {
                    console.log("push success")
                })
                .catch(err => { 
                    console.log("push err", err)
                });
        }
    }
}

module.exports = new notify()