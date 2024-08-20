import { logError } from 'react-native-linkedin';
import Firebase from './firebaseConfig';
import { log } from 'react-native-reanimated';

export const AddUser = async (name, email, uid,token,mobile_number,onlineStatus,image) => {
console.log(name, email, uid,token,mobile_number,onlineStatus,image,' user screen signup on firbase ==============================>');
    
    try {
        return await Firebase
            .database()
            .ref("users/" + uid)
            .set({
                name: name,
                email: email,
                uuid: uid,
                token:token,
                mobile_number:mobile_number,
                onlineStatus:onlineStatus,
                image:image
                
            });
    } catch (error) {
        return error;
    }
}

export const blockedUser = async (currentUserId, guestUserId) => {
     try {
        return await Firebase.
            database().
            ref('blockFriendList/' + currentUserId)
            .child(guestUserId).
            set({
                blockedStatus:true, 
                blockBy:guestUserId
            })
    } catch (error) {
        return error;
    }
}
// ------------------ Function For Receive Invitation -----------------
export const blockedUserReceiver = async (uid,currentUserId) => {
    console.log(uid, status,"blockedUser");
    try {
        return await Firebase.
            database().
            ref('blockFriendList/' + uid)
            .child(currentUserId).
            update({
                blockedStatus:false,
                blockBy:currentUserId,
            
            })
    } catch (error) {
        return error;
    }
}

export const UpdateBlockUser = async (currentUserId, guestUserId) => {

     try {
        return await Firebase.
            database().
            ref('blockFriendList/' + currentUserId)
            .child(guestUserId).
            update({

                blockedStatus:false,
                blockBy:guestUserId
                
            })
    } catch (error) {
        return error;
    }
}



export const UpdateUserImage = async (base64Image,UserId) => {
    console.log(UserId,base64Image,"image=======image=======image======image");
    try {
        return await Firebase
            .database()
            .ref("updateimage/" + UserId)
            .update({
                base64Image:base64Image
                
            })
    } catch (error) {
        return error;
    }
}


export const UpdateOnlineStatus = async (uuid,value) => {
    try {
        return await Firebase
            .database()
            .ref("users/" + uuid)
            .update({
                onlineStatus:value
                
            })
    } catch (error) {
        return error;
    }
}
export const UpdateDivecToken = async (uuid,token) => {
    console.log(token,"token on user.js screen ");
    try {
        return await Firebase
            .database()
            .ref("users/" + uuid)
            .update({
                token:token
                
            })
    } catch (error) {
        return error;
    }
}