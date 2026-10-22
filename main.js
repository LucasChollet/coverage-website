const serenity_link = document.getElementById("serenity_link");
const filter_input = document.getElementById("filter_input");
const components_list = document.getElementById("components_list");

let all_components = [];

function filter_components() {
	const regex = new RegExp(filter_input.value, "i");

	components_list.replaceChildren();
	all_components.filter(name => regex.test(name)).forEach(name => {
		const li = document.createElement("li");
		const a = document.createElement("a");
		a.setAttribute("href", `reports/${name}/index.html`);
		a.textContent = name;
		li.appendChild(a);
		components_list.appendChild(li);
	});
	
}

async function main() {
	const response = await fetch('reports/data.json');
	const data = await response.json();

	serenity_link.textContent = data.serenity_hash.slice(0, 7);
	serenity_link.setAttribute("href", `https://github.com/SerenityOS/serenity/commit/${data.serenity_hash}`);


	all_components = data.components;

	filter_components();
	filter_input.addEventListener("input", filter_components);
}

main();
