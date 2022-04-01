import React, {useEffect, useContext} from 'react';
import {UserContext} from '../../provider/UserProvider';
import {View} from 'react-native';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';
import {useRoute} from '@react-navigation/native';

const LiveStream = () => {
  const user = useContext(UserContext);
  const route = useRoute();
  const roomKey = route.params.roomKey;
  const jwtToken = route.params.jwtToken;
  const liveId = route.params.liveId;
  const isHost = route.params.isHost;
  useEffect(() => {
    console.log(jwtToken);
    console.log(roomKey);
    console.log(user.email);
    setTimeout(() => {
      const url = 'https://8x8.vc/' + roomKey;
      const userInfo = {
        displayName: user.fname,
        email: user.email,
      };
      let options = {};
      if (isHost) {
        options = {
          audioMuted: false,
          audioOnly: false,
          videoMuted: false,
          token: jwtToken,
        };
      } else {
        options = {
          audioMuted: false,
          audioOnly: false,
          videoMuted: true,
          token: jwtToken,
        };
      }
      const meetFeatureFlags = {
        addPeopleEnabled: true,
        calendarEnabled: true,
        callIntegrationEnabled: true,
        chatEnabled: true,
        closeCaptionsEnabled: true,
        inviteEnabled: true,
        androidScreenSharingEnabled: true,
        liveStreamingEnabled: true,
        meetingNameEnabled: true,
        meetingPasswordEnabled: true,
        pipEnabled: true,
        kickOutEnabled: true,
        conferenceTimerEnabled: true,
        videoShareButtonEnabled: true,
        recordingEnabled: true,
        reactionsEnabled: true,
        raiseHandEnabled: true,
        tileViewEnabled: true,
        toolboxAlwaysVisible: false,
        toolboxEnabled: true,
        welcomePageEnabled: false,
      };
      JitsiMeet.call(url, userInfo, options, meetFeatureFlags);
      /* Você também pode usar o JitsiMeet.audioCall (url) para chamadas apenas de áudio */
      /* Você pode terminar programaticamente a chamada com JitsiMeet.endCall () */
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      JitsiMeet.endCall();
    };
  });

  function onConferenceTerminated(nativeEvent) {
    /* Conference terminated event */
    console.log(nativeEvent);
  }

  function onConferenceJoined(nativeEvent) {
    /* Conference joined event */
    console.log(nativeEvent);
  }

  function onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
    console.log(nativeEvent);
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <JitsiMeetView
        onConferenceTerminated={e => onConferenceTerminated(e)}
        onConferenceJoined={e => onConferenceJoined(e)}
        onConferenceWillJoin={e => onConferenceWillJoin(e)}
        onnUpdated={e => {
          console.log('updated');
        }}
        style={{
          height: '90%',
          width: '100%',
        }}
      />
    </View>
  );
};

export default LiveStream;
