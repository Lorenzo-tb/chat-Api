import { verify, sign } from "jasonwebtoken";

async function checkToken(token, id, key) {
    return verify(token, key, (err, decoded) => {
        if (err) {
            return false;
        }

        else if (decoded.id === id) {
            return true;
        }
        else {
            return false;
        }
    });
}

const setToken = async (id, token) =>{
    console.log(id);
    if(id){
        return sign({id}, key, {expiresIn: 28800});
    }
    return false;
};

 export default{
    checkToken,
    setToken
 };