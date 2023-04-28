module.exports.hello = async () => ({
  statusCode: 200,
  body: JSON.stringify({
    message: 'hello world!',
  }),
});
