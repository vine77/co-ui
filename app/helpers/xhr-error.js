import Health from '../utils/mappings/health';
import Event from '../helpers/event';
import ErrorMessage from '../helpers/error-message';
export default function (xhr, defaultMessage) {
  var errorMessage = ErrorMessage(xhr, defaultMessage);
  var severity = (xhr.status == 422) ? Health.WARNING : Health.ERROR;
  Event(errorMessage, severity);
  return errorMessage;
}
