function Loading() {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div
                className="loader border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div>
        </div>
    );
}

export default Loading;
