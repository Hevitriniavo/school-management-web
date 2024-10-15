import { useEffect, useRef } from "react";

function useDocumentTitle(title) {
    const previousTitle = useRef(document.title);

    useEffect(() => {
        document.title = title;

        return () => {
            document.title = previousTitle.current;
        };
    }, [title]);

    return previousTitle.current;
}

export default useDocumentTitle;
