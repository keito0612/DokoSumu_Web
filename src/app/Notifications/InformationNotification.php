<?php

namespace App\Notifications;

use App\Services\FcmService;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class InformationNotification extends Notification
{
    use Queueable;

    /** @var array<string,mixed> 通知内容 */
    protected array $payload;

    /**
     * @param  array<string,mixed> $payload 例) ['title' => '…', 'body' => '…', 'url' => '…']
     */
    public function __construct(array $payload)
    {
        $this->payload = $payload;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        // いいね通知の場合はメールを送らない（プッシュ通知とデータベース保存のみ）
        if (($this->payload['type'] ?? null) === \App\Consts\NotificationType::LIKE) {
            return ['database'];
        }
        return ['mail', 'database'];
    }

    /**
     * Send FCM push notification.
     */
    public function sendFcmNotification(object $notifiable): void
    {
        if (empty($notifiable->fcm_token)) {
            return;
        }

        $fcmService = app(FcmService::class);
        $fcmService->sendNotification($notifiable->fcm_token, $this->payload);
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject($this->payload['title'])
            ->markdown('emails.notification', [
                'title'   => $this->payload['title'],
                'content' => $this->payload['content'],
                'url'     => $this->payload['url'] ?? null,
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'date' => $this->payload['date'] ?? now()->toDateString(),
            'title' => $this->payload['title'],
            'content' => $this->payload['content'],
            'liked_by_user' => $this->payload['liked_by_user'] ?? null,
            'type' => $this->payload['type']
        ];
    }
}
