'use strict';
    
const src_middleware_validateSlackRequest = require('../src/middleware/validateSlackRequest');
const src_middleware_getLocalDate = require('../src/middleware/getLocalDate');
const src_functions_hello_handler = require('../src/functions/hello/handler');

module.exports.handler = async (event, context) => {
  let end = false;
  context.end = () => end = true;

  const wrappedHandler = handler => prev => {
    if (end) return prev;
    context.prev = prev;
    return handler(event, context);
  };

  return Promise.resolve()
    .then(wrappedHandler(src_middleware_validateSlackRequest.slackEvent.bind(src_middleware_validateSlackRequest)))
    .then(wrappedHandler(src_middleware_getLocalDate.getLocalDate.bind(src_middleware_getLocalDate)))
    .then(wrappedHandler(src_functions_hello_handler.hello.bind(src_functions_hello_handler)));
};