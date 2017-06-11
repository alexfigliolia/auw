App.icons({
  // iOS
  'iphone': 'resources/iOS/resources/icons/Icon-60.png',
  'iphone_2x': 'resources/iOS/resources/icons/Icon-60@2x.png',
  'iphone_3x': 'resources/iOS/resources/icons/Icon-60@3x.png',
  'ipad': 'resources/iOS/resources/icons/Icon-76.png',
  'ipad_2x': 'resources/iOS/resources/icons/Icon-76@2x.png',

  // Android
  'android_ldpi': 'resources/Android/res/drawable-ldpi/icon.png',
  'android_mdpi': 'resources/Android/res/drawable-mdpi/icon.png',
  'android_hdpi': 'resources/Android/res/drawable-hdpi/icon.png',
  'android_xhdpi': 'resources/Android/res/drawable-xhdpi/icon.png'
});

App.launchScreens({
  // iOS
  'iphone': 'resources/iOS/resources/splash/Default.png',
  'iphone_2x': 'resources/iOS/resources/splash/Default.png',
  'iphone5': 'resources/iOS/resources/splash/Default.png',
  'iphone6': 'resources/iOS/resources/splash/Default.png',
  'iphone6p_portrait': 'resources/iOS/resources/splash/Default.png',
  'iphone6p_landscape': 'resources/iOS/resources/splash/Default.png',

  'ipad_portrait': 'resources/iOS/resources/splash/Default.png',
  'ipad_portrait_2x': 'resources/iOS/resources/splash/Default.png',
  'ipad_landscape': 'resources/iOS/resources/splash/Default.png',
  'ipad_landscape_2x': 'resources/iOS/resources/splash/Default.png',

  // Android
  'android_ldpi_portrait': 'resources/Android/res/splash/screen.png',
  'android_ldpi_landscape': 'resources/Android/res/splash/screen.png',
  'android_mdpi_portrait': 'resources/Android/res/splash/screen.png',
  'android_mdpi_landscape': 'resources/Android/res/splash/screen.png',
  'android_hdpi_portrait': 'resources/Android/res/splash/screen.png',
  'android_hdpi_landscape': 'resources/Android/res/splash/screen.png',
  'android_xhdpi_portrait': 'resources/Android/res/splash/screen.png',
  'android_xhdpi_landscape': 'resources/Android/res/splash/screen.png'
});

App.appendToConfig(`<platform name="ios">
    <config-file platform="ios" target="*-Info.plist" parent="NSPhotoLibraryUsageDescription">
      <string>We do not need to access your library</string>
    </config-file>
    <config-file platform="ios" target="*-Info.plist" parent="NSCameraUsageDescription">
      <string>Your camera will scan barcodes and advance you along your punchcard</string>
    </config-file>
    <config-file parent="UIStatusBarHidden" platform="ios" target="*-Info.plist">
      <true/>
	  </config-file>
	  <config-file parent="UIViewControllerBasedStatusBarAppearance" platform="ios" target="*-Info.plist">
	    <false/>
	  </config-file>
  </platform>`);