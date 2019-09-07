export function GetData(type){

    let BaseUrl = '/api/';

    return new Promise((resolve,reject) => {
        fetch(BaseUrl+type)
        .then((response)=> response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
        .catch((error)=>{
            reject(error);
        })
    })

}