import ErrorMessage from "../helpers/error-message";
export default function (xhr, defaultMessage) {
  var errorMessage = defaultMessage || 'An error occured: ' + xhr.status + ' ' + xhr.statusText;
  try {
    var json = (xhr.hasOwnProperty('responseText')) ? Ember.$.parseJSON(xhr.responseText) : xhr;
    errorMessage = ErrorMessage(json) || errorMessage;
  } catch(error) {}
  return errorMessage;
}