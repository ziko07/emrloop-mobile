export class Message {
    id: number;
    group_id: number;
    receipt_type: string;
    recipient: string;
    title: string;
    content: string;
    attachment: string | ArrayBuffer;
    question: string;
    answer_a: string;
    answer_b: string;
    answer_c: string;
    answer_d: string;
    answer: string;
}
