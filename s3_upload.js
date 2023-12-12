const AWS = require("aws-sdk");

AWS.config.update({
    accessKeyId: 'aws-access-key',
    secretAccessKey: 'aws-secret-access-key',
    region: 'aws-reagion',
});

const s3 = new AWS.S3();
module.exports = async (data) => {
    const bucketName = 'mytmptestbucket123';

    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Adding padding if needed
    const date = today.getDate().toString().padStart(2, '0'); 
    const key = `alllogs/${year}-${month}-${date}_file.log`;

    try {
        const headParams = {
            Bucket: bucketName,
            Key: key
        };

        let existingLogs = '';
        try {
            const { Body } = await s3.getObject(headParams).promise();
            existingLogs = Body.toString('utf-8');
        } catch (err) {
            if (err.code !== 'NoSuchKey') {
                throw err;
            }
        }

        existingLogs += data + '\n'; 

        await s3.putObject({
            Bucket: bucketName,
            Key: key,
            Body: existingLogs,
            ContentType: 'text/plain' 
        }).promise();
    } catch (error) {
        console.error('Error appending logs to S3:', error);
        throw error;
    }
};
