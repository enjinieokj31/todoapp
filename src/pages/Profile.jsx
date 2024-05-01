import React, { useState } from 'react';

function Profile(props) {
    const [imgUrl, setImgUrl] = useState(null);

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };  
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleUpload = async (e) => {
        const file = await convertBase64(e.target.files[0]);
        setImgUrl(file);
    }


    return (
        <div className='d-flex'>
            <input type="file" onChange={handleUpload} />
            <img src={imgUrl} alt="" />
        </div>
    );
}

export default Profile;