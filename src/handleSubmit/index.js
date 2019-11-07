const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async event => {
  const content = JSON.stringify(event.body);
  try {
    await uploadFormContent(content);

    console.log('Succeeded in uploading form content!')
  } catch (err) {
    console.error('Failed to upload form content:');
    console.error(err);

    // Re-throw error to ensure invocation is marked as a failure
    throw err;
  }
};

// Upload form content from event
async function uploadFormContent(content) {

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: content,
    ContentType: 'application/json',
    ACL: 'public-read'
  }

  try {
    await s3.putObject(params).promise();
  } catch (err) {
    console.error(err);
    throw err;
  }
}