async function main() {
	console.log("Building Cebol...");

	await Bun.build({
		entrypoints: ["./index.ts"],
		outdir: `./bin/cebol`,
		compile: true,
		target: "node",
	});

	console.log("Build complete!");
}

await main();
