exports.handler = async function(event) {
  const headers = {"Access-Control-Allow-Origin":"*","Content-Type":"application/json"};
  if(event.httpMethod==="OPTIONS") return {statusCode:200,headers,body:""};
  try {
    await fetch(process.env.APPS_SCRIPT_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:event.body,redirect:"follow"});
    return {statusCode:200,headers,body:JSON.stringify({ok:true})};
  } catch(e) {
    return {statusCode:500,headers,body:JSON.stringify({error:e.message})};
  }
};
