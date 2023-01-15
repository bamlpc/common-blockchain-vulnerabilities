async function get_new_cbv_code_name(): Promise<string> {
	const currentPath = `${Deno.cwd()}/issues`;
	const list_of_all_md = await get_file_names(currentPath);

	let last_cbv_added = 0;

	list_of_all_md.flat(2).forEach((file_name) => {
		const current_file_number = Number(file_name.replace(/\D/g, ''));
		if (current_file_number > last_cbv_added) {
			last_cbv_added = current_file_number;
		}
	});

	// name the next file, allways replace with current year
	const new_cbv_number = (last_cbv_added + 1).toString().slice(2);
	const current_year = (new Date()).getFullYear() - 2000;
	const new_cbv_name = `CBV-${current_year}-${new_cbv_number}`;
	return new_cbv_name;
}

/*
 * Recursive function to get all files in issues folder
 */

async function get_file_names(currentPath: string): Promise<string[]> {
	const file_names: string[] = [];

	for await (const dirEntry of Deno.readDir(currentPath)) {
		const entryPath = `${currentPath}/${dirEntry.name}`;
		file_names.push(entryPath);

		if (dirEntry.isDirectory) { //Deno lint can't process this recursion.. code worked fine.
			file_names.push(await get_file_names(entryPath));
		}
	}
	return file_names;
}

export { get_new_cbv_code_name };
