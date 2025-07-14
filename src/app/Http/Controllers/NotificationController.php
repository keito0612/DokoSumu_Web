<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Exception;

class NotificationController extends Controller
{
    private function user(){
        return Auth::user();
    }
    function getNotifications(){
        $this->user()->notifications->markAsRead();
        $notifications = $this->user()->notifications->paginate(20);
        return response()->json([
            'notifications' => $notifications
        ], 201);
    }

    public function unreadCount()
    {
        $count = $this->user()->unreadNotifications->count();

        return response()->json([
            'unread_count' => $count,
        ], 200);
    }
    function allDeleteNotification(){
        try{
            $this->user()->notifications->delete();
            return response()->json(
            [
                    'message' => 'all delete notifications'
                ],201
            );
        }catch(Exception $e){
            return response()->json(
                [
                    'message' => $e->getMessage()
                ],500
            );
        }
    }

}
