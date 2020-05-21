package com.mrdraper;

import com.facebook.react.ReactActivity;
 import com.facebook.react.ReactActivityDelegate;
 import com.facebook.react.ReactRootView;
 import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import org.devio.rn.splashscreen.SplashScreen; // Import this.

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "MrDraper";
  }
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    SplashScreen.show(this);
    return new ReactActivityDelegate(this, getMainComponentName()) {
     @Override
      protected ReactRootView createRootView() {
      return new RNGestureHandlerEnabledRootView(MainActivity.this);
     }
    };
  }
  @Override
  public void onBackPressed() {
    // super.onBackPressed(); commented this line in order to disable back press
    //Write your code here
    // Toast.makeText(getApplicationContext(), "Back press disabled!", Toast.LENGTH_SHORT).show();
  }
}
