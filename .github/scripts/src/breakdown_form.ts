import { CBV } from './schemas.ts';
/*
 * Recieve issues form from github and output an object
 */
function breakdown_form(
	issue_form: string,
	new_cbv_code_name: string,
	_api_key: string,
): CBV {
	const now = getCurrentDate();
	const split = issue_form.split('###');

	const form_object = {
		title: split[1].replace(/Title/, '').trim(),
		short_description: split[2].replace(/Short description/, '').trim(),
		cbv_id: new_cbv_code_name,
		blockchain: split[3].replace(/Blockchain/, '').trim(),
		version_affected: split[4].replace(/Version affected/, '').trim(),
		component: split[5].replace(/Component/, '').trim(),
		severity: split[6].replace(/Severity/, '').trim(),
		vulnerability_type: split[7].replace(/Vulnerability Type/, '').trim(),
		details: split[8].replace(/Details/, '').trim(),
		recommendation: split[9].replace(/Recommendation/, '').trim(),
		references: split[10].replace(/References/, '').trim(),
		labels: split[11].replace(/Labels/, '').trim(),
		tests: split[12].replace(/Test/, '').trim(),
		aditional_comments: split[13].replace(/Aditional comments/, '').trim(),
		credits: split[14].replace(/Credit to/, '').trim(),
		created_at: now,
		updated_at: '',
		api_key: _api_key,
	};
	return form_object;
}

function getCurrentDate() {
	const timeStamp = new Date().toUTCString().split(' ');
	const date = `${timeStamp[1]} ${timeStamp[2]} ${timeStamp[3]}`;
	return date;
}

export { breakdown_form };
