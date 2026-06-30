exports.handler = async function(event) {
  const headers = {"Access-Control-Allow-Origin":"*","Content-Type":"application/json"};
  if(event.httpMethod==="OPTIONS") return {statusCode:200,headers,body:""};
  try {
    const url = process.env.APPS_SCRIPT_URL + "?data=" + encodeURIComponent(event.body);
    const res = await fetch(url);
    const text = await res.text();
    console.log("Apps Script responde:", text);
    return {statusCode:200,headers,body:JSON.stringify({ok:true})};
  } catch(e){
    console.log("ERROR:", e.message);
    return {statusCode:500,headers,body:JSON.stringify({error:e.message})};
  }
};
