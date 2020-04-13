package com.firstapp;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

public class ToastModule extends ReactContextBaseJavaModule implements ActivityEventListener {
    //constructor
    public ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
    }


    @Override
    public String getName() {
        return "ToastModule";
    }

    @ReactMethod
    public void showToast(String currentLatitude, String currentLongitude, Double destinationLatitude, Double destinationLongitude ) {

        ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent(context, NavigationActivity.class);
        Bundle bundle = new Bundle();
        bundle.putDouble("currentLatitude", Double.parseDouble(currentLatitude));
        bundle.putDouble("currentLongitude", Double.parseDouble(currentLongitude));
        bundle.putDouble("destinationLatitude", destinationLatitude);
        bundle.putDouble("destinationLongitude", destinationLongitude);
        intent.putExtras(bundle);
       // context.startActivity(intent);
        context.startActivityForResult(intent, 123, bundle);

    }




    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if (requestCode == 123) {
            if (resultCode == Activity.RESULT_OK){
                // the code you want to execute
                //activity.finish();
                //mReactInstanceManager.onActivityResult( this, requestCode, resultCode, data );

            }
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}