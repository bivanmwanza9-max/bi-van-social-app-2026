import React, { useState } from 'react';
import {
  SafeAreaView, View, Text, TouchableOpacity, TextInput, ScrollView,
  StatusBar, ImageBackground, Alert, StyleSheet
} from 'react-native';

const GOLD = '#E8B84B';
const BG = '#080808';
const PANEL = '#151515';
const MUTED = '#A8A8A8';

const initialVideos = [
  { id: '1', creator: '@dreamer_99', title: 'The best view comes after the hardest climb. ✨', tags: '#travel #nature #adventure', likes: 324500, comments: 12600, duration: '00:24', tint: '#44362A' },
  { id: '2', creator: '@vibe_with_lee', title: 'Little moments, big memories.', tags: '#lifestyle #goodvibes', likes: 82100, comments: 3400, duration: '00:18', tint: '#263D43' },
  { id: '3', creator: '@foodie_girl', title: 'A recipe worth saving 🍜', tags: '#food #cooking', likes: 96500, comments: 2100, duration: '00:32', tint: '#49301D' },
];

export default function App() {
  const [tab, setTab] = useState('Home');
  const [videos, setVideos] = useState(initialVideos);
  const [liked, setLiked] = useState({});
  const [following, setFollowing] = useState({});
  const [caption, setCaption] = useState('');
  const [messages, setMessages] = useState([
    { name: 'Lee', text: 'That video was amazing 🔥', time: '10:42' },
    { name: 'Maya', text: 'Thanks for the follow!', time: 'Yesterday' },
  ]);
  const [messageDraft, setMessageDraft] = useState('');
  const [live, setLive] = useState(false);

  const publish = () => {
    if (!caption.trim()) {
      Alert.alert('Add a caption', 'Write a short caption before publishing your video.');
      return;
    }
    const newVideo = {
      id: String(Date.now()), creator: '@you', title: caption.trim(),
      tags: '#BI_VAN #newvideo', likes: 0, comments: 0, duration: '00:15', tint: '#3D3020'
    };
    setVideos([newVideo, ...videos]);
    setCaption('');
    setTab('Home');
    Alert.alert('Video added', 'Your demo post is now at the top of the BI_VAN feed.');
  };

  const sendMessage = () => {
    if (!messageDraft.trim()) return;
    setMessages([...messages, { name: 'You', text: messageDraft.trim(), time: 'Now' }]);
    setMessageDraft('');
  };

  const Header = () => (
    <View style={styles.header}>
      <View style={styles.brandMark}><Text style={styles.brandMarkText}>♛B</Text></View>
      <Text style={styles.brand}>BI_<Text style={{color:GOLD}}>VAN</Text></Text>
      <View style={{flex:1}} />
      <TouchableOpacity onPress={() => Alert.alert('Search', 'Search UI is ready to connect to your video database.')}><Text style={styles.headerIcon}>⌕</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => setTab('Notifications')}><Text style={styles.headerIcon}>♧</Text></TouchableOpacity>
    </View>
  );

  const BottomNav = () => (
    <View style={styles.nav}>
      {[
        ['Home','⌂'], ['Discover','⌕'], ['Upload','＋'], ['Inbox','▤'], ['Profile','♙']
      ].map(([name, icon]) => (
        <TouchableOpacity key={name} style={styles.navItem} onPress={() => name === 'Upload' ? setTab('Upload') : setTab(name)}>
          <Text style={[styles.navIcon, tab === name && styles.activeText]}>{icon}</Text>
          <Text style={[styles.navLabel, tab === name && styles.activeText]}>{name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const VideoCard = ({ video }) => (
    <View style={[styles.videoCard, {backgroundColor: video.tint}]}>
      <View style={styles.videoOverlay}>
        <Text style={styles.videoBadge}>BI_VAN • {video.duration}</Text>
        <View style={styles.videoCenter}>
          <Text style={styles.playIcon}>▶</Text>
          <Text style={styles.demoLabel}>VIDEO PREVIEW</Text>
        </View>
        <View style={styles.videoInfo}>
          <Text style={styles.creator}>{video.creator}  ✓</Text>
          <Text style={styles.videoTitle}>{video.title}</Text>
          <Text style={styles.tags}>{video.tags}</Text>
          <Text style={styles.sound}>♫ Original sound • BI_VAN</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => setLiked({...liked, [video.id]: !liked[video.id]})}>
            <Text style={[styles.actionIcon, liked[video.id] && {color:'#FF5A72'}]}>{liked[video.id] ? '♥' : '♡'}</Text>
            <Text style={styles.actionCount}>{formatCount(video.likes + (liked[video.id] ? 1 : 0))}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Comments', 'Comments panel placeholder — connect this to your backend.')}>
            <Text style={styles.actionIcon}>☏</Text><Text style={styles.actionCount}>{formatCount(video.comments)}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Share video', 'Sharing will be enabled when native share integration is added.')}>
            <Text style={styles.actionIcon}>➦</Text><Text style={styles.actionCount}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Sound', 'Original sound • BI_VAN')}><Text style={styles.actionIcon}>♫</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />
      <Header />
      {tab === 'Home' && (
        <ScrollView style={styles.content}>
          <View style={styles.feedTabs}>
            <Text style={styles.feedTab}>Following</Text>
            <Text style={[styles.feedTab, styles.selectedFeedTab]}>For You</Text>
            <Text style={styles.feedTab}>Trending</Text>
          </View>
          {videos.map(v => <VideoCard key={v.id} video={v} />)}
        </ScrollView>
      )}
      {tab === 'Discover' && (
        <ScrollView style={styles.content} contentContainerStyle={styles.page}>
          <Text style={styles.pageTitle}>Discover</Text>
          <TextInput placeholder="Search videos, creators, hashtags..." placeholderTextColor={MUTED} style={styles.input} />
          <Text style={styles.sectionTitle}>EXPLORE CATEGORIES</Text>
          <View style={styles.grid}>
            {['🔥 Trending','♫ Music','🎮 Gaming','☺ Comedy','♨ Food','✈ Travel','💄 Beauty','⚽ Sports'].map(x =>
              <TouchableOpacity key={x} style={styles.category} onPress={() => Alert.alert(x, 'Category feed will show matching videos once connected to a backend.')}><Text style={styles.categoryText}>{x}</Text></TouchableOpacity>
            )}
          </View>
          <Text style={styles.sectionTitle}>TRENDING CREATORS</Text>
          {['@dreamer_99','@vibe_with_lee','@foodie_girl'].map(name => <View key={name} style={styles.row}><View style={styles.avatar}><Text style={styles.avatarText}>{name[1].toUpperCase()}</Text></View><Text style={styles.rowMain}>{name}</Text><TouchableOpacity style={styles.smallGoldButton} onPress={() => setFollowing({...following,[name]:!following[name]})}><Text style={styles.buttonText}>{following[name]?'Following':'Follow'}</Text></TouchableOpacity></View>)}
        </ScrollView>
      )}
      {tab === 'Upload' && (
        <ScrollView style={styles.content} contentContainerStyle={styles.page}>
          <Text style={styles.pageTitle}>Create a video</Text>
          <TouchableOpacity style={styles.uploadBox} onPress={() => Alert.alert('Select video', 'Connect Expo ImagePicker to choose a real video from your phone.')}>
            <Text style={{fontSize:42,color:GOLD}}>＋</Text><Text style={styles.uploadTitle}>Choose a video</Text><Text style={styles.muted}>Select from gallery or record a clip</Text>
          </TouchableOpacity>
          <Text style={styles.fieldLabel}>Caption</Text>
          <TextInput value={caption} onChangeText={setCaption} placeholder="Tell everyone what your video is about..." placeholderTextColor={MUTED} multiline style={[styles.input,{height:100,textAlignVertical:'top'}]} />
          <Text style={styles.fieldLabel}>Visibility</Text>
          <View style={styles.settingRow}><Text style={styles.bodyText}>🌍  Public</Text><Text style={styles.activeText}>⌄</Text></View>
          <TouchableOpacity style={styles.goldButton} onPress={publish}><Text style={styles.buttonText}>Publish demo post</Text></TouchableOpacity>
          <Text style={styles.note}>Prototype note: this adds a demo card to your feed; actual video upload needs storage and a backend.</Text>
        </ScrollView>
      )}
      {tab === 'Inbox' && (
        <View style={[styles.content,styles.page]}>
          <Text style={styles.pageTitle}>Messages</Text>
          {messages.map((m,i) => <View key={i} style={styles.messageRow}><View style={styles.avatar}><Text style={styles.avatarText}>{m.name[0]}</Text></View><View style={{flex:1}}><Text style={styles.rowMain}>{m.name}</Text><Text style={styles.muted}>{m.text}</Text></View><Text style={styles.muted}>{m.time}</Text></View>)}
          <View style={styles.composer}><TextInput value={messageDraft} onChangeText={setMessageDraft} placeholder="Write a message..." placeholderTextColor={MUTED} style={[styles.input,{flex:1,marginBottom:0}]} /><TouchableOpacity onPress={sendMessage} style={styles.sendButton}><Text style={styles.buttonText}>Send</Text></TouchableOpacity></View>
          <Text style={styles.note}>Demo messaging only. Secure real-time messaging requires user authentication and a backend.</Text>
        </View>
      )}
      {tab === 'Profile' && (
        <ScrollView style={styles.content} contentContainerStyle={styles.page}>
          <View style={styles.profileTop}><View style={styles.profileAvatar}><Text style={{fontSize:34,color:GOLD}}>♛</Text></View><Text style={styles.pageTitle}>@you</Text><Text style={styles.muted}>BI_VAN Creator</Text></View>
          <View style={styles.stats}><Stat value="245" label="Following" /><Stat value="1.2K" label="Followers" /><Stat value="8.6K" label="Likes" /></View>
          <TouchableOpacity style={styles.goldButton} onPress={() => Alert.alert('Edit profile','Profile editor will connect to your account service.')}><Text style={styles.buttonText}>Edit profile</Text></TouchableOpacity>
          <Text style={styles.sectionTitle}>CREATOR STUDIO</Text>
          {['My videos','Analytics','Creator rewards','Monetization setup','Account & privacy'].map(item=><TouchableOpacity key={item} style={styles.settingRow} onPress={() => Alert.alert(item, 'This feature needs a connected account and server-side implementation.')}><Text style={styles.bodyText}>{item}</Text><Text style={styles.muted}>›</Text></TouchableOpacity>)}
        </ScrollView>
      )}
      {tab === 'Notifications' && (
        <ScrollView style={styles.content} contentContainerStyle={styles.page}>
          <Text style={styles.pageTitle}>Notifications</Text>
          {['Jessica liked your video','King_Rahul commented: Amazing! 🔥','travel_with_me started following you','Your creator dashboard is ready'].map((x,i)=><View key={x} style={styles.settingRow}><View style={styles.avatar}><Text style={styles.avatarText}>{['♥','☏','＋','♛'][i]}</Text></View><Text style={[styles.bodyText,{flex:1,marginLeft:12}]}>{x}</Text><Text style={styles.muted}>{i+2}m</Text></View>)}
        </ScrollView>
      )}
      {tab === 'Live' && (
        <View style={[styles.content,styles.page]}>
          <Text style={styles.pageTitle}>Go Live</Text><Text style={styles.muted}>Connect with your community in real time.</Text>
          <View style={styles.uploadBox}><Text style={{fontSize:42,color:GOLD}}>◉</Text><Text style={styles.uploadTitle}>{live?'Live session started (demo)':'Ready to go live?'}</Text><Text style={styles.muted}>Live streaming requires a streaming provider and server setup.</Text></View>
          <TouchableOpacity style={styles.goldButton} onPress={() => setLive(!live)}><Text style={styles.buttonText}>{live?'End demo live':'Start demo live'}</Text></TouchableOpacity>
        </View>
      )}
      {tab === 'Settings' && (
        <ScrollView style={styles.content} contentContainerStyle={styles.page}>
          <Text style={styles.pageTitle}>Settings</Text>
          {['Account','Privacy & safety','Notifications','Content preferences','Data usage','Help & support','About BI_VAN','Log out'].map(x=><TouchableOpacity key={x} style={styles.settingRow} onPress={() => Alert.alert(x, 'Settings screen placeholder.')}><Text style={styles.bodyText}>{x}</Text><Text style={styles.muted}>›</Text></TouchableOpacity>)}
        </ScrollView>
      )}
      <BottomNav />
    </SafeAreaView>
  );
}

function Stat({value,label}) { return <View style={{alignItems:'center',flex:1}}><Text style={styles.statValue}>{value}</Text><Text style={styles.muted}>{label}</Text></View>; }
function formatCount(n) { return n >= 1000000 ? (n/1000000).toFixed(1)+'M' : n >= 1000 ? (n/1000).toFixed(n>=10000?0:1)+'K' : String(n); }

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:BG}, header:{height:58,flexDirection:'row',alignItems:'center',paddingHorizontal:16,borderBottomWidth:1,borderBottomColor:'#222'},
  brandMark:{width:30,height:30,borderRadius:8,borderWidth:1,borderColor:GOLD,alignItems:'center',justifyContent:'center',marginRight:8},brandMarkText:{color:GOLD,fontWeight:'900',fontSize:17},
  brand:{color:'#F8F8F8',fontWeight:'900',fontSize:21,letterSpacing:1},headerIcon:{color:GOLD,fontSize:28,marginLeft:18},
  content:{flex:1},feedTabs:{flexDirection:'row',justifyContent:'center',gap:25,paddingVertical:14},feedTab:{color:MUTED,fontSize:14},selectedFeedTab:{color:GOLD,fontWeight:'800',borderBottomWidth:2,borderBottomColor:GOLD,paddingBottom:8},
  videoCard:{height:460,marginHorizontal:12,marginBottom:12,borderRadius:18,overflow:'hidden',borderWidth:1,borderColor:'#54421F'},videoOverlay:{flex:1,backgroundColor:'rgba(0,0,0,0.28)',padding:14},videoBadge:{color:'#F3D58C',fontSize:11,fontWeight:'700'},
  videoCenter:{flex:1,alignItems:'center',justifyContent:'center'},playIcon:{fontSize:58,color:'rgba(255,255,255,0.9)'},demoLabel:{fontSize:10,color:'#E5D4AC',letterSpacing:2,marginTop:5},
  videoInfo:{position:'absolute',left:15,right:76,bottom:20},creator:{color:'#FFF',fontSize:14,fontWeight:'800',marginBottom:7},videoTitle:{color:'#FFF',fontSize:14,lineHeight:20},tags:{color:'#F3D58C',fontSize:12,marginTop:5},sound:{color:'#DDD',fontSize:11,marginTop:10},
  actions:{position:'absolute',right:12,bottom:20,alignItems:'center',gap:17},actionIcon:{fontSize:29,color:'#FFF',textAlign:'center'},actionCount:{fontSize:10,color:'#FFF',textAlign:'center',marginTop:1},
  nav:{height:62,borderTopWidth:1,borderTopColor:'#252525',flexDirection:'row',justifyContent:'space-around',alignItems:'center',backgroundColor:'#0C0C0C'},navItem:{alignItems:'center',justifyContent:'center',minWidth:54},navIcon:{fontSize:22,color:'#B7B7B7'},navLabel:{fontSize:10,color:'#B7B7B7',marginTop:2},activeText:{color:GOLD,fontWeight:'800'},
  page:{padding:18},pageTitle:{color:'#FFF',fontSize:25,fontWeight:'900',marginBottom:18},muted:{color:MUTED,fontSize:12},sectionTitle:{color:GOLD,fontSize:11,fontWeight:'900',letterSpacing:1.5,marginTop:22,marginBottom:12},input:{backgroundColor:PANEL,borderWidth:1,borderColor:'#383838',borderRadius:12,padding:13,color:'#FFF',marginBottom:14},
  grid:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'},category:{width:'48%',backgroundColor:'#171717',borderColor:'#4B3A1A',borderWidth:1,borderRadius:12,padding:18,marginBottom:10},categoryText:{color:'#FFF',fontWeight:'700'},
  row:{flexDirection:'row',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#242424'},avatar:{width:42,height:42,borderRadius:21,backgroundColor:'#332815',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:GOLD},avatarText:{color:GOLD,fontWeight:'900',fontSize:17},rowMain:{color:'#FFF',fontWeight:'700',marginLeft:10,flex:1},
  smallGoldButton:{backgroundColor:GOLD,paddingHorizontal:14,paddingVertical:8,borderRadius:8},goldButton:{backgroundColor:GOLD,padding:15,borderRadius:12,alignItems:'center',marginTop:16},buttonText:{color:'#17120A',fontWeight:'900'},
  uploadBox:{borderWidth:1,borderColor:'#5B4821',borderStyle:'dashed',borderRadius:16,alignItems:'center',justifyContent:'center',padding:28,backgroundColor:'#111',marginBottom:22},uploadTitle:{color:'#FFF',fontWeight:'800',fontSize:16,marginVertical:8},fieldLabel:{color:'#FFF',fontWeight:'700',marginBottom:8},bodyText:{color:'#FFF',fontSize:14},note:{color:'#8F8F8F',fontSize:11,lineHeight:17,marginTop:14},
  settingRow:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:16,borderBottomWidth:1,borderBottomColor:'#242424'},profileTop:{alignItems:'center',marginVertical:12},profileAvatar:{width:90,height:90,borderRadius:45,borderWidth:2,borderColor:GOLD,alignItems:'center',justifyContent:'center',backgroundColor:'#19140B',marginBottom:12},stats:{flexDirection:'row',paddingVertical:22,borderTopWidth:1,borderBottomWidth:1,borderColor:'#292929',marginVertical:12},statValue:{color:GOLD,fontSize:20,fontWeight:'900'},
  messageRow:{flexDirection:'row',alignItems:'center',paddingVertical:14,borderBottomWidth:1,borderBottomColor:'#242424',gap:10},composer:{flexDirection:'row',alignItems:'center',gap:8,marginTop:20},sendButton:{backgroundColor:GOLD,padding:13,borderRadius:10}
});
