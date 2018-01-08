package com.mobxdemo;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;

/**
 * Created by shiyunjie on 2018/1/4.
 */

public class Service2 extends Service {

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return Service.START_NOT_STICKY;
    }
}