package com.mobxdemo;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

/**
 * Created by shiyunjie on 2018/1/4.
 */

public class BootBroadcastReceiver extends BroadcastReceiver {
    static final String PRESENTACTION = "android.intent.action.USER_PRESENT"; // 用户解锁事件
    static final String BOOTACTION = "android.intent.action.BOOT_COMPLETED";
    @Override
    public void onReceive(Context context, Intent intent) {
        //屏蔽之后的操作
        Log.e("mobxDemo", "事件" + intent.getAction());
        if (intent.getAction().equals(BOOTACTION)) {


            Log.e("mobxDemo", "拦截到开机事件");
//            Intent mainActivityIntent = new Intent(context, MainActivity.class);  // 要启动的Activity
//            mainActivityIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//            context.startActivity(mainActivityIntent);
        }else if (intent.getAction().equals(PRESENTACTION)){
            Log.e("mobxDemo", "拦截到用户解锁事件");
//            Intent mainActivityIntent = new Intent(context, MainActivity.class);  // 要启动的Activity
//            mainActivityIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//            context.startActivity(mainActivityIntent);
        }
    }

}
