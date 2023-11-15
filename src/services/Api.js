import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import storage from '@react-native-firebase/storage';

export function login({ email, password }) {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((value) => {
    console.log(value);
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/user-not-found') {
      console.warn('That email address is invalid!');
    }

    console.error(error);
  });
}

export function signup({ email, password, displayName }) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userInfo) => {
      console.log(userInfo)
      userInfo.user.updateProfile({ })
      .then((value) => {
        console.log(value);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.warn('That email address is already in use!');
        }
    
        if (error.code === 'auth/user-not-found') {
          console.log('That email address is invalid!');
        }
    
        console.error(error);
      });
    })
}

export function subscribeToAuthChanges(authStateChanged) {
  firebase.auth().onAuthStateChanged((user) => {
    console.log (user);
    authStateChanged(user);
  })
}

export function signout(onSignedOut) {
  firebase.auth().signOut()
    .then(() => {
      console.log('Signed Out')
      onSignedOut();
    })
}

export async function AllProduct(productsRetrieved) {
  var productList = [];

  var snapshot = await firebase.firestore()
    .collection('Products')
    .orderBy('createdAt')
    .get()

    snapshot.forEach((doc) => {
      const productItem = doc.data();
      productItem.id = doc.id;
      productList.push(productItem);
    });

  productsRetrieved(productList);
}

export async function userProducts(productsRetrieved) {
  const UserId = auth().currentUser.uid;
  console.log(UserId)
  var productList = [];

  var snapshot = await firebase.firestore()
    .collection('Products').where('uid', '==' ,UserId)
    // .orderBy('createdAt')
    .get()

    snapshot.forEach((doc) => {
      const productItem = doc.data();
      productItem.id = doc.id;
      productList.push(productItem);
    });

    productsRetrieved(productList);
}

  export function deleteProduct(product, deleteComplete) {
    console.log(product);
  
    firebase.firestore()
      .collection('Products')
      .doc(product.id).delete()
      .then(() => deleteComplete())
      .catch((error) => console.log(error));
  }

  export async function userProfile(profilesRetrieved) {
    const UserId = auth().currentUser.uid;
    console.log(UserId)
    var profileList = [];
  
    var snapshot = await firebase.firestore()
      .collection('Profile').where('uid', '==' ,UserId)
      // .orderBy('createdAt')
      .get()
  
      snapshot.forEach((doc) => {
        const profileItem = doc.data();
        profileItem.id = doc.id;
        profileList.push(profileItem);
      });

      profilesRetrieved(profileList);
  }

  export function upload(product, onProductUploaded, { updating }) {

    if (product.imageUri) {
      const fileExtension = product.imageUri.split('.').pop();
      console.log("EXT: " + fileExtension);
  
      var uuid = uuidv4();
  
      const fileName = `${uuid}.${fileExtension}`;
      console.log(fileName);
  
      var storageRef = firebase.storage().ref(`products/images/${fileName}`);
  
      storageRef.putFile(product.imageUri)
        .on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          snapshot => {
            console.log("snapshot: " + snapshot.state);
            console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  
            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              console.log("Success");
            } 
          },
          error => {
            // unsubscribe();
            console.log("image upload error: " + error.toString());
          },
          () => {
            storageRef.getDownloadURL()
              .then((downloadUrl) => {
                console.log("File available at: " + downloadUrl);
  
                product.image = downloadUrl;
  
                delete product.imageUri;
  
                if (updating) {
                  console.log("Updating....");
                  updateProduct(product, onProductUploaded);
                } else {
                  console.log("adding...");
                  addProduct(product, onProductUploaded);
                }
              })
          }
        )
    } else {
      console.log("Skipping image upload");
  
      delete product.imageUri;
  
      if (updating) {
        console.log("Updating....");
        updateProduct(product, onProductUploaded);
      } else {
        console.log("adding...");
        addProduct(product, onProductUploaded);
      }
    }
  }

  export function updateProduct(product, updateComplete) {
    product.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    console.log(product);
  
    firebase.firestore()
      .collection('Products')
      .doc(product.id).set(product)
      .then(() => updateComplete(product))
      .catch((error) => console.log(error));
  }

  export function addProduct(product, addComplete) {
    product.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  
    firebase.firestore()
      .collection('Products')
      .add(product)
      .then((snapshot) => {
        product.id = snapshot.id;
        snapshot.set(product);
      }).then(() => addComplete(product))
      .catch((error) => console.log(error));
  }

  export function uploadProfile(profile, onProfileUploaded, { updating }) {
    if (profile.imageUri1) {
      const fileExtension = profile.imageUri1.split('.').pop();
      console.log("EXT: " + fileExtension);
  
      var uuid = uuidv4();
  
      const fileName = `${uuid}.${fileExtension}`;
      console.log(fileName);
  
      var storageRef = firebase.storage().ref(`products/images/${fileName}`);
  
      storageRef.putFile(profile.imageUri1)
        .on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          snapshot => {
            console.log("snapshot: " + snapshot.state);
            console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  
            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              console.log("Success");
            } 
          },
          error => {
            // unsubscribe();
            console.log("image upload error: " + error.toString());
          },
          () => {
            storageRef.getDownloadURL()
              .then((downloadUrl) => {
                console.log("File available at: " + downloadUrl);
  
                profile.image = downloadUrl;
  
                delete profile.imageUri1;
  
                if (updating) {
                  console.log("Updating....");
                  updateProfile(profile, onProfileUploaded);
                } else {
                  console.log("adding...");
                  addProfile(profile, onProfileUploaded);
                }
              })
          }
        )
    } else {
      console.log("Skipping image upload");
  
      delete profile.imageUri1;
  
      if (updating) {
        console.log("Updating....");
        updateProfile(profile, onProfileUploaded);
      } else {
        console.log("adding...");
        addProfile(profile, onProfileUploaded);
      }
    }
  }
  
  export function updateProfile(profile, updateComplete) {
    profile.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    console.log(profile);
  
    firebase.firestore()
      .collection('Profile')
      .doc(profile.id).set(profile)
      .then(() => updateComplete(profile))
      .catch((error) => console.log(error));
  }

  export function addProfile(profile, addComplete) {
    profile.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  
    firebase.firestore()
      .collection('Profile')
      .add(profile)
      .then((snapshot) => {
        profile.id = snapshot.id;
        snapshot.set(profile);
      }).then(() => addComplete(profile))
      
      .catch((error) => console.log(error));
  }