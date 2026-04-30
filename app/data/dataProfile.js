let HOST_URL = "https://mmi.unilim.fr/~sanchezperrau1/SAE2.03-Sanchez--Perrault/";

let DataProfile = {};

DataProfile.read = async function(){
    let answer = await fetch(HOST_URL + "server/script.php?todo=readprofiles");
    let data = await answer.json();
    return data;
}

DataProfile.add = async function(formData){
    let config = {
        method: "POST",
        body: formData
    };
    let answer = await fetch(HOST_URL + "server/script.php?todo=addprofile", config);
    let data = await answer.json();
    return data;
}

export { DataProfile };

