const sendBtn = document.querySelector('.cta-button-large');
const notification = document.getElementById('notification');

sendBtn.addEventListener('click', function (e) {
  e.preventDefault();
  submitToAPI();
  setTimeout(function () {
    sendBtn.blur();
  }, 500);
});

function submitToAPI() {
  var URL =
    'https://8snwqes0vi.execute-api.eu-north-1.amazonaws.com/default/mailfwd';

  var Namere = /[A-Za-z]{1}[A-Za-z]/;
  if (!Namere.test($('#name-input').val())) {
    notify('error', 'Please enter your company name');
    return;
  }

  if ($('#email-input').val() == '') {
    notify('error', 'Please enter your email address');
    return;
  }

  var emailre =
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  if (!emailre.test($('#email-input').val())) {
    notify('error', 'Please enter a valid email address');
    return;
  }

  var mobilere = /[0-9]{10}/;
  if (!mobilere.test($('#phone-input').val())) {
    notify('error', 'Please enter a valid phone number');
    return;
  }

  if ($('#description-input').val() == '') {
    notify('error', 'Please enter a message');
    return;
  }

  var name = $('#name-input').val();
  var phone = $('#phone-input').val();
  var email = $('#email-input').val();
  var desc = $('#description-input').val();
  var data = {
    name: name,
    phone: phone,
    email: email,
    desc: desc,
  };

  $.ajax({
    type: 'POST',
    url: URL,
    dataType: 'json',
    crossDomain: 'true',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(data),

    success: function () {
      // clear form and show a success message
      $('#contact-form').trigger('reset');
      notify('success', 'Thank you for your message!');
    },
    error: function () {
      notify(
        'error',
        'Oops! Something went wrong. Please try again later.'
      );
    },
  });
}

function notify(type, message) {
  notification.textContent = message;
  notification.className = type;
  notification.style.display = 'block';

  setTimeout(function () {
    notification.style.display = 'none';
  }, 3000);
}
