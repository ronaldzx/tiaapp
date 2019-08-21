export function PostData(type,userData){

    let BaseUrl = '/api/';

    return new Promise((resolve,reject) => {
        fetch(BaseUrl+type,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
        .then((response)=> response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
        .catch((error)=>{
            reject(error);
        })
    })

}