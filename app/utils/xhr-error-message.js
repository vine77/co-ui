import errorMessage from '../utils/error-message';

export default function(xhr, defaultMessage) {
  var message = defaultMessage || 'An error occured: ' + xhr.status + ' ' + xhr.statusText;
  try {
    var json = (xhr.hasOwnProperty('responseText')) ? Ember.$.parseJSON(xhr.responseText) : xhr;
    message = errorMessage(json) || message;
  } catch(error) {}
  return message;
}
