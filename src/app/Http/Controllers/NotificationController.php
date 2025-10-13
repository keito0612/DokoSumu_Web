<?php

namespace App\Http\Controllers;

use App\Consts\NotificationType;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class NotificationController extends Controller
{
    private function user(): User{
        return Auth::user();
    }
    public function getNotifications()
    {
        $this->user()->notifications->markAsRead();
         // ページネーション付きで通知を取得
        $notificationsPaginated = $this->user()->notifications()->paginate(15);
        // 各通知の data を整形
        $items = collect($notificationsPaginated->items())->map(function ($notification) {
            $data = $notification->data;
            return [
                'id' => $notification->id,
                'title' => $data['title'] ?? '通知',
                'content' => $data['content'] ?? '',
                'liked_by_user' => $data['liked_by_user'] ?? null,
                'time' => $notification->created_at->diffForHumans(),
                'type' => $data['type'] ?? NotificationType::POST,
                'read_at' => $notification->read_at,
            ];
        });

        return response()->json([
            'notifications' => $items,
            'current_page' => $notificationsPaginated->currentPage(),
            'last_page' => $notificationsPaginated->lastPage(),
            'per_page' => $notificationsPaginated->perPage(),
            'total' => $notificationsPaginated->total(),
        ], 200);
    }

    public function detail($id)
    {
        $notification =  $this->user()->notifications()->find($id);
        $data = $notification->data;
        $formattedNotification = [
            'id' => $notification->id,
            'title' => $data['title'] ?? '通知',
            'content' => $data['content'] ?? '',
            'userImage' => $data['userImage'] ?? null,
            'liked_by_user' => $data['liked_by_user'] ?? null,
            'time' => $notification->created_at->diffForHumans(),
            'type' => $data['type'] ?? NotificationType::POST,
            'read_at' => $notification->read_at,
        ];
        return response()->json([
            'notification' => $formattedNotification
        ], 200);
    }


    public function unreadCount()
    {
        $count = $this->user()->unreadNotifications->count();

        return response()->json([
            'unread_count' => $count,
        ], 200);
    }
    function allDeleteNotification()
    {
        try{
            DB::beginTransaction();
            $this->user()->notifications()->delete();
            DB::commit();
            return response()->json(
            [
                    'message' => 'all delete notifications'
                ],201
            );
        }catch(Exception $e){
            DB::commit();
            return response()->json(
                [
                    'message' => $e->getMessage()
                ],500
            );
        }
    }

    function deleteNotification($id)
    {
        try{
            DB::beginTransaction();
            $this->user()->notifications()->find($id)->delete();
            DB::commit();
            return response()->json(
            [
                    'message' => 'delete notification'
                ],201
            );
        }catch(Exception $e){
            DB::commit();
            return response()->json(
                [
                    'message' => $e->getMessage()
                ],500
            );
        }
    }

}
