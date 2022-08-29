import { useState, useEffect } from "react";

export const useFetch = (url) => {
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);

    const getImages = async () => {
        const response = await fetch(url);
        console.log(response);
        // const images = await
        // setImages(images)
        setLoading(false);

    }

    useEffect(() => {
        getImages();
    }, [url]);

    return { loading, images }
}