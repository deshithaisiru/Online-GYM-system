const FormContainer = ({ children }) => {
  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
