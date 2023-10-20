async function getZones(token,accountid) {

            const apiUrl = `https://api.cloudflare.com/client/v4/zones?account.id=${accountid}&per_page=100`; //// not doing pagination 
    
            try {
                const response = await fetch(apiUrl, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const extractData = await response.json();
    
                const zoneData = [];
                let i = 0;
                while(i < extractData.result.length){
                  if(extractData.result[i].status === "active"){
                    let name = extractData.result[i].name;
                    let id = extractData.result[i].id;
                    zoneData.push(
                      {
                        name,
                       id
                      }
                    )
    
                  } 
                      i++;
    
                }
     
              //return JSON.stringify(zoneData);
              return zoneData;
            } catch (error) {
                console.error('Error fetching data:', error);
                return error;
            }
        
    
}

export {getZones}
