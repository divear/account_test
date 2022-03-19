import React from "react";
import Head from "next/head";

function Meta({ title, keywords, description }) {
    return (
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <meta charSet="utf-8" />
            <link rel="icon" href="/favicon.ico" />
            <title>{title}</title>
        </Head>
    );
}

Meta.defaultProps = {
    title: "Accountest",
    keywords: "test, site, programming, web, account, testing",
    description: "This is a test site for accounts and you should visit it",
};

export default Meta;
