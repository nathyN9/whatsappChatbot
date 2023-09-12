import axios from 'axios'


export const post = async (url, formData, cbResponse)=>{
    try {
        const data = await axios.post(url, formData)
        cbResponse(data)
    } catch (error) {
        console.log(error);
    }
}

export const get = async (url, params, cbResponse)=>{
    try {
        
        console.log(params);
        const data = await axios.get(url).then( data=>console.log("Data devuelta: " + JSON.stringify(data)));
        //console.log("Data devuelta " +JSON.stringify(data));
        cbResponse(data)
    } catch (error) {
        console.log(error);
    }
}

export const post2 = async (url, params, cbResponse)=>{
    try {
        
        console.log(params);
        const data = await axios({
            method: 'POST',
            data: params,
            url: url
        })
        //console.log("Data devuelta " +JSON.stringify(data));
        cbResponse(data)
    } catch (error) {
        console.log(error);
    }
}