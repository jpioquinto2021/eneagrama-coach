exports.handler = async function(event) {
  const headers = {"Access-Control-Allow-Origin":"*","Content-Type":"application/json"};
  if(event.httpMethod==="OPTIONS") return {statusCode:200,headers,body:""};
  try {
    const url = process.env.APPS_SCRIPT_URL;
    console.log("URL configurada:", url ? "SI" : "NO - FALTA LA VARIABLE");
    const res1 = await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:event.body,redirect:"manual"});
    console.log("Estado respuesta:", res1.status);
    const loc = res1.headers.get("location");
    console.log("Redireccion a:", loc ? "SI hay redirect" : "NO hay redirect");
    if(loc){
      const res2 = await fetch(loc,{method:"POST",headers:{"Content-Type":"application/json"},body:event.body});
      console.log("Estado redirect:", res2.status);
    }
    return {statusCode:200,headers,body:JSON.stringify({ok:true})};
  } catch(e){
    console.log("ERROR:", e.message);
    return {statusCode:500,headers,body:JSON.stringify({error:e.message})};
  }
};
