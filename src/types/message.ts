export default interface Message {
    role: "user" | "assistant";
    content: string;
}