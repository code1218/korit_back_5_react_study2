/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const imageLayout = css`
    
`;

function ImageEx() {
    return (
        <div css={layout}>
            <div css={imageLayout}>
                <img src="" alt="" />
            </div>
            <input style={{display: "none"}} type="file" />
            <button>이미지 불러오기</button>
        </div>
    );
}

export default ImageEx;