import { ref, getStorage, uploadBytes } from "./firebase.js";
import React, { useEffect, useRef, useState } from "react";

const isWeb = typeof window !== "undefined";

function AccountModal() {
    const serverDomain = process.env.NEXT_PUBLIC_SERVERDOMAIN;
    const [username, setUsername] = useState("");
    const [img, setImg] = useState<any>(null);
    const [id, setId] = useState<any>(null);

    const [imgLink, setImgLink] = useState("");
    const inputFile = useRef(null);

    const clickEvent =
        isWeb &&
        new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: false,
        });
    const storage = getStorage();

    useEffect(() => {
        setUsername(`${localStorage.getItem("username")}`);
        setImgLink(
            localStorage.getItem("pfp") ||
                "https://archive.org/services/img/twitter-default-pfp"
        );
        setId(`${localStorage.getItem("id")}`);
    }, []);

    function chooseImg() {
        try {
            inputFile.current && inputFile.current.dispatchEvent(clickEvent); //ignore the error, it doesnt break anything, if it does, fix it
        } catch (error) {
            console.error(error);
        }
    }
    function changeImg(e: any) {
        console.log(username);
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
    function submit(e: any) {
        e.preventDefault();
        (async function () {
            const Rpfp = { imgLink };
            const Rusername = { username };

            const arr = [Rusername, Rpfp];
            const response = await fetch(`${serverDomain}users/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(arr),
            });
            window.location.href = "/";
            console.log(response);
        })();
    }

    function change(e: any) {
        setUsername(e.target.value);
        localStorage.setItem("username", e.target.value);
    }

    function signOut() {
        localStorage.clear();
    }

    return (
        <form onSubmit={(e) => submit(e)} className="userModal">
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
            <br />

            <button className="floatRight smallButton">save</button>

            <button onClick={signOut} className="red floatLeft">
                sign out
            </button>
        </form>
    );
}

export default AccountModal;
