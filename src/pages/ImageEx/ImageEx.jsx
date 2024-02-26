/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { storage } from "../../configs/firebase/firebaseConfig";
import { Line } from "rc-progress";
import { v4 as uuid } from "uuid"

const layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const imageLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    border: 1px solid #dbdbdb;
    width: 300px;
    height: 300px;
    overflow: hidden;
    & > img {
        width: 100%;
    }
`;

function ImageEx() {
    const uploadFilesId = useRef(0);
    const [ oldFiles, setOldFiles ] = useState([]);
    const [ newFiles, setNewFiles ] = useState([]);
    const imgFileRef = useRef();

    useEffect(() => {
        setOldFiles(!localStorage.getItem("oldFiles") ? [] : JSON.parse(localStorage.getItem("oldFiles")));
    }, []);

    const handleFileChange = (e) => {
        const loadFiles = Array.from(e.target.files);

        if(loadFiles.length === 0) {
            imgFileRef.current.value = "";
            return;
        }

        const uploadFiles = loadFiles.map(file => {
            return {
                id: uploadFilesId.current += 1,
                progressPercent: 0,
                originFile: file,
                url: ""
            };
        });

        uploadFilesId.current = 0;

        let promises = [];

        promises = uploadFiles.map(file => new Promise((resolve) => {
            const fileReader = new FileReader();

            fileReader.onload = (e) => {
                resolve(e.target.result);
            }

            fileReader.readAsDataURL(file.originFile);
        }));

        Promise.all(promises)
        .then(result => {
            setNewFiles(result.map((dataUrl, index) => {
                return {
                    ...uploadFiles[index],
                    preview: dataUrl
                };
            }));
        });        
    }

    const handleImageUpload = () => {
        const promises = newFiles.map(file => new Promise(resolve => {
            const storageRef = ref(storage, `files/test/${uuid()}_${file.originFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file.originFile);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    setNewFiles(newFiles.map(sFile => {
                        return sFile.id !== file.id ? sFile : {
                            ...sFile, 
                            percent: Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                        }
                    }));
                },
                (error) => {},
                () => {
                    getDownloadURL(storageRef).then(url => {
                        const newFile = {
                            ...file,
                            ["url"]: url
                        }
                        resolve(newFile);
                    })
                }
            );
        }));

        Promise.all(promises)
        .then((newFile) => {
            setOldFiles(newFile);
            localStorage.setItem("oldFiles", JSON.stringify(newFile));
        }).then(() => {
            setNewFiles([]);
        });
    }

    return (
        <div css={layout}>
            {oldFiles?.map(file => 
                <div key={file.id} css={imageLayout}>
                    <img src={file.url} alt="" />
                </div>
            )}
            {newFiles?.map(file => 
                <>
                    <div key={file.id} css={imageLayout}>
                        <img src={file.preview} alt="" />
                    </div>
                    <Line percent={file.percent} strokeWidth={4} strokeColor={"#dbdbdb"}/>
                </>
            )}
            
            <input style={{display: "none"}} type="file" multiple={true} ref={imgFileRef} onChange={handleFileChange}/>
            <button onClick={() => imgFileRef.current.click()}>이미지 불러오기</button>
            <button onClick={handleImageUpload}>이미지 업로드</button>
        </div>
    );
}

export default ImageEx;