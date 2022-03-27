import React, {useState, useRef, useCallback} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

const Welcome = () => {
  const exampleItems = [
    {
      title: 'SwaPH',
      text: 'Shop for the fairest prices!',
      image: require('../assets/imgs/Welcome1.png'),
    },
    {
      title: 'SwaPH',
      text: 'Earn back by selling unwanted items!',
      image: require('../assets/imgs/Welcome2.png'),
    },
    {
      title: 'SwaPH',
      text: 'Shop at home with ease!',
      image: require('../assets/imgs/Welcome3.png'),
    },
  ];
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState(exampleItems);
  const ref = useRef(null);

  const renderItem = useCallback(
    ({item, index}) => (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.text}</Text>
        <Image
          style={{width: 350, height: 350, marginTop: 50, marginBottom: 50}}
          source={item.image}
        />
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        layout="default"
        data={carouselItems}
        sliderWidth={350}
        sliderHeight={20}
        itemWidth={350}
        itemHeight={20}
        renderItem={renderItem}
        loop={true}
        autoplay={true}
        style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.push('LoginStack')}>
        <Text style={{color: '#fff'}}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#EB805F',
    fontSize: 35,
    fontWeight: 'bold',
  },
  description: {
    color: '#7C7B7C',
    fontSize: 15,
    fontWeight: '300',
  },
  button: {
    flex: 0.07,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#FD7644',
    width: 300,
    marginVertical: 50,
    borderRadius: 20,
  },
});

export default Welcome;
