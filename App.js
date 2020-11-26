import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Modal,
  Image,
} from 'react-native';

import {
  CountdownCircleTimer
} from 'react-native-countdown-circle-timer';

import SoundPlayer from 'react-native-sound-player';

const renderTime = ({ remainingTime }) => {
    var minutes = Math.floor(remainingTime / 60)
    var seconds = remainingTime % 60
    var Time = '';
    if(minutes < 10) minutes =`0${minutes}`
    if(seconds < 10) seconds =`0${seconds}`
    Time=`${minutes}:${seconds}`
  if (remainingTime === 0) {
    return <Text>쉬는 시간 종료</Text>;
  }

  return (
    <React.Fragment>
      <Text>Remaining</Text>
      <Text style={{fontSize:20, fontWeight:'bold'}}>{Time}</Text>
      <Text>seconds</Text>
      </React.Fragment>
  );
};

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [key, setKey] = useState(0);
  const [sec, setSec] = useState(40);
  const [didSet,setDidSet] = useState(0);
  const [start, setStart] = useState(false);

  const nextKey = () => {
    setKey((prevKey) => prevKey + 1)
  }
  const whistle = () => {
    try{
      SoundPlayer.playSoundFile('sound','wav');
      console.log('sound on');
    } catch(Error){
      console.log('cannot play sound file ERROR:',Error);
    }
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>초를 입력하세요</Text>
            <TextInput 
            style={ {height: 40,width:100, borderColor: 'gray', borderWidth: 1,marginBottom:20 }}
            onChangeText={text => {setSec(Number(text))}}
            keyboardType="number-pad"
            ></TextInput>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);  
                nextKey();        
              }}
            >
              <Text style={styles.textStyle}>확인</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <Text style={{fontSize:40, fontWeight:'bold'}}>🏋 ➡ {didSet}세트</Text>

      <CountdownCircleTimer
        key={key}
        onComplete={()=>{whistle();setDidSet(didSet+1); nextKey(); setStart(false); }}
        isPlaying={start}
        duration={40}
        colors={[
          ['#004777', 0.4],
          ['#F7B801', 0.4],
          ['#A30000', 0.2],
        ]}>
          {renderTime}
         </CountdownCircleTimer>

      {/* <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          alert('구현 중');
          //setModalVisible(true);
        }}
      >
      <Text style={styles.textStyle}>시간 설정</Text>
      </TouchableHighlight> */}
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setStart(true);
        }}
      >
      <Text style={styles.textStyle}>시작</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setStart(false);
        }}
      >
      <Text style={styles.textStyle}>멈춤</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setStart(false);
          nextKey();
          //시간 초기화
        }}
      >
        <Text style={styles.textStyle}>시간 초기화</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setStart(false);
          nextKey();
          setDidSet(0);//세트 초기화
        }}
      >
        <Text style={styles.textStyle}>세트 초기화</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    marginBottom: 10,
    marginTop: 10,
    width: 200,
    backgroundColor: "#004777",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default App;
