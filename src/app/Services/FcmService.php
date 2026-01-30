<?php

namespace App\Services;

use Kreait\Firebase\Factory;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;
use Illuminate\Support\Facades\Log;

class FcmService
{
    private $messaging;

    public function __construct()
    {
        $credentialsPath = config('services.firebase.credentials');

        if ($credentialsPath && file_exists($credentialsPath)) {
            $factory = (new Factory)->withServiceAccount($credentialsPath);
            $this->messaging = $factory->createMessaging();
        }
    }

    /**
     * @param string $fcmToken
     * @param array<string, mixed> $payload
     */
    public function sendNotification(string $fcmToken, array $payload): bool
    {
        if (!$this->messaging) {
            Log::warning('FCM messaging is not configured');
            return false;
        }

        try {
            $notification = Notification::create(
                $payload['title'] ?? '',
                $payload['content'] ?? ''
            );

            $message = CloudMessage::withTarget('token', $fcmToken)
                ->withNotification($notification)
                ->withData([
                    'type' => $payload['type'] ?? '',
                    'url' => $payload['url'] ?? '',
                    'liked_by_user_id' => isset($payload['liked_by_user']) ? (string) $payload['liked_by_user']->id : '',
                ]);

            $this->messaging->send($message);

            return true;
        } catch (\Exception $e) {
            Log::error('FCM send error: ' . $e->getMessage());
            return false;
        }
    }
}
