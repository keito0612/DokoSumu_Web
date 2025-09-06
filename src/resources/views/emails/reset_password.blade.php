<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>パスワード再設定のご案内</title>
</head>
<body style="font-family: sans-serif; line-height: 1.6; color: #333;">
    <p>{{ config('app.name') }} をご利用いただきありがとうございます。</p>

    <p>
        ご登録中の<strong>パスワードを再設定</strong>するためのリンクをお送りします。<br>
        下のボタンをクリックして、手続きを完了してください。
    </p>

    <p style="margin: 20px 0;">
        <a href="{{ $resetUrl }}"
            style="display:inline-block;padding:12px 24px;background:#38a169;color:white;
                dtext-decoration:none;border-radius:6px;font-size:16px;">
            パスワードを再設定する
        </a>
    </p>

    <p>⚠️ このリンクの有効期限は <strong>{{ $expireTime }}分</strong> です。<br>
       期限が切れた場合は、もう一度再設定のお手続きをお願いいたします。</p>

    <p>
        もしこのメールにお心当たりがない場合は、操作を行わずにこのメールを削除してください。<br>
        ご不明な点がありましたら、下記サポートまでお気軽にご連絡ください。
    </p>

    <hr style="margin:20px 0;">

    <p>
        {{ config('app.name') }} サポートチーム<br>
        お問い合わせ: <a href="mailto:{{ config('mail.from.address') }}">{{ config('mail.from.address') }}</a>
    </p>
</body>
</html>
