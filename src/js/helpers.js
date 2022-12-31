import { TIMEOUT_SEC } from "./config.js";
const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };
export async function getJSON(url)
{
    try{
        const response= await Promise.race([fetch(url),timeout(TIMEOUT_SEC)]);
        if(!response.ok) throw new Error("Api failedd");
        return await response.json();
    }
    catch(er)
    {
        console.error(er);
        throw er;
    }
   
}
export async function sendJSON(url,uploadData)
{
    try{
        const sendApi=fetch(url,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(uploadData)
        })
        const response= await Promise.race([sendApi,timeout(TIMEOUT_SEC)]);
        const data= await response.json();
        if(!response.ok) throw new Error(data.message);
        return data;
    }
    catch(er)
    {
        throw er;
    }
   
}
