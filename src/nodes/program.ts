import type {
	CebolBaseNodeInterface,
	CebolProgramNodeInterface,
} from "@/nodes/types";

export class CebolProgramNode implements CebolProgramNodeInterface {
	public readonly name: string;
	public readonly bodies: CebolBaseNodeInterface[];
	public readonly params: string[] = [];

	constructor(
		_name: string,
		_bodies: CebolBaseNodeInterface[],
		_params: string[] = [],
	) {
		this.name = _name;
		this.bodies = _bodies;
		this.params = _params;
	}

	public toObject(): object {
		return {
			type: "CebolProgramNode",
			name: this.name,
			params: this.params,
			bodies: this.bodies.map((node) => node.toObject()),
		};
	}

	public toString(): string {
		return `CebolProgramNode(${this.name}, [${this.bodies.map((node) => node.toString()).join(", ")}])`;
	}
}
