import { auth, database, f } from '../../../config/config';

export async function currentUserInfo(){
        
        const ref = await f.auth().currentUser;
        const profile = await database.ref('users/' + ref["uid"]).once('value');
        const userInfo = {
            id: ref["uid"],
            profile
        }
        return {
            type: 'CURRENT_USER',
            payload: userInfo
        }

}