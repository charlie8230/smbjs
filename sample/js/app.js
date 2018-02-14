
/*  

*/
console.log(typeof T3);
var SNI = {};
SMBJS.app.addModule('gigya',(context)=>{console.log(context); return{behaviors:['logger'],init(){
  console.log(context.getConfig());
  setTimeout(()=>{
    context.broadcast('hello',context.getConfig());
  },1000);
}}});
SMBJS.app.addModule('gigya-login',(context)=>{
  let el = context.getElement();
  return {
    messages: ['hello'],
    onmessage(msg, data){
      console.log(msg, data);
      let $el = $(el);
      $el.html('Hi');
    }
  };
});
SMBJS.app.addBehavior('logger',(context)=>{ return {init(){
  console.log('I\'m a behavior!', context);
  let svc = context.getService('string');
  let config = context.getConfig();
  console.log(svc, config);
  svc.run();
}}});
SMBJS.app.addService('string',(application)=>{
  return { run(){
    console.log('I\'m a service!', application);
  }}
});
SMBJS.app.init();