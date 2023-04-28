const { WebClient } = require('@slack/web-api');

module.exports.getLocalDate = async (event) => {
  try {
    const client = new WebClient(process.env.SLACK_TOKEN);
    const result = await client.users.info({
      user: event.payload.user_id,
      include_locale: true,
    });
    const localEpoch = event.requestContext.timeEpoch + result.user.tz_offset * 1000;
    const date = new Date(localEpoch);
    /* eslint-disable no-param-reassign */
    [event.date] = date.toISOString().split('T');
  } catch (err) {
    console.log(err);
  }
};
