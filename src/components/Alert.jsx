function Alert({ darkMode }) {
  return (
    <>
      <div>
        <p className={darkMode ? "firstPage" : "firstPageDark"}>
          Please do search
        </p>
      </div>
    </>
  );
}
export default Alert;
