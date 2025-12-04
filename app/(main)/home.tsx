import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Typo from '@/components/Typo'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors } from '@/constants/theme'
import Button from '@/components/Button'
import { useAuth } from '@/contexts/authContext'
import { testSocket } from '@/socket/socketEvents'

const Home = () => {
    const { signOut } = useAuth();

    // useEffect(() => {
    //     testSocket(testSocketCallbackHandler);
    //     testSocket(null);

    //     return () => {
    //         testSocket(testSocketCallbackHandler, true);
    //     }
    // }, []);

    // const testSocketCallbackHandler = (data: any) => {
    //     console.log("testSocketCallbackHandler", data);
    // }

    const handleLogout = async () => {
        await signOut()
    }
  return (
    <ScreenWrapper>
      <Typo color={colors.white}>home</Typo>

      <Button onPress={handleLogout}>
        <Typo>Logout</Typo>
      </Button>
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({})