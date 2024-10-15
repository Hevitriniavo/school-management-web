function ErrorMessage({as: CustomMessage}) {
    return (
        <div className="fixed inset-0 justify-center items-center h-screen bg-black bg-opacity-50">
            <div className="bg-white dark:bg-[#67597a rounded shadow-md p-4">
                {CustomMessage ? <CustomMessage/> : <h2 className="text-red-600">Une erreur s'est produite.</h2>}
            </div>
        </div>
    );
}

export default ErrorMessage;
