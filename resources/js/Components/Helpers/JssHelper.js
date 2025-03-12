const getBackgroundStyle = (backgroundColor, backgroundImage, gradientDirection) => {
    if (backgroundImage)
      return {
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: `center center`,
        backgroundSize: 'cover',
      };
  
    if (typeof backgroundColor === 'string' || (Array.isArray(backgroundColor) && backgroundColor.length === 1)) {
      return { backgroundColor: backgroundColor.toString() };
    }
  
    if (Array.isArray(backgroundColor) && backgroundColor.length > 1) {
      const [firstColor] = backgroundColor[0].split(' ');
      return {
        backgroundColor: firstColor,
        backgroundImage: gradientDirection
          ? `linear-gradient(${gradientDirection}, ${backgroundColor.join(', ')})`
          : `linear-gradient(${backgroundColor.join(', ')})`,
      };
    }
    return null;
};

export { getBackgroundStyle };