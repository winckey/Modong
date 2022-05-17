import { getMessaging, getToken } from 'firebase/messaging'


export async function getFcmToken() {
    const PUBLIC_VAPID_KEY = 'BEYKtDuEZlCiswPIWvnaSxETOqskvJZCr63or3NUj5NmwDJ4yK5hzS9015voQFyndJh1en1SaAkLMnvOL9YcQcE';
    const messaging = getMessaging();
    
    const token = await getToken(messaging, { vapidKey: PUBLIC_VAPID_KEY })
                .then(token => console.log("fcm 토큰이디", token))
  
    return token;
};
  
export default {
getFcmToken
};