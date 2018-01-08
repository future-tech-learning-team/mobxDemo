package com.mobxdemo;

import android.app.ActivityManager;
import android.app.admin.DevicePolicyManager;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.Window;
import android.view.WindowManager;

import com.facebook.react.ReactActivity;
//import com.github.dubu.lockscreenusingservice.Lockscreen;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "mobxDemo";
    }

    public static final int FLAG_HOMEKEY_DISPATCHED = 0x80000000; //需要自己定义标志

    //    private HomeKeyLocker mHomeKeyLocker;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        //取消标题
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        //取消状态栏
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        getWindow().setFlags(FLAG_HOMEKEY_DISPATCHED, FLAG_HOMEKEY_DISPATCHED);//关键代码
        super.onCreate(savedInstanceState);
//        mHomeKeyLocker = new HomeKeyLocker();
//        mHomeKeyLocker.lock(MainActivity.this);
//        Lockscreen.getInstance(this.getApplicationContext()).startLockscreenService();

        //you have to start the service once.
//        startService(new Intent(MainActivity.this, Service1.class));
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.e("mobxDemo", "onPause");
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_HOME) {
            //屏蔽之后的操作
            Log.e("mobxDemo", "拦截到Home键");

            return true;
        } else if (keyCode == KeyEvent.KEYCODE_BACK) {
            //屏蔽之后的操作
            Log.e("mobxDemo", "拦截到返回键");

            return true;

        }
        return super.onKeyUp(keyCode, event);

    }

    @Override
    protected void onStop() {

        super.onStop();
        ActivityManager activityManager = (ActivityManager) getApplicationContext()
                .getSystemService(Context.ACTIVITY_SERVICE);
        activityManager.moveTaskToFront(getTaskId(), ActivityManager.MOVE_TASK_WITH_HOME);
        Log.e("mobxDemo", "拦截onStop");
    }

    @Override
    protected void onDestroy() {
        Log.e("mobxDemo", "拦截onDestroy");
        Intent mainActivityIntent = new Intent(this.getApplicationContext(), MainActivity.class);  // 要启动的Activity
        mainActivityIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        this.getApplicationContext().startActivity(mainActivityIntent);
        super.onDestroy();

    }
}
