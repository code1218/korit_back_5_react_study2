/** @jsxImportSource @emotion/react */
import * as S from "./style";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { MENUS } from "../../constants/menu";

function SideBarTop() {
    const [ isShow, setShow ] = useState(false);

    return (
        <aside css={S.layout(isShow)} >
            <button css={S.toggleButton} onClick={() => setShow(!isShow)} >
                {isShow ? <FaCaretUp /> : <FaCaretDown />}
            </button>
            <ul css={S.menuList}>
                {MENUS.map(menu => 
                    <Link css={S.menuItem} to={menu.path} key={menu.id} onClick={() => setShow(false)}>
                        <li>{menu.name}</li>
                    </Link>)
                }
            </ul>
        </aside>
    );
}

export default SideBarTop;