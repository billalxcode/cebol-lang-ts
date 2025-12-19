import type { CebolStringNodeInterface } from "@/nodes/types";

export class CebolStringNode implements CebolStringNodeInterface {
	public name = "CebolStringNode";
	public readonly value: string;

	constructor(_value: string) {
		this.value = _value;
	}

	public toObject(): object {
		return {
			name: this.name,
			value: this.value,
		};
	}

	public toString(): string {
		return `${this.name}("${this.value}")`;
	}
}
