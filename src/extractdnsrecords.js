async function getDnsRecords(token,zones) {
      let i = 0;
     const dnsData = [];
      while (i < zones.length) {
      const zoneid = zones[i].id;

  const apiUrl = `https://api.cloudflare.com/client/v4/zones/${zoneid}/dns_records?per_page=5000`; // not doing pagination

      try {
          const response = await fetch(apiUrl, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          const extractData = await response.json();

          let j = 0;
          while (j < extractData.result.length) {
              let zone = extractData.result[j].zone_name
              let name = extractData.result[j].name;
              let type = extractData.result[j].type;
              let proxied = extractData.result[j].proxied;
              dnsData.push(
                {zone,
                  name,
                 type,
                 proxied
                }
              )

            
                j++;

          }

      } catch (error) {
          return new Response(JSON.stringify({ error: 'Data fetch error' }));
      }
      i++;
      }
//put this in csv fortmat
      const header = Object.keys(dnsData[0]).join(',');
      const rows = dnsData.map(item => {
        return Object.values(item).map(value => {
            if (value === null || value === undefined) {
                return '""'; // Handle null or undefined values
            }
            return `"${value}"`;
        }).join(',');
      });
      
      const dnsDatacsv = [header, ...rows].join('\n');
      
///
     return dnsDatacsv


  

}
export {getDnsRecords}
