<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{ $title }}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:'Helvetica Neue',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:30px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.1);">

                    <!-- ヘッダー -->
                    <tr>
                        <td style="background-color:#4CAF50;padding:20px;text-align:center;color:#fff;font-size:20px;font-weight:bold;">
                            {{ config('app.name') }}
                        </td>
                    </tr>

                    <!-- 本文 -->
                    <tr>
                        <td style="padding:30px;color:#333;font-size:15px;line-height:1.8;">
                            <h2 style="margin-top:0;color:#333;font-size:22px;">{{ $title }}</h2>

                            <p style="margin:15px 0;font-size:16px;">
                                {{ $content }}
                            </p>

                            @if (!empty($url))
                                <p style="margin:25px 0;text-align:center;">
                                    <a href="{{ $url }}" style="background:#4CAF50;color:#fff;text-decoration:none;padding:12px 25px;border-radius:6px;font-size:16px;display:inline-block;">
                                        詳細を見る
                                    </a>
                                </p>
                            @endif
                        </td>
                    </tr>

                    <!-- フッター -->
                    <tr>
                        <td style="background-color:#fafafa;padding:20px;text-align:center;color:#999;font-size:12px;">
                            このメールは {{ config('app.name') }} システムから自動送信されています。<br>
                            &copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>

