import { CBV } from "./schemas.ts";

async function store_new_cbv_in_db(
  _obj_data: CBV,
  _api_endpoint: string,
): Promise<void> {
  const mutation = `
    mutation{
    	store_cbv(
        cbv: {
    	  	title: ${_obj_data.title}
          short_description: ${_obj_data.short_description}
      		cbv_id: ${_obj_data.cbv_id}
    	  	blockchain: ${_obj_data.blockchain}
     			version_affected: ${_obj_data.version_affected}
      		component: ${_obj_data.component}
   		  	severity: "${_obj_data.severity}
     			vulnerability_type: ${_obj_data.vulnerability_type}
      		details: ${_obj_data.details}
    	  	recommendation: ${_obj_data.recommendation}
      		references: ${_obj_data.references}
      		labels: ${_obj_data.labels}
    	  	tests: ${_obj_data.tests}
          aditional_comments: ${_obj_data.aditional_comments}
          credits: ${_obj_data.credits}
          created_at: ${_obj_data.created_at}
          updated_at: ${_obj_data.updated_at}
          api_key: ${_obj_data.api_key}
		    }
      )
    }
`;
  try {
    const response = await fetch(_api_endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ mutation }),
    }).then((response) => response.json());
    const stringify = JSON.stringify(response);
    if (stringify.match(/errors/)) {
      throw new Error(stringify);
    }
  } catch (error) {
    console.log(error);
    // make GH action fail when CBV cannot be save in DB
    Deno.exit(1);
  }
}

export { store_new_cbv_in_db };
