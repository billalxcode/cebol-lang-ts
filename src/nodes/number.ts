import {
	CebolNodeNameEnum,
	type CebolNumberNodeInterface,
} from "@/nodes/types";

export class CebolNumberNode implements CebolNumberNodeInterface {
	public name = CebolNodeNameEnum.NUMBER_NODE;
	public readonly value: number;

	constructor(_value: number) {
		this.value = _value;
	}

	public toObject(): object {
		return {
			name: this.name,
			value: this.value,
		};
	}

	public toString(): string {
		return `${this.name}(${this.value})`;
	}
}
