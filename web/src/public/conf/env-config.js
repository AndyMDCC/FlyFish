window.APP_CONFIG = (function () {
  return {
    basename: "", // 路由统一前缀，注册为微服务后必须有唯一值
    IP: "", // 后端服务IP地址
    screenEditAddress: "http://10.0.14.151:7001/web/screen/editor.html",
    screenViewAddress: "http://10.0.14.151:7001/web/screen/index.html",
    // screenEditAddress: "http://10.2.3.247:7001/web/screen/editor.html",  //测试
    // screenViewAddress: "http://10.2.3.247:7001/web/screen/index.html",
    vscodeAddress: `http://${window.location.hostname}:8081`,
  };
})();
