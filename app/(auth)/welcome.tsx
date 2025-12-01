import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Animated, { FadeIn } from 'react-native-reanimated'
import Button from '@/components/Button'


const welcome = () => {
  return (
    <ScreenWrapper showPattern={true} bgOpacity={0.5}>
        <View style={styles.container}>
            <View style={{alignItems: "center"}}>
                <Typo size={43} fontWeight={"900"} color={colors.white}>Dialen</Typo>
            </View>

            <Animated.Image
                entering={FadeIn.duration(700).springify()}
                source={require('@/assets/images/welcome.png')}
                style={styles.welcomeImage}
                resizeMode="contain"
            />
            <View>
                <Typo size={33} fontWeight={"800"} color={colors.white}>Your Messaging App!</Typo>
            </View>
            <Button>
                <Typo size={23} fontWeight={"bold"}>Get Started</Typo>
            </Button>
        </View>
    </ScreenWrapper>
  )
}

export default welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        paddingHorizontal: spacingX._20,
        marginVertical: spacingX._10,
    },
    background:{
        flex: 1,
        backgroundColor: colors.neutral900
    },
    welcomeImage:{
       height: verticalScale(300),
       aspectRatio: 1,
       alignSelf:'center',
    }
})
