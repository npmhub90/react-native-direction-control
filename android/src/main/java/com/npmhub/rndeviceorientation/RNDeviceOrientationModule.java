package com.npmhub.rndeviceorientation;

import android.content.Context;
import android.view.OrientationEventListener;
import android.view.Surface;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class RNDeviceOrientationModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNDeviceOrientationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNDeviceOrientation";
    }

    @ReactMethod
    public void getOrientation(Callback callback) {
        final int rotation = reactContext.getCurrentActivity().getWindowManager().getDefaultDisplay().getRotation();
        String orientation = "UNKNOWN";

        switch (rotation) {
            case Surface.ROTATION_0:
                orientation = "PORTRAIT";
                break;
            case Surface.ROTATION_90:
            case Surface.ROTATION_270:
                orientation = "LANDSCAPE";
                break;
            case Surface.ROTATION_180:
                orientation = "PORTRAIT_REVERSE";
                break;
        }

        callback.invoke(null, orientation);
    }

    @ReactMethod
    public void lockToPortrait() {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
                }
            });
        }
    }

    @ReactMethod
    public void lockToLandscape() {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
                }
            });
        }
}

    @ReactMethod
    public void unlockAllOrientations() {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR);
                }
            });
        }
}


    
}
