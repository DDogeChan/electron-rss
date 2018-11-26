var blocked = ["google.com", "t66y.com", "site3.com"];
var proxyServer = "SOCKS5 127.0.0.1:1080";
function FindProxyForURL(url, host) {
  if (shExpMatch(url, "*t66y*")) return proxyServer;
  var shost = host.split(".").reverse();
  shost = shost[1] + "." + shost[0];
  for (var i = 0; i < blocked.length; i++) {
    if (shost == blocked[i]) return proxyServer;
  }
  return "DIRECT";
}
