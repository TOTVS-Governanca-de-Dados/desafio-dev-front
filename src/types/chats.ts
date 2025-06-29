import Message from "./message";

export default interface Chat {
    id: string;
    name: string;
    messages: Message[];
}