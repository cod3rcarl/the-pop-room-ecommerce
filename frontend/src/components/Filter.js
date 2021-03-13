import React from 'react';

import { Dropdown } from 'react-bootstrap';

const Filter = () => {
  const items = JSON.parse(localStorage.getItem('series'));

  return (
    <Dropdown className='mr-sm-2 ml-sm-5 mt-2'>
      <Dropdown.Toggle variant='primary' id='dropdown-basic'>
        Filter by Series
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {items.map((series) => (
          <Dropdown.Item key={series} href={`/series/${series}`}>
            {series}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default Filter;
