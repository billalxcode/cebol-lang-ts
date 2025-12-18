import type { CebolStringNodeInterface } from "@/nodes/types";

export class CebolStringNode implements CebolStringNodeInterface {
	public readonly value: string;

	constructor(_value: string) {
		this.value = _value;
	}

	public toObject(): object {
		return {
			type: "CebolStringNode",
			value: this.value,
		};
	}

	public toString(): string {
		return `CebolStringNode("${this.value}")`;
	}
}
