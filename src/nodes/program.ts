import type { CebolProgramNodeInterface } from "@/nodes/types";

export class CebolProgramNode implements CebolProgramNodeInterface {
    public readonly name: string;
    public readonly body: any[];

    constructor(_name: string, _body: any[]) {
        this.name = _name;
        this.body = _body;
    }

    public toString(): string {
        return `CebolProgramNode(${this.name}, [${this.body.map((node) => node.toString()).join(", ")}])`;
    }
}