import { CBV } from './schemas.ts';

async function store_new_cbv_in_db(
	_obj_data: CBV,
	_api_endpoint: string,
): Promise<void> {
	const mutation = `
    mutation{
    	store_cbv(
        cbv: {
    	  	title: ${JSON.stringify(_obj_data.title)}
          short_description: ${JSON.stringify(_obj_data.short_description)}
      		cbv_id: ${JSON.stringify(_obj_data.cbv_id)}
    	  	blockchain: ${JSON.stringify(_obj_data.blockchain)}
     			version_affected: ${JSON.stringify(_obj_data.version_affected)}
      		component: ${JSON.stringify(_obj_data.component)}
   		  	severity: ${JSON.stringify(_obj_data.severity)}
     			vulnerability_type: ${JSON.stringify(_obj_data.vulnerability_type)}
      		details: ${JSON.stringify(_obj_data.details)}
    	  	recommendation: ${JSON.stringify(_obj_data.recommendation)}
      		references: ${JSON.stringify(_obj_data.references)}
      		labels: ${JSON.stringify(_obj_data.labels)}
    	  	tests: ${JSON.stringify(_obj_data.tests)}
          aditional_comments: ${JSON.stringify(_obj_data.aditional_comments)}
          credits: ${JSON.stringify(_obj_data.credits)}
          created_at: ${JSON.stringify(_obj_data.created_at)}
          updated_at: ${JSON.stringify(_obj_data.updated_at)}
          api_key: ${JSON.stringify(_obj_data.api_key)}
		    }
      )
    }
`;
	console.log("attempt to save in db with")

	try {
		const _fetch = await fetch(_api_endpoint, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ mutation }),
		});
    const data = await _fetch.json()
    const response = JSON.stringify(data)
    console.log(response);
		if (response.match(/errors/)) {
			throw new Error(response);
		}
	} catch (error) {
		console.log(error);
		// make GH action fail when CBV cannot be save in DB
		Deno.exit(1);
	}
}

export { store_new_cbv_in_db };
