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

	const _title = issue_form.slice(issue_form.indexOf('### Title'), issue_form.indexOf('### Short description'));
	const _short_description = issue_form.slice(issue_form.indexOf('### Short description'), issue_form.indexOf('### Blockchain'));
	const _blockchain = issue_form.slice(issue_form.indexOf('### Blockchain'), issue_form.indexOf('### Version affected'));
	const _version_affected = issue_form.slice(issue_form.indexOf('### Version affected'), issue_form.indexOf('### Component'));
	const _component = issue_form.slice(issue_form.indexOf('### Component'), issue_form.indexOf('### Severity'));
	const _severity = issue_form.slice(issue_form.indexOf('### Severity'), issue_form.indexOf('### Vulnerability Type'));
	const _vulnerability_type = issue_form.slice(issue_form.indexOf('### Vulnerability Type'), issue_form.indexOf('### Details'));
	const _details = issue_form.slice(issue_form.indexOf('### Details'), issue_form.indexOf('### Recommendation'));
	const _recommendation = issue_form.slice(issue_form.indexOf('### Recommendation'), issue_form.indexOf('### References'));
	const _references = issue_form.slice(issue_form.indexOf('### References'), issue_form.indexOf('### Labels'));
	const _labels = issue_form.slice(issue_form.indexOf('### Labels'), issue_form.indexOf('### Test'));
	const _tests = issue_form.slice(issue_form.indexOf('### Test'), issue_form.indexOf('### Aditional comments'));
	const _aditional_comments = issue_form.slice(issue_form.indexOf('### Aditional comments'), issue_form.indexOf('### Credit to'));
	const _credits = issue_form.slice(issue_form.indexOf('### Credit to'), issue_form.indexOf('### Code of Conduct'));

	const form_object = {
		title: _title.replace(/### Title/, '').trim(),
		short_description: _short_description.replace(/### Short description/, '').trim(),
		cbv_id: new_cbv_code_name,
		blockchain: _blockchain.replace(/### Blockchain/, '').trim(),
		version_affected: _version_affected.replace(/### Version affected/, '').trim(),
		component: _component.replace(/### Component/, '').trim(),
		severity: _severity.replace(/### Severity/, '').trim(),
		vulnerability_type: _vulnerability_type.replace(/### Vulnerability Type/, '').trim(),
		details: _details.replace(/### Details/, '').trim(),
		recommendation: _recommendation.replace(/### Recommendation/, '').trim(),
		references: _references.replace(/### References/, '').replace(/_No response_/, '').trim(),
		labels: _labels.replace(/### Labels/, '').replace(/_No response_/, '').trim(),
		tests: _tests.replace(/### Test/, '').replace(/_No response_/, '').trim(),
		aditional_comments: _aditional_comments.replace(/### Aditional comments/, '').replace(/_No response_/, '').trim(),
		credits: _credits.replace(/### Credit to/, '').trim(),
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

