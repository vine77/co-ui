import errorMessage from '../utils/error-message';

export default function(xhr, defaultMessage) {
  var message = defaultMessage || 'An error occured: ' + xhr.status + ' ' + xhr.statusText;
  try {
    if (xhr[0].hasOwnProperty('responseText')) {
      var json = Ember.$.parseJSON(xhr[0].responseText);
    } else if (xhr.hasOwnProperty('responseText')) {
      var json = Ember.$.parseJSON(xhr.responseText);
    } else {
      var json = xhr;
    }
    message = errorMessage(json) || message;
  } catch(error) {}
  return message;
}
