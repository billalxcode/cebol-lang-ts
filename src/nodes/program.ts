import {
	CebolNodeNameEnum,
	type CebolBaseNodeInterface,
	type CebolProgramNodeInterface,
} from "@/nodes/types";

export class CebolProgramNode implements CebolProgramNodeInterface {
	public name = CebolNodeNameEnum.PROGRAM_NODE;
	public readonly programName: string;
	public readonly bodies: CebolBaseNodeInterface[];
	public readonly params: string[] = [];

	constructor(
		_name: string,
		_bodies: CebolBaseNodeInterface[],
		_params: string[] = [],
	) {
		this.programName = _name;
		this.bodies = _bodies;
		this.params = _params;
	}

	public toObject(): object {
		return {
			name: this.name,
			programName: this.programName,
			params: this.params,
			bodies: this.bodies.map((node) => node.toObject()),
		};
	}

	public toString(): string {
		return `${this.name}(${this.programName}, [${this.bodies.map((node) => node.toString()).join(", ")}])`;
	}
}
