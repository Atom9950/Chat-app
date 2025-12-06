import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Typo from '@/components/Typo'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import Button from '@/components/Button'
import { useAuth } from '@/contexts/authContext'
import { getConversations, newConversation, testSocket } from '@/socket/socketEvents'
import { verticalScale } from '@/utils/styling'
import * as Icons from 'phosphor-react-native'
import { useRouter } from 'expo-router'
import Animated from 'react-native-reanimated'
import ConversationItem from '@/components/ConversationItem'
import Loading from '@/components/Loading'
import { ConversationProps, ResponseProps } from '@/types'

const Home = () => {
    const { user: currentUser, signOut } = useAuth();
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState<ConversationProps[]>([]);
     const [selectedTab, setSelectedTab] = useState(0)
    // Extract first name from full name
    const firstName = currentUser?.name?.split(' ')[0] || '';

    useEffect(()=>{
       getConversations(processConversations)
       newConversation(newConversationHandler)

       getConversations(null)

       return () => {
        getConversations(processConversations, true);
        newConversation(newConversationHandler, true);
       }
    }, [])

    const processConversations = (res: ResponseProps) => {
      // console.log("get conversations", res);
      if(res.success){
        setConversations(res.data);
      }
    }

    const newConversationHandler = (res: ResponseProps) => {
      if(res.success && res.data?.isNew) {
        setConversations((prev) => [...prev, res.data]);
      }
    }
   


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

//     const conversations = [
//   {
//     name: "Alice",
//     type: "direct",
//     lastMessage: {
//       senderName: "Alice",
//       attachment: {image: "uri"},
//       content: "Hey! Are we still on for tonight?",
//       createdAt: "2025-06-22T18:45:00Z",
//     },
//   },
//   {
//     name: "Bob",
//     type: "direct",
//     lastMessage: {
//       senderName: "Bob",
//       content: "Bro check your mail, I sent the files.",
//       createdAt: "2025-06-21T14:12:00Z",
//     },
//   },
//   {
//     name: "Sophie",
//     type: "direct",
//     lastMessage: {
//       senderName: "Sophie",
//       content: "Got your message, I'll reply in a bit!",
//       createdAt: "2025-06-23T09:28:00Z",
//     },
//   },
//   {
//     name: "Team Project",
//     type: "group",
//     lastMessage: {
//       senderName: "Riya",
//       content: "Meeting postponed to 5 PM.",
//       createdAt: "2025-06-24T11:00:00Z",
//     },
//   },
//   {
//     name: "Dad",
//     type: "direct",
//     lastMessage: {
//       senderName: "Dad",
//       content: "Call me when you're free.",
//       createdAt: "2025-06-24T07:45:00Z",
//     },
//   },
//   {
//   name: "Football Squad",
//   type: "group",
//   lastMessage: {
//     senderName: "Arjun",
//     content: "Match at 7 AM tomorrow. Don’t be late!",
//     createdAt: "2025-06-25T06:10:00Z",
//   },
// },
// {
//   name: "College Friends",
//   type: "group",
//   lastMessage: {
//     senderName: "Neha",
//     content: "Who's coming for the reunion this weekend?",
//     createdAt: "2025-06-25T12:30:00Z",
//   },
// },

// ];

let directConversations = conversations
  .filter((item: ConversationProps) => item?.type === "direct")
  .sort((a: ConversationProps, b: ConversationProps) => {
    const aDate = a?.lastMessage?.createdAt || a?.createdAt || 0;
    const bDate = b?.lastMessage?.createdAt || b?.createdAt || 0;
    return new Date(bDate).getTime() - new Date(aDate).getTime();
  });

let groupConversations = conversations
  .filter((item: ConversationProps) => item?.type === "group")
  .sort((a: ConversationProps, b: ConversationProps) => {
    const aDate = a?.lastMessage?.createdAt || a?.createdAt || 0;
    const bDate = b?.lastMessage?.createdAt || b?.createdAt || 0;
    return new Date(bDate).getTime() - new Date(aDate).getTime();
  });

// let directConversations =[];
// let groupConversations =[];


  return (
    <ScreenWrapper showPattern={true} bgOpacity={0.5}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flex: 1}}>
            <Typo color={colors.neutral200} size={19} textProps={{numberOfLines: 1}}>
              Welcome Back {""}
              <Typo size={19} color={colors.white} fontWeight={"800"}>{firstName}</Typo>{" "}
              👋
            </Typo>
          </View>
          <TouchableOpacity style={styles.settingIcon} onPress={() => router.push("/(main)/profileModal")}>
            <Icons.GearSix color={colors.white} weight={"fill"} size={verticalScale(22)}/>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Animated.ScrollView showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: spacingY._20}}>
            <View style={styles.navBar}>
              <View style={styles.tabs}>
                <TouchableOpacity onPress={() => setSelectedTab(0)} style={[styles.tabStyle, selectedTab === 0 && styles.activeTabStyle]}>
                  <Typo>Direct Messages</Typo>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedTab(1)} style={[styles.tabStyle, selectedTab === 1 && styles.activeTabStyle]}>
                  <Typo>Groups</Typo>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.conversationList}>
              {
                selectedTab ==0 && directConversations.map((item: ConversationProps, index) =>{
                  return(
                    <ConversationItem
                    item= {item}
                    key={index}
                    router= {router}
                    showDivider= {directConversations.length != index+1}
                    />

                  )
                })
              }
              {
                selectedTab ==1 && groupConversations.map((item: ConversationProps, index) =>{
                  return(
                    <ConversationItem
                    item= {item}
                    key={index}
                    router= {router}
                    showDivider= {directConversations.length != index+1}
                    />

                  )
                })
              }

            </View>

            {
              !loading && selectedTab == 0 && directConversations.length == 0 && (
              <Typo style={{textAlign:"center"}}> 
                No Direct Messages 

              </Typo>

              )
            }
            {
              !loading && selectedTab == 1 && groupConversations.length == 0 && (
                <Typo style={{textAlign:"center"}}> 
                  No Groups 
                </Typo>
              )
            }
            {
              loading && <Loading />
            }
          </Animated.ScrollView>
        </View>
      </View>

      <Button
      style={styles.floatingButton}
      onPress={() => router.push({
        pathname: "/(main)/newConversationModal",
        params: {isGroup: selectedTab}
      })}
      >
        <Icons.Plus
        color={colors.black}
        weight='bold'
        size= {verticalScale(24)}
        />
      </Button>
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: spacingX._20,
  gap: spacingY._15,
  paddingTop: spacingY._15,
  paddingBottom: spacingY._20,
},
row: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},

content: {
  flex: 1,
  backgroundColor: colors.white,
  borderTopLeftRadius: radius._50,
  borderTopRightRadius: radius._50,
  borderCurve: "continuous",
  overflow: "hidden",
  paddingHorizontal: spacingX._20,
},
navBar: {
  flexDirection: "row",
  gap: spacingX._15,
  alignItems: "center",
  paddingHorizontal: spacingX._10,
},

tabs: {
  flexDirection: "row",
  gap: spacingX._10,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},

tabStyle: {
  paddingVertical: spacingY._10,
  paddingHorizontal: spacingX._20,
  borderRadius: radius.full,
  backgroundColor: colors.neutral100,
},

activeTabStyle: {
  backgroundColor: colors.primaryLight,
},
conversationList: {
  paddingVertical: spacingY._20,
},

settingIcon: {
  padding: spacingY._10,
  backgroundColor: colors.neutral700,
  borderRadius: radius.full,
},

floatingButton: {
  height: verticalScale(50),
  width: verticalScale(50),
  borderRadius: 100,
  position: "absolute",
  bottom: verticalScale(30),
  right: verticalScale(30),
},

})