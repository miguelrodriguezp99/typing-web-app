const Theme = ({ themeName, switchTheme, mouseEnter, mouseLeave }) => {
  return (
    <button
      onClick={switchTheme(themeName)}
      onMouseEnter={() => mouseEnter(themeName)}
      onMouseLeave={() => mouseLeave(themeName)}
      className="text-iconstext hover:text-secondary-hover py-1 
      hover:bg-tertiary rounded-md
      transition-all duration-300"
    >
      <div className="flex justify-between px-4">
        <p>{themeName}</p>
        <div id="colors" className={`display flex gap-2 ${themeName}`}>
          <div className={`w-3 h-3 rounded-full bg-primary`}></div>
          <div className={`w-3 h-3 rounded-full bg-secondary`}></div>
          <div className={`w-3 h-3 rounded-full bg-tertiary`}></div>
        </div>
      </div>
    </button>
  );
};

export default Theme;
