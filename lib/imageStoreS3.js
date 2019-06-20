const AWS = require('aws-sdk');

const s3 = AWS.S3();

module.exports.save = (name, data, callback) => {
let params = {
    Bucket: 'aws-sensor-temperature', // thomas
    Key: `things/${name}.png`,
    Body: new Buffer(data, 'base64'),
    ContentEncoding: 'base64',
    ContentType: 'image/png'
};
s3.putObject(params, (err, data) => {
    callback(err, `//s3.amazonaws.com/aws-sensor-temperature/${params.Key}` )
})

};