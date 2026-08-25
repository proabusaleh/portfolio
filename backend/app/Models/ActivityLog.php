<?php

namespace App\Models;

use App\Events\ActivityLogged;
use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    protected $fillable = ['user_id', 'action', 'module', 'target', 'details', 'ip'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function log($action, $module, $target, $details = null)
    {
        $log = static::create([
            'user_id' => auth()->id(),
            'action'  => $action,
            'module'  => $module,
            'target'  => $target,
            'details' => $details,
            'ip'      => request()->ip(),
        ]);

        // Broadcast in real-time
        broadcast(new ActivityLogged($log))->toOthers();

        return $log;
    }
}
