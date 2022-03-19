import { ref, getStorage, uploadBytes } from "./firebase.js";
import React, { useEffect, useRef, useState } from "react";

const isWeb = typeof window !== "undefined";

function AccountModal() {
    const [username, setUsername] = useState("");
    const [img, setImg] = useState<any>(null);

    const [imgLink, setImgLink] = useState("");
    const inputFile = useRef(null);

    const [isMouseOnCard, setMouseIsOnCard] = useState(false);
    const clickEvent =
        isWeb &&
        new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: false,
        });
    let modalCardCoords;
    const storage = getStorage();

    useEffect(() => {
        setUsername(`${localStorage.getItem("username")}`);
        setImgLink(
            localStorage.getItem("pfp") ||
                "https://ae01.alicdn.com/kf/Hfaff95b4731e43918b690931922ef12aM/2021-Men-Harajuku-Hoodies-Sweatshirts-Oversized-2020-Men-Women-Streetwear-Black-Hoodie-Male-Hiphop-Winter-Basic.jpg_Q90.jpg_.webp"
        );
    }, []);

    function chooseImg() {
        try {
            inputFile.current && inputFile.current.dispatchEvent(clickEvent);
        } catch (error) {
            console.error(error);
        }
    }
    function changeImg(e: any) {
        const tempImg = e.target.files[0];
        setImg(tempImg);
        localStorage.setItem(
            "pfp",
            `https://firebasestorage.googleapis.com/v0/b/accounts-8a8bf.appspot.com/o/pfp%2F${tempImg.name}?alt=media`
        );

        const spaceRef = ref(storage, `pfp/${tempImg && tempImg.name}`);
        uploadBytes(spaceRef, tempImg).then(async (snapshot) => {
            window.location.reload();
        });
    }

    function change(e: any) {
        setUsername(e.target.value);
        localStorage.setItem("username", username);
    }
    return (
        <form className="userModal">
            <label htmlFor="username">Change username</label>
            <input
                value={username}
                onChange={(e) => change(e)}
                type="text"
                id="username"
            />

            {/* source image */}
            <img
                onClick={() => chooseImg()}
                id="choosePfp"
                className="choosePfp"
                src={imgLink}
                alt="Vyber obrázek"
            />

            {/* invisible input */}
            <input
                className="no"
                accept="image/png, image/jpg, image/jpeg"
                ref={inputFile}
                type="file"
                onChange={(e) => changeImg(e)}
            />

            <button className="floatRight smallButton">save</button>
        </form>
    );
}

export default AccountModal;
