const { uuid } = require('uuidv4');
const dynamoose = require('dynamoose');

dynamoose.local();

const DiarySchema = new dynamoose.Schema({
  user_id: {
    type: String,
    hashKey: true,
  },
  date: {
    type: Date,
    rangeKey: true,
  },
  messages: {
    type: Array,
    schema: [
      {
        message_id: {
          type: String,
          default: uuid,
        },
        text: String,
      },
    ],
  },
});

const DiaryModel = dynamoose.model('Diary', DiarySchema);

module.exports = DiaryModel;
