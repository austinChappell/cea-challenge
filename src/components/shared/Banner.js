import React from 'react';

const Banner = (props) => {
  const { group } = props;
  const startYear = new Date(group.created).getFullYear();
  return (
    <div className="Banner">
      <h1>
        {group.name}
      </h1>
      <h4>Devvin' it up since {startYear}</h4>
    </div>
  );
};

export default Banner;
