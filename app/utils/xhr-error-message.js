import errorMessage from '../utils/error-message';

export default function(xhr, defaultMessage) {
  var message = defaultMessage || 'An error occured: ' + xhr.status + ' ' + xhr.statusText;
  var json;
  try {
    if (xhr[0].hasOwnProperty('responseText')) {
      json = Ember.$.parseJSON(xhr[0].responseText);
    } else if (xhr.hasOwnProperty('responseText')) {
      json = Ember.$.parseJSON(xhr.responseText);
    } else {
      json = xhr;
    }
    message = errorMessage(json) || message;
  } catch(error) {}
  return message;
}
