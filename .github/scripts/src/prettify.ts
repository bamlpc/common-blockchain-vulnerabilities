import { CBV } from './schemas.ts';

function prettify(form_object: CBV): string {
	const formated_cbv_as_md = `# ${form_object.title}

${form_object.short_description}

### CBV ID: ${form_object.cbv_id}
### Blockchain: ${form_object.blockchain}
### Version affected: ${form_object.version_affected}
### Component: ${form_object.component}
### Severity: ${form_object.severity}
### Vulnerability Type: ${form_object.vulnerability_type}
### Credits: ${form_object.credits}
### Last updated: ${form_object.created_at}

## Details

${form_object.details}

## Recomendations

${form_object.recommendation}

## References

${form_object.references}

### Labels: ${form_object.labels}

## Test

${form_object.tests}

## Aditional comments

${form_object.aditional_comments}
`;
	return formated_cbv_as_md.replace(/_No response_/g, '');
}

export { prettify };

