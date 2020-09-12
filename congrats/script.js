(async () => {
  const c    = document.getElementById('c');
  let params = location.search.substr(1)
    .split('&')
    .map((h) => h.split('='))
    .reduce((o, a) => ({ ...o, [a[0]]: decodeURIComponent(a[1]) }), {});
  
  let msg = (await import('./messages.js')).default;
  msg     = msg[params.msg] || msg['congrats'];
  
  const { animation } = await import(`./animations/${msg.animation}.js`);
  
  msg = msg.message[params.lang] || msg.message['en'] || msg.message['fr'];
  msg = [].concat(msg).map((m) => m.replace(/{(\w+)}/g, (m, g) => params[g] || m));
  animation(msg, c);
})()