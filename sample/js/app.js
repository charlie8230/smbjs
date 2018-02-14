
/*  

*/
console.log(typeof T3);
SMBJS.app.addModule('gigya',(context)=>{console.log(context); return{behaviors:['logger'],init(){}}});
SMBJS.app.addBehavior('logger',(context)=>{ return {init(){
  console.log('I\'m a behavior!', context);
  let svc = context.getService('string');
  console.log(svc);
  svc.run();
}}});
SMBJS.app.addService('string',(application)=>{
  return { run(){
    console.log('I\'m a service!', application);
  }}
});
SMBJS.app.init();