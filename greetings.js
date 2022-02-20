exports.handler = function(context, event, callback) {
    context.getTwilioClient().messages.create({
      to: '+14084208241',
      from: '+19106988812', 
      body: 'The timing of your loved one\'s contractions indicates that it\'s time to go to the hospital!'
    }).then(msg => {
      callback(null, msg.sid);
    }).catch(err => callback(err));
  }