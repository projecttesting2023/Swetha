import React,{useState} from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

export default function AnimatingLoader({ navigation }) {
    const [isLoading, setIsLoading] = useState(true)
    return (
        <AnimatedLoader
            visible={isLoading}
            overlayColor="rgba(255,255,255,1)"
            animationStyle={styles.lottie}
            source={require("../assets/loader/loader.json")}
            speed={1}
        />
    )
}

const styles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100,
    },
});

