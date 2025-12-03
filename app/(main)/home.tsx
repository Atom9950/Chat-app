import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Typo from '@/components/Typo'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors } from '@/constants/theme'
import Button from '@/components/Button'
import { useAuth } from '@/contexts/authContext'

const Home = () => {
    const { signOut } = useAuth()

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