import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import imageBg from '../../assets/photo-bg.png';
import { LocationIcon, CommentOrangeIcon, LikeIcon } from '../../assets/SvgIcons';
import { selectUser } from '../redux/selectors';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

export default function ProfileScreen() {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const data = [];
    await getDocs(collection(db, 'users', user.uid, 'posts')).then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
    });
    setPosts(data);
    console.log(data);
    return data;
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={imageBg} resizeMode="cover" style={styles.image}>
        <View style={styles.profile}>
          <Text style={styles.name}>{user?.displayName}</Text>

          <ScrollView style={{ height: 'auto', flex: 0 }}>
            {posts &&
              posts.map((post) => (
                <View style={styles.post} key={post.id}>
                  <Image source={{ uri: post.imageUri }} style={styles.postPhoto} />
                  <Text style={styles.postName}>{post.imageName}</Text>
                  <View style={styles.postWrapper}>
                    {CommentOrangeIcon}
                    <Text style={styles.comment}>Comment</Text>
                    {LikeIcon}
                    <Text style={styles.like}>Like</Text>
                    <View style={styles.location}>
                      {LocationIcon}
                      <Text>{post.locationName}</Text>
                    </View>
                  </View>
                </View>
              ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingLeft: 16,
    // paddingRight: 16,
  },
  image: {
    width: '100%',
    height: 812,
    flex: 1,
    justifyContent: 'center',
  },
  profile: {
    marginTop: 147,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    minHeight: '80%',
    paddingLeft: 16,
    paddingRight: 16,
  },
  name: {
    marginTop: 92,
    marginBottom: 33,
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 35,
    textAlign: 'center',
    letterSpacing: 0.01,
    color: '#212121',
  },
  post: {
    marginBottom: 32,
  },
  postName: {
    marginBottom: 8,
    marginTop: 8,
  },
  postWrapper: {
    flexDirection: 'row',
  },
  postPhoto: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderWidth: 1,
  },
  comment: {
    marginRight: 24,
  },
  location: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },
});
