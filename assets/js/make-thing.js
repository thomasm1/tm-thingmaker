var toppings = {};

$.get('/toppings', function (data) {
  $.each(data, function () {
    toppings[this.id] = this;
  });
  loadImages();
});

var canvas = document.getElementById('thing'),
  ctx = canvas.getContext('2d');
attachHandlers();

function loadImages () {
  $.each(toppings, function (key, val) {
    var img = new Image();
    img.setAttribute('crossOrigin', 'anonymous'); 
    img.src = '//s3.amazonaws.com/aws-sensor-temperature/toppings/' + val.image;
    
    val.img = img;
  });
}

function attachHandlers () {
  $('.topping').click(function () {
    $(this).toggleClass('added');
    addTopping(this.id);
  });
}

function addTopping (id) {
  toppings[id].added = !toppings[id].added;
  redrawThing();
}

function redrawThing () {
  ctx.clearRect(0, 0, 400, 400);
  $.each(toppings, function () {
    if (this.added) {
      ctx.drawImage(this.img, 0, 0, 400, 400);
    }
  });
}

function getThingImage () {
  return canvas.toDataURL("image/png");
}

function sendThing () {
  var topps = [];

  $.map(toppings, function (topping) {
    if (topping.added) {
      topps.push(topping.id);
    }
  });

  var pkg = {
    toppings: topps,
    username: $('#userInfo').data('username'),
    name: (document.getElementById('thingName').value || '_'),
    img: getThingImage()
  };

  $.ajax({
    type: 'POST',
    url: '/thing',
    data: JSON.stringify(pkg),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      window.location.assign('/thing/' + pkg.name.replace(/ /g, '-'));
    }
  });
}
