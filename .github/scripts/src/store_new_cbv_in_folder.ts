import { ensureDirSync } from 'https://deno.land/std@0.171.0/fs/mod.ts';
import { CBV } from './schemas.ts';

async function store_new_cbv_in_folder(
	_new_cbv_code_name: string,
	_cbv_ready_to_be_stored: string,
	_cbv_obj: CBV,
) {
	const get_subfolders: Array<string> = _cbv_obj.blockchain.split(', ') ||
		[_cbv_obj.blockchain];

	// create any blockchain folder that doesn't exist TODO: figure it out why this work only locally
	const folders = await ensure_folder_exist(get_subfolders);
	
	// store CBV in all it's corresponding directories
	if ( folders === "success") {
		for await (const subfolder of get_subfolders) {
			const sub_folder_path = `${Deno.cwd()}/issues/${subfolder}`;
			await Deno.writeTextFile(
				`${sub_folder_path}/${_new_cbv_code_name}.md`,
				_cbv_ready_to_be_stored,
				);
			}
	} else {
		throw new Error("Cannot ensure folder structure")
	}
}

async function ensure_folder_exist(sub_folders_needed:Array<string>) {
	try {
		for await (const subfolder of sub_folders_needed) {
			const folder_path = `${Deno.cwd()}/issues/${subfolder}`;
			ensureDirSync(folder_path);
		}
		return "success"
	} catch (error) {
		throw error
	}
}

export { store_new_cbv_in_folder };
