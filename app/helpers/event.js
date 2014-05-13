import Notify from "../helpers/notify";
import Health from '../utils/mappings/health';
import PriorityToType from '../helpers/priority-to-type';
export default function (message, type, notify, title, sticky) {
  if (typeof type === 'undefined') type = Health.WARNING;
  type = PriorityToType(type);
  if (typeof message === 'undefined') {
    var prefix = (type === 'info' || type === 'error') ? 'An ' : 'A ';
    message = prefix + type + ' event occurred';
  }

  if (typeof notify === 'undefined' || notify === true) {
    var notifyTitle = (typeof title === 'undefined' || !title) ? null : title;
    Notify(message, type, notifyTitle, sticky);
  }
}