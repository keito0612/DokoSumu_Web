<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InformationNotification extends Notification
{
    use Queueable;
    /** @var array<string,mixed> 通知内容 */
    protected array $payload;

    /**
     * Create a new notification instance.
     */
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
        return ['mail','database'];
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
            'date' =>$this->payload['date'] ?? now()->toDateString(),
            'title' => $this->payload['title'],
            'content' => $this->payload['content'],
            'liked_by_user' => $this->payload['liked_by_user'] ?? null,
            'type' => $this->payload['type']
        ];
    }
}
