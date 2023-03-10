import { KeyStack } from 'https://deno.land/std@0.170.0/crypto/mod.ts';

import { breakdown_form } from './src/breakdown_form.ts';
import { get_new_cbv_code_name } from './src/get_new_cbv_code_name.ts';
import { prettify } from './src/prettify.ts';
import { store_new_cbv_in_db } from './src/store_new_cbv_in_db.ts';
import { store_new_cbv_in_folder } from './src/store_new_cbv_in_folder.ts';

main();
async function main() {
	const data_given_by_gh: Array<string> = Deno.args;
	/*
	 * First argument is going to be an array containing the labels
	 * Second argument is going to be the gh tocken
	 * Third argument is the API v1 GraphQL endpoint to store the CBV
	 * Forth argument is going to be the first Key to validate the store endpoint
	 * Fifth argument is going to be the second Key to validate the store endpoint
	 * Six argument is going to be the issue number
	 */

	// LABELS
	const issue_labels = data_given_by_gh[0];
	const is_accepted = issue_labels.match(/Accepted/);
	if (!is_accepted) {
		// Because this exit here, no changes are made, and no code is ever pushed
		console.log(data_given_by_gh);
		Deno.exit(0);
	}

	//FETCH
	const issue_number = Number(data_given_by_gh[5])
	const response = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${data_given_by_gh[1]}`,
		},
		body: JSON.stringify({
			query: `query{
				repository(owner: "bamlpc", name: "common-blockchain-vulnerabilities") {
					issue(number: ${issue_number}) {
						body
					}
				}
			}`,
		}),
	});
	const json = await response.json();

	// BODY
	const raw_form_data = json.data.repository.issue.body;

	// KEYS
	const keyStack = new KeyStack([data_given_by_gh[2]]);
	const digest = await keyStack.sign(data_given_by_gh[3]);
	const api_key = digest;

	// END POINT
	const api_endpoint = data_given_by_gh[4];

	// create a new cbv code
	const new_cbv_code_name = await get_new_cbv_code_name();
	// extract informatio from form string into an object
	const brokedown_form = breakdown_form(
		raw_form_data,
		new_cbv_code_name,
		api_key,
	);
	// create a beautiful .md file to be store in issues
	const cbv_ready_to_be_stored = prettify(brokedown_form);

	// create new cbv filename

	const cbv_file_name = `[${new_cbv_code_name}] ${brokedown_form.title}`;
	// Store the new CBV in Issues folder
	await store_new_cbv_in_folder(
		cbv_file_name,
		cbv_ready_to_be_stored,
		brokedown_form,
	);

	await store_new_cbv_in_db(brokedown_form, api_endpoint);

	/*
	 * Log the CBV code to grab it in github actions
	 */
	console.log(`>${new_cbv_code_name}<`);
	console.log('end of script');
	return new_cbv_code_name;
}
