import { getZones } from "./extractzones";
import { getDnsRecords } from "./extractdnsrecords";
import html  from "./index.html";

export default {
    async fetch(request, env, ctx) {
        if (request.method === "GET") {
            return new Response(html,{headers:{"content-type":"text/html"}})
        }
        const url = new URL(request.url);

        if (request.method === "POST" && url.pathname === "/api/submit")  {
            const formData = await request.formData();
            const token = formData.get("token");
            const accountid = formData.get("accountid")
            const zonesExtracted =await  getZones(token, accountid)
            const dnsDatacsv = await getDnsRecords(token, zonesExtracted)
            const headers = new Headers({
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename=data.csv'
              });
            
              // Create the response
              const response = new Response(dnsDatacsv, {
                status: 200,
                headers: headers
              });
            return response;
        }


        
    },

};
