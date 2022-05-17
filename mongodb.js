const uri = "mongodb+srv://pushmsg:asdQWE123@cluster0.mwlwt.mongodb.net/?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, {
    useNewUrlParser: true
});

module.exports.getSub = () => {
    return new Promise((resolve, reject) => {
        try {

            client.connect(err => {
                if (!err) {
                    const collection = client.db("push_msg").collection("subs");
                    // perform actions on the collection object
                    collection.find({}).toArray((err, data) => {
                        console.log("subs", data)
                        if (err) {
                            reject()
                        }
                        else {
                            resolve(data)
                        }
                       

                        client.close();
                    })
                }

            });
        } catch (e) {
            console.error(e)
        }

    })

}
module.exports.insertOne = (sub) => {
    try {
        console.log("insert one --- 1 ", sub)

        return new Promise((resolve, reject) => {
            console.log("insert one --- 2 ", sub, client)

            client.connect(err => {
                console.log("connect", err)
                if (!err) {

                    const collection = client.db("push_msg").collection("subs");
                    // perform actions on the collection object
                    collection.findOne({
                        "endpoint": sub.endpoint
                    }, (err, result) => {
                        if (!err && result) {
                            return resolve()
                        }
                        //先判断是否存在 再插入
                        collection.insertOne(sub, (err, result) => {
                            if (err) {
                                reject()
                            } else {
                                resolve()
                            }

                            client.close();
                        })
                    })

                }

            });
        })
    } catch (e) {
        console.error(e)
    }

}

module.exports.deleteOne = (sub) => {
    return new Promise((resolve, reject) => {
        client.connect(err => {
            console.log("connect", err)

            if (!err) {
                const collection = client.db("push_msg").collection("subs");
                // perform actions on the collection object
                collection.deleteOne({
                    "endpoint": sub.endpoint
                }, (err, result) => {
                    console.log("delete one", err, result)
                    if (err) {
                        reject()
                    }
                    else {
                        resolve()
                    }
                    

                    client.close();
                })
            }

        });
    })
}