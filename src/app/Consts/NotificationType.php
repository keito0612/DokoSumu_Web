<?php

namespace App\Consts;

class NotificationType
{
    // 投稿関連
    public const POST = 'post';

    // いいねー関連
    public const LIKE = 'like';

    // イベント関連
    public const NOTICE = 'notice';

    /**
     * すべてのタイプを返す
     *
     * @return array<string>
     */
    public static function all(): array
    {
        return [
            self::POST,
            self::LIKE,
            self::NOTICE
        ];
    }

    /**
     * 指定されたタイプが有効かどうかを確認
     *
     * @param string|null $type
     * @return bool
     */
    public static function isValid(?string $type): bool
    {
        return in_array($type, self::all(), true);
    }
}

