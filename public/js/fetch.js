function fetch(url, data, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var res = JSON.parse(xhr.responseText);
      cb(res);
    }
  };
  xhr.open('POST', url, true);
  xhr.send(data);
}