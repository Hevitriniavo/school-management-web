import useDocumentTitle from "../hooks/useDocumentTitle.jsx";

function NotFoundView() {
    useDocumentTitle("Not fount page");
    return (
        <div>
            Not found !!
        </div>
    );
}

export default NotFoundView;