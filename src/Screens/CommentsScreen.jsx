import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { ButtonComment } from '../components/Button';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function CommentsScreen({ route }) {
  const imageUri = route.params ? route.params.imageUri : null;
  const userId = route.params ? route.params.userId : null;
  const postId = route.params ? route.params.postId : null;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const getComments = async () => {
    const data = [];
    await getDocs(collection(db, 'users', userId, 'posts', postId, 'comments')).then(
      (querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          data.push(doc.data());
        });
      }
    );
    setComments(data);
    console.log(data);
    return data;
  };

  const createComment = async () => {
    if (newComment === '') {
      return;
    }
    try {
      const comment = {
        newComment: newComment,
        commentId: Date.now().toString(),
      };
      const docRef = await addDoc(
        collection(db, 'users', userId, 'posts', postId, 'comments'),
        comment
      );
      console.log('Document written with ID: ', docRef.id);
      setComments([...comments, comment]);
    } catch (e) {
      console.error('Error adding document: ', e);
      throw e;
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.postPhoto} />
      {comments &&
        comments.map((comment) => (
          <View style={styles.commentsWrapper}>
            <View key={comment.id}>
              <Text style={styles.text}>{comment.newComment}</Text>
              {/* <Text style={styles.text}>{comment.commentId}</Text> */}
            </View>
          </View>
        ))}
      <View style={styles.comment}>
        <TextInput
          style={styles.commentField}
          placeholder="Comment now..."
          onChangeText={(comment) => setNewComment(comment)}
          value={newComment}
        />
        <ButtonComment onPress={() => createComment()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopColor: 'rgba(0, 0, 0, 0.3)',
    borderTopWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  postPhoto: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    marginTop: 32,
    marginBottom: 8,
    alignItems: 'center',
  },
  comment: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    padding: 16,
    borderRadius: 100,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    // marginBottom: 24,
    // fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    borderColor: '#E8E8E8',
    width: '100%',
    flexDirection: 'row',
  },
  commentField: {
    width: '90%',
  },
});
