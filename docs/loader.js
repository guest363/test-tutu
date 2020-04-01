export const hideLoader = (ID_TUTU, ID_LOADER) => {
    document.getElementById(ID_TUTU).classList.remove("hide");
    document.getElementById(ID_LOADER).classList.add("hide"); 
}