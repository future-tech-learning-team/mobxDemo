package com.mobxdemo;

import android.app.ActivityManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.os.IBinder;
import android.os.Message;
import android.util.Log;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by shiyunjie on 2018/1/4.
 */

public class Service1 extends Service{
    private Timer timer = null;
    private SimpleDateFormat sdf = null;
    private int runningMin = 60;// 运行间隔（分钟）

    @Override
    public void onCreate() {
        super.onCreate();
        //TODO do some thing what you want..
        // 定时 获取系统时间 ，1秒后开始执行，n分钟检查
        consolePrint();
    }

    public void consolePrint(){
       boolean b =  isAppRunning(this.getApplicationContext(), "com.mobxdemo89");
        Log.e("mobxDemo","com.mobxdemo89 is running" + b );

        Intent mainActivityIntent = new Intent(this.getApplicationContext(), MainActivity.class);  // 要启动的Activity
            mainActivityIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            this.getApplicationContext().startActivity(mainActivityIntent);

        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        consolePrint();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    /**
     * 方法描述：判断某一应用是否正在运行
     *
     * @param context     上下文
     * @param packageName 应用的包名
     * @return true 表示正在运行，false表示没有运行
     */
    public static boolean isAppRunning(Context context, String packageName) {
        boolean isAppRunning = false;
        ActivityManager am = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningTaskInfo> list = am.getRunningTasks(100);
        if (list.size() <= 0) {
            return false;
        }
        for (ActivityManager.RunningTaskInfo info : list) {
            if (info.baseActivity.getPackageName().equals(packageName)) {
                return true;
            }
        }
        return false;
    }
}