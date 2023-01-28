import { ensureDirSync } from 'https://deno.land/std@0.171.0/fs/mod.ts';
import { CBV } from './schemas.ts';

async function store_new_cbv_in_folder(
	_new_cbv_code_name: string,
	_cbv_ready_to_be_stored: string,
	_cbv_obj: CBV,
) {
	const get_subfolders: Array<string> = _cbv_obj.blockchain.split(', ');

	// create any blockchain folder that doesn't exist
	for await (const subfolder of get_subfolders) {
		const folder_path = `${Deno.cwd()}/issues/${subfolder}`;
		ensureDirSync(folder_path);
	}
	// store CBV in all it's corresponding directories
	for await (const subfolder of get_subfolders) {
		const sub_folder_path = `${Deno.cwd()}/issues/${subfolder}`;
		await Deno.writeTextFile(
			`${sub_folder_path}/${_new_cbv_code_name}.md`,
			_cbv_ready_to_be_stored,
		);
	}
}

export { store_new_cbv_in_folder };
