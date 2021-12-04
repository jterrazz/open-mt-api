enum PaymentStatus {
    accepted,
    refused,
    waiting,
}

class PaymentRequest {
    private userSenderId: string;
    private userReceiverId: string;
    private message: string;
    private accountId?: string;
    private accountIban?: string;
    private status: PaymentStatus;
}
