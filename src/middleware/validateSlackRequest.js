const { createHmac, timingSafeEqual } = require('crypto');
const queryString = require('querystring');

/* eslint-disable consistent-return */
module.exports.slackEvent = async (event, context) => {
  try {
    // Extract the Slack signing secret
    const slackSignature = event.headers['x-slack-signature'];
    const timestamp = event.headers['x-slack-request-timestamp'];

    // Check if the request is older than 5 minutes
    const fiveMinutesAgo = Math.floor(Date.now() / 1000) - 60 * 5;
    if (timestamp < fiveMinutesAgo) {
      context.end();
      return 'Slack request timestamp is too old';
    }

    const baseString = `v0:${timestamp}:${event.body}`;
    const hmac = createHmac('sha256', process.env.SLACK_SIGNING_SECRET);
    const signature = `v0=${hmac.update(baseString).digest('hex')}`;

    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(slackSignature))) {
      context.end();
      return 'Invalid Slack signature';
    }
    console.log('event', event);
    /* eslint-disable no-param-reassign */
    event.payload = queryString.parse(event.body);
  } catch (err) {
    console.log(err);
    context.end();
    return 'Auth error';
  }
};
