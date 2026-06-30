const { NetlifyIntegrationClient } = require("@netlify/blobs");

exports.handler = async function(event) {
  const headers = {"Access-Control-Allow-Origin":"*","Content-Type":"application/json"};
  if(event.httpMethod==="OPTIONS") return {statusCode:200,headers,body:""};
  try {
    const data = JSON.parse(event.body);
    const key = "coachee-" + Date.now();
    const store = getStore({
      name: "eneagrama",
      siteID: process.env.SITE_ID,
      token: process.env.NETLIFY_API_TOKEN,
    });
    await store.setJSON(key, data);
    return {statusCode:200,headers,body:JSON.stringify({ok:true})};
  } catch(e){
    return {statusCode:500,headers,body:JSON.stringify({error:e.message})};
  }
};
