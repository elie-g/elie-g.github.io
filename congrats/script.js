const prepareFontLoad = (fontList) => Promise.all(fontList.map(font => document.fonts.load(font)));

(async () => {
  const c    = document.getElementById('c');
  let params = location.search.substr(1)
    .split('&')
    .map((h) => h.split('='))
    .reduce((o, a) => ({ ...o, [a[0]]: decodeURIComponent(a[1]) }), {});
  
  let msg = (await import('./messages.js')).default;
  msg     = msg[params.msg] || msg['congrats'];
  
  //await prepareFontLoad(['Font Awesome 5 Free', 'Font Awesome 5 Brands']);
  
  const { animation } = await import(`./animations/${msg.animation}.js`);
  
  msg = msg.message[params.lang] || msg.message['en'] || msg.message['fr'];
  msg = [].concat(msg).flatMap((m) =>
      m.replace(/{([\w\-]+)}/g, (m, g) => params[g] || m)
       .replace(/{utf:([0-9A-Z]+)}/gi, (m, g) => String.fromCharCode(parseInt(g, 16)))
       .split('\n'));
  
  animation(msg, c);
})()
