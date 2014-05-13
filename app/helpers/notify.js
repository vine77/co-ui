import PriorityToType from '../helpers/priority-to-type';
export default function (message, type, notifyTitle, sticky) {
  if (typeof type === 'undefined') {
    type = 'warning';
  } else {
    type = PriorityToType(type);
  }
  if (typeof notifyTitle === 'undefined' || !notifyTitle) {
    notifyTitle = type.capitalize();
  }

  $(function(){
    new PNotify({
        title: notifyTitle,
        text: message,
        type: type,
        sticker: false,
        animate_speed: 200,
        hide: (sticky) ? false : true
    });
  });
};